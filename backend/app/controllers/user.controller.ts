import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Event} from '../models/event.model';
import {Role} from '../models/role.model';
import {Service} from '../models/service.model';
import {Category} from '../models/category.model';
import {EventService} from '../models/EventService';
import {isAuthentic} from '../lib/auth.lib';
import {isInstance} from '../lib/database.lib';

const router: Router = Router();

/************************************************************************
* Endpoint to get the user's profile                                    *
*************************************************************************/
router.get('/profile/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, undefined);

  User.findOne({
    where: {
      id: userId
    },
    attributes: [
      'id', 'firstName', 'lastName', 'street', 'email', 'phone',
      'birthday', 'gender', 'city', 'postalCode', 'country'
    ],
    include: [
      {
        model: Event,
        attributes: ['id', 'name', 'description', 'date', 'place'],
        as: 'events',
      },
      {
        model: Service,
        attributes: [
          'id', 'name', 'description', 'price', 'available', 'quantity',
          'availability', 'place'
        ],
        as: 'services',
        include: [{
          model: Category,
          required: false
        }],
      },
      {
        model: Role,
        attributes: ['name'],
        as: 'role',
      }
    ]
  }).then(user => {
    if (!user) {res.status(404).json({'msg': 'No such user'});
      return;
    }

    console.log(user.isAdmin());
    const userRoleJSON = JSON.parse(JSON.stringify(user));

    // set role booleans
    const roles: string[] = user.role.map((role) => role.name);
    userRoleJSON.isAdmin = roles.includes('Admin');
    userRoleJSON.isServiceProvider = roles.includes('ServiceProvider');
    userRoleJSON.isEventManager = roles.includes('EventManager');
    delete userRoleJSON.role;

    res.status(200).json(userRoleJSON);
  }).catch((e) => {
    res.status(500).json({'msg': 'Error with user profile'});
  });
});

/************************************************************************
* Endpoint to get an event                                              *
*************************************************************************/
router.get('/event/:id', async (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id, undefined);

  Event.findOne({where: {id: eventId}}).then(event => {
    if (!event) {
      res.status(404).json({msg: 'No such event'});
      return;
    } else {
      res.status(200).json(event);
    }
  });
});

/************************************************************************
* Endpoint to edit the user's profile                                   *
*************************************************************************/
router.put('/profile/:id', async (request: Request, response: Response) => {
  const userId = parseInt(request.params.id, undefined);

  User.findOne({where: {id: userId}}).then(user => {
    if (!user) {
      response.status(500).json({
        msg: 'No such user',
      });
      return;
    }
    user.update({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      street: request.body.street,
      birthday: request.body.birthday,
      phone: request.body.phone,
      gender: request.body.gender,
      city: request.body.city,
      postalCode: request.body.postalCode,
      country: request.body.country
    });

    // Add or update RoleUser
    if (request.body.isEventManager) {
      user.makeEventManager();
    } else {
      user.withdrawEventManager();
    }
    if (request.body.isServiceProvider) {
      user.makeServiceProvider();
    } else {
      user.withdrawServiceProvider();
    }

    response.status(200).json({'msg': 'User updated'});
  }).catch(error => {
    response.status(500).json({'msg': 'Error, user not updated'});
    console.log(error);
  });
});

/************************************************************************
* Endpoint to create a new event                                        *
*************************************************************************/
router.post('/event', async (req: Request, res: Response) => {
  // search for user with requested email
  const userId = parseInt(req.body.userId, undefined);

  if (! isAuthentic(res, userId)) {
    return;
  }

  User.findOne({where: {id: userId}}).then(user => {
    if (!user) {
      res.status(404).json({msg: 'no such user'});
      return;
    }

    const eventInstance = new Event();
    eventInstance.post_(req.body);
    eventInstance.save().then(() => {
      res.status(201).json({'msg': 'Event created'});
      user.$add('events', eventInstance);
    });
  }).catch(() => {
    res.status(500).json({'msg': 'Event was not created'});
  });
});

/************************************************************************
* Endpoint to edit an event                                             *
*************************************************************************/
router.put('/event/:id', async (request: Request, response: Response) => {
  const userId = parseInt(request.body.userId, undefined);
  if (! isAuthentic(response, userId)) {
    return;
  }

  const eventId = parseInt(request.params.id, undefined);
  const user = await isInstance(response, User, userId, 'User not found');
  if (! user) {
    return;
  }
  const event = await isInstance(response, Event, eventId, 'Event not found');
  if (! event) {
    return;
  }

  Event.update({
    name: request.body.name,
    description: request.body.description,
    date: request.body.date,
    place: request.body.place
  },
  {
    where: {
      id: eventId
    }
  }).then(() => {
    response.status(200).json({'msg': 'Event updated'});
  }).catch(() => {
    response.status(500).json({'msg': 'Error, event not updated'});
  });
});

/************************************************************************
* Endpoint to confirm or reject a service request                       *
*************************************************************************/
router.put('/confirm', async (request: Request, response: Response) => {
  const eventId = parseInt(request.body.eventId, undefined);
  const serviceId = parseInt(request.body.serviceId, undefined);

  EventService.update({
    booked: request.body.booked,
    responded: true,
    reply: request.body.reply
  }, {
    where: {
      eventId: eventId,
      serviceId: serviceId
    }
  }).then(() => {
    response.status(200).json({'msg': 'Booking updated'});
  }).catch(()  => {
    response.status(500).json({'msg': 'Error, booking not updated'});
  });
});

/************************************************************************
* Endpoint to delete an event                                            *
*************************************************************************/
router.delete('/event/:id', async (request: Request, response: Response) => {
  const eventId = parseInt(request.params.id, undefined);
  const event = await isInstance(response, Event, eventId, 'Event not found');
  if (! event) {
    return;
  }
  Event.destroy({
    where: {
      id: eventId
    }
  }).then(() => {
    response.status(201).json({'msg': 'Event deleted'});
    }).catch(() => {
    response.status(500).json({'msg': 'Error, event not deleted'});
  });
});

export const UserController: Router = router;
