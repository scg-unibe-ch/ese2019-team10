import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Event} from '../models/event.model';
import {Role} from '../models/role.model';
import {Service, Category} from '../models/service.model';
import {EventService} from '../models/EventService';
import {RoleUser} from '../models/RoleUser';

const router: Router = Router();

function isAuthentic(response: Response, id: number): boolean {
  if (response.locals.jwtPayload === null || response.locals.jwtPayload.id !== id) {
    response.statusCode = 401;
    response.json({'msg': 'You are not allowed to do this'});
    return false;
  } else {
    return true;
  }
}

/************************************************************************
* Validate if a row exists in the database                              *
* @param model model (table) to consult                                 *
* @param id integer, table's primary key to query                       *
* @param message string, custom message to respond                      *
*************************************************************************/
async function isInstance(response: Response, model: any, id: number, message = 'Not found') {
  const instance = await model.findByPk(id);
  if (instance == null) {
    response.statusCode = 404;
    response.json({
      'msg': message
    });
    return false;
  } else {
    return instance;
  }
}

/************************************************************************
* Endpoint to get the user's profile                                    *
*************************************************************************/
router.get('/profile/:id', async (request: Request, response: Response) => {
  const userId = parseInt(request.params.id, undefined);
  const user = await isInstance(response, User, userId, 'User not found');

  if (! user) {
    return;
  }
  User.findAll({
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
        attributes: ['id', 'name'],
        as: 'role',
      }
    ]
  }).then(userRoleArray => {
    response.statusCode = 200;
    const userRoleJSON = JSON.parse(JSON.stringify(userRoleArray));
    response.json(addRole(userRoleJSON));
  }).catch(() => {
    response.statusCode = 500;
    response.json({'msg': 'Error with user profile'});
  });
});

/************************************************************************
* Modify the JSON with the user's information. Add roles.               *
* @param userRoleJSON JSON with the user's information                  *
* @returns userRoleJSON JSON with roles                                 *
*************************************************************************/
function addRole(userRoleJSON: any) {
  const roleArray = userRoleJSON[0].role;
  userRoleJSON[0].isAdmin = false;
  userRoleJSON[0].isServiceProvider = false;
  userRoleJSON[0].isEventManager = false;

  for (const r of roleArray) {
    switch (r.name) {
      case 'Admin' : {
        userRoleJSON[0].isAdmin = true;
        break;
      }
      case 'ServiceProvider' : {
        userRoleJSON[0].isServiceProvider = true;
        break;
      }
      case 'EventManager' : {
        userRoleJSON[0].isEventManager = true;
        break;
      }
    }
  }
  delete userRoleJSON[0].role;
  return userRoleJSON;
}

/************************************************************************
* Endpoint to get a service                                             *
*************************************************************************/
router.get('/service/:id', async (request: Request, response: Response) => {
  const serviceId = parseInt(request.params.id, undefined);
  const instance = await isInstance(response, Service, serviceId, 'Service not found');

  if (! instance) {
    return;
  }
  Service.findOne({
    where: {
      id: serviceId
    },
    include: [{
      model: Category,
      attributes: ['name'],
      required: false
    }],
  }).then(service => {
      response.json(service);
    });
});

/************************************************************************
* Endpoint to get an event                                              *
*************************************************************************/
router.get('/event/:id', async (request: Request, response: Response) => {
  const eventId = parseInt(request.params.id, undefined);
  const instance = await isInstance(response, Event, eventId);

  if (! instance) {
    return;
  } else {
    response.json(instance);
  }
});

/************************************************************************
* Endpoint to edit the user's profile                                   *
*************************************************************************/
router.put('/profile/:id', async (request: Request, response: Response) => {
  const userId = parseInt(request.params.id, undefined);
  const user = await isInstance(response, User, userId, 'User not found');
  /*if (! isAuthentic(response, userId)) {
    return;
  }*/
  if (! user) {
    return;
  }
  User.update({
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
  }, {
    where: {
      id: userId
    }
  }).then(() => {
    response.statusCode = 200;
    // Consult id and name of roles
    const rolesArray = getRolesArray(response);
    console.log('rolesArray: ' + rolesArray);
    // Add or update RoleUser
    if (request.body.isEventManager) {
      addRoleUser(userId, 1);
    } else {
      delRoleUser(userId, 1);
    }
    if (request.body.isServiceProvider) {
      addRoleUser(userId, 2);
    } else {
      delRoleUser(userId, 2);
    }
    response.json({'msg': 'User updated'});
  }).catch(error => {
    response.statusCode = 500;
    response.json({'msg': 'Error, user not updated'});
    console.log(error);
  });
});

/************************************************************************
* Consult id and name of roles.                                         *
* @returns rolesArray, Array with id and name of roles                   *
*************************************************************************/
function getRolesArray(response: Response) {
  Role.findAll().then(roleArray => {
    return roleArray;
  }).catch(() => {
    response.statusCode = 500;
    response.json({'msg': 'Error with user roles'});
  });
}

/************************************************************************
* Add a role to the user if it does not exists.                         *
* @param userId integer, user's primary key                             *
* @param roleId integer, role's primary key                             *
*************************************************************************/
function addRoleUser(userId: number, roleId: number) {
  RoleUser.findOrCreate({
    where:
    {
      userId: userId,
      roleId: roleId
    }
  }).then(([user, created]) => {
      console.log(user.get({
        plain: true
      }));
    });
}

/************************************************************************
* Deletes a user's role.                                                *
* @param userId integer, user's primary key                             *
* @param roleId integer, role's primary key                             *
*************************************************************************/
function delRoleUser(userId: number, roleId: number) {
  RoleUser.destroy({
    where: {
      userId: userId,
      roleId: roleId
    }
  }).then((count) => {
      console.log(count);
    });
}

/************************************************************************
* Endpoint to to create a new service                                   *
*************************************************************************/
router.post('/service', async (request: Request, response: Response) => {
  // search for user with requested email
  const userId = parseInt(request.body.userId, undefined);
  const user = await isInstance(response, User, userId, 'User not found');
  /*if (! isAuthentic(response, userId)) {
    return;
  }*/
  if (! user) {
    return;
  }
  const serviceInstance = new Service();
  serviceInstance.post_(request.body);
  serviceInstance.save().then(() => {
    response.statusCode = 201;
    response.json({'msg': 'Service created'});
  }).catch(error => {
    response.statusCode = 500;
    console.log(error);
    response.json({'msg': 'Service was not created'});
  });
});

/************************************************************************
* Endpoint to edit a service                                            *
*************************************************************************/
router.put('/service/:id', async (request: Request, response: Response) => {
  const userId = parseInt(request.body.userId, undefined);
  const serviceId = parseInt(request.params.id, undefined);

  /*if (! isAuthentic(response, userId)) {
    return;
  }*/
  const user = await isInstance(response, User, userId, 'User not found');
  if (! user) {
    return;
  }
  const service = await isInstance(response, Service, serviceId, 'Service not found');
  if (! service) {
    return;
  }
  Service.update({
    name: request.body.name,
    description: request.body.description,
    price: request.body.price,
    available: request.body.available,
    quantity: request.body.quantity,
    availability: request.body.availability,
    place: request.body.place
  },
  {
    where: {
      id: serviceId
    }
  }).then(() => {
    response.statusCode = 200;
    response.json({'msg': 'Service updated'});
  }).catch(() => {
    response.statusCode = 500;
    response.json({'msg': 'Error, service not updated'});
  });
});

/************************************************************************
* Endpoint to create a new event                                        *
*************************************************************************/
router.post('/event', async (request: Request, response: Response) => {
  // search for user with requested email
  const userId = parseInt(request.body.userId, undefined);

  /*if (! isAuthentic(response, userId)) {
    return;
  }*/

  const user = await isInstance(response, User, userId, 'User not found');
  if (! user) {
    return;
  }
  const eventInstance = new Event();
  eventInstance.post_(request.body);
  eventInstance.save().then(() => {
    response.statusCode = 201;
    response.json({'msg': 'Event created'});
  }).catch(() => {
    response.statusCode = 500;
    response.json({'msg': 'Event was not created'});
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
    response.statusCode = 200;
    response.json({'msg': 'Event updated'});
  }).catch(() => {
    response.statusCode = 500;
    response.json({'msg': 'Error, event not updated'});
  });
});

/************************************************************************
* Endpoint to create a new booking                                      *
*************************************************************************/
router.post('/service/book', async (request: Request, response: Response) => {
  const eventId = parseInt(request.body.eventId, undefined);
  const serviceId = parseInt(request.body.serviceId, undefined);
  const event = await isInstance(response, Event, eventId, 'Event not found');
  if (! event) {
    return;
  }
  const service = await isInstance(response, Service, serviceId, 'Service not found');
  if (! service) {
    return;
  }
  const eventService = new EventService();
  eventService.post_(request.body);
  eventService.save().then(() => {
    // Send message to service provider

    response.statusCode = 201;
    response.json({'msg': 'Booking created'});
  }).catch(() => {
    response.statusCode = 500;
    response.json({'msg': 'Booking was not created'});
  });
});

/************************************************************************
* Endpoint to list a service requests to be confirmed                   *
*************************************************************************/
router.get('/service/to-confirm/:id', async (request: Request, response: Response) => {
  const userId = parseInt(request.params.id, undefined);

  Service.findAll({
    where: {
      userId: userId
    },
    attributes: [
      'id',
      'name'
    ],
    include: [{
      model: EventService,
      where: {
        responded: false
      },
      attributes: ['eventId', 'message'],
      include: [{
        model: Event,
        attributes: ['name'],
        include: [{
          model: User,
          attributes: ['firstName', 'email'],
        }],
      }],
    }],
  }).then(result => {
    response.statusCode = 200;
    response.json(result);
  }).catch((error)  => {
    response.statusCode = 500;
    response.json({'msg': 'Error, there is not request list' + error});
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
    response.statusCode = 200;
    response.json({'msg': 'Booking updated'});
  }).catch(()  => {
    response.statusCode = 500;
    response.json({'msg': 'Error, booking not updated'});
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
    response.statusCode = 201;
    response.json({'msg': 'Event deleted'});
    }).catch(() => {
    response.statusCode = 500;
    response.json({'msg': 'Error, event not deleted'});
  });
});

export const UserController: Router = router;
