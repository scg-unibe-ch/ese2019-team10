import {Request, Response, Router} from 'express';
import {Service} from '../models/service.model';
import {Category} from '../models/category.model';
import {User} from '../models/user.model';
import {Event} from '../models/event.model';
import {EventService} from '../models/EventService';
import {respond401IfNotAuthentic} from '../lib/auth.lib';
import {isInstance} from '../lib/database.lib';

const router: Router = Router();

/************************************************************************
 * Endpoint to get a service                                             *
 *************************************************************************/
router.get('/:id', async (req: Request, res: Response) => {
  const serviceId = parseInt(req.params.id, undefined);

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
    if (!service) {
      res.status(404).json({msg: 'No such service'});
      return;
    }
    res.status(200).json(service);
  });
});

/************************************************************************
 * Endpoint to to create a new service                                   *
 *************************************************************************/
router.post('/', async (req: Request, res: Response) => {
  const userId = parseInt(req.body.userId, undefined);
  if (! respond401IfNotAuthentic(res, userId)) {
    return;
  }

  User.findOne({where: {id: userId}}).then(user => {
    if (!user) {
      res.status(404).json({msg: 'no such user'});
      return;
    }

    const serviceInstance = new Service();
    serviceInstance.post_(req.body);
    serviceInstance.save().then(() => {
      res.status(201).json({'msg': 'Service created'});
      user.$add('services', serviceInstance);
    }).catch(error => {
      res.status(500).json({'msg': 'Service was not created'});
    });
  });
});

/************************************************************************
 * Endpoint to edit a service                                            *
 *************************************************************************/
router.put('/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.body.userId, undefined);
  if (! respond401IfNotAuthentic(res, userId)) {
    return;
  }

  const serviceId = parseInt(req.params.id, undefined);
  const categoryId: number = req.body.categoryId;
  Service.findOne({where: {id: serviceId}}).then(service => {
    if (!service) {
      res.status(404).json('no such service');
      return;
    }

    if (categoryId !== service.categoryId) {
      Category.findOne({where: {'id': categoryId}})
        .then(newCategory => {
          if (newCategory) {
            service.$set('category', newCategory);
          } else {
            throw Error(`No category with id ${categoryId}`);
          }
        })
        .catch(error => {
          console.log(error);
          throw Error('Error while setting category');
        });
    }
    service.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      available: req.body.available,
      quantity: req.body.quantity,
      availability: req.body.availability,
      place: req.body.place
    });
    res.status(200).json({'msg': 'Service updated'});
  }).catch(() => {
    res.status(500).json({'msg': 'Error, service not updated'});
  });
});


/************************************************************************
 * Endpoint to create a new booking                                      *
 *************************************************************************/
router.post('/book', async (request: Request, response: Response) => {
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

    response.status(201).json({'msg': 'Booking created'});
  }).catch(() => {
    response.status(500).json({'msg': 'Booking was not created'});
  });
});

/*************************************************************************
 * Endpoint to delete a service                                          *
 *************************************************************************/
router.delete('/:id', async (req: Request, res: Response) => {
  const serviceId = parseInt(req.params.id, undefined);
  Service.findOne({where: {'id': serviceId}})
    .then(service  => {
      if (!service) {
        res.status(404).json({'msg': 'Service not found'});
      } else if (respond401IfNotAuthentic(res, service.userId)) {
        service.destroy().then(() => {
          res.status(201).json({'msg': 'Service deleted'});
        });
      }
    })
    .catch(result => {
      console.log(result);
      res.status(500).json({'msg': 'Could not delete service'});
    });
});

/*************************************************************************
 * Endpoint to list a service requests to be confirmed                   *
 *************************************************************************/
router.get('/to-confirm/:id', async (request: Request, response: Response) => {
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

/*************************************************************************
 * Endpoint to confirm or reject a service request                       *
 *************************************************************************/
router.post('/confirm', async (request: Request, response: Response) => {
  const eventId = parseInt(request.body.eventId, undefined);
  const serviceId = parseInt(request.body.serviceId, undefined);

  const service: Service = await isInstance(response, Service, serviceId, 'No such service');

  // check if the logged in user is the owner of the event and respond 401 if not
  if (! respond401IfNotAuthentic(response, service.userId)) {
    return;
  }

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

/*************************************************************************
 * Endpoint to delete a service request                                  *
 *************************************************************************/
router.delete('/request/:eventId/:serviceId', async (req: Request, res: Response) => {
  const serviceId = parseInt(req.params.serviceId, undefined);
  const eventId = parseInt(req.params.eventId, undefined);
  EventService.findOne({where: {'serviceId': serviceId, 'eventId': eventId}})
    .then(request  => {
      if (!request) {
        res.status(404).json({'msg': 'Service request not found'});
      } else {
        request.destroy().then(() => {
          res.status(201).json({'msg': 'Service request deleted'});
        });
      }
    })
    .catch(result => {
      console.log(result);
      res.status(500).json({'msg': 'Could not delete service request'});
    });
});

/*************************************************************************
 * Endpoint to list a user's service requests                            *
 *************************************************************************/
router.get('/list-requests/:id', async (request: Request, response: Response) => {
  const userId = parseInt(request.params.id, undefined);

  Event.findAll({
    where: {
      userId: userId
    },
    attributes: [
      'name'
    ],
    include: [{
      model: EventService,
      attributes: [
        'eventId',
        'serviceId',
        'message',
        'reply',
        'responded',
        'booked',
      ],
      include: [{
        model: Service,
        attributes: ['name'],
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

export const ServiceController = router;
