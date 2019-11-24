import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Event} from '../models/event.model';
import {Role} from '../models/role.model';
import {Service, Category} from '../models/service.model';
import {EventService} from '../models/EventService';
import {RoleUser} from '../models/RoleUser';

const router: Router = Router();

// Get user profile
router.get('/profile/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, undefined);
  /*if (res.locals.jwtPayload === null || (!res.locals.jwtPayload.roles.includes(1) && res.locals.jwtPayload.id !== id)) {
    res.statusCode = 401;
    res.json({'msg': 'You are not allowed to do this'});
    return;
  }*/
  const instance = await User.findByPk(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'msg': 'Not found'
    });
    return;
  }
  User.findAll({
    where: {
      id: id
    },
    attributes: ['id', 'firstName', 'lastName', 'street', 'email', 'phone',
      'birthday', 'gender', 'city', 'postalCode', 'country'],
    include: [
      {
        model: Event,
        attributes: ['id', 'name', 'description', 'date', 'place'],
        as: 'events',
      },
      {
        model: Service,
        attributes: ['id', 'name', 'description', 'price', 'available', 'quantity',
          'availability', 'place'],
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
  }).then(result => {
    res.statusCode = 200;
    const newResult = JSON.parse(JSON.stringify(result));
    res.json(addRole(newResult));
  }).catch(error => {
    res.statusCode = 500;
    res.json({'msg': 'Error with user profile'});
  });
});

function addRole(newUser: any) {
  const roleArray = newUser[0].role;
  newUser[0].isAdmin = false;
  newUser[0].isServiceProvider = false;
  newUser[0].isEventManager = false;

  for (const r of roleArray) {
    switch (r.name) {
      case 'Admin': {
        newUser[0].isAdmin = true;
        break;
      }
      case 'ServiceProvider': {
        newUser[0].isServiceProvider = true;
        break;
      }
      case 'EventManager': {
        newUser[0].isEventManager = true;
        break;
      }
    }
  }
  delete newUser[0].role;
  return newUser;
}

// Get service
router.get('/service/:id', async (req: Request, res: Response) => {
  const serviceId = parseInt(req.params.id, undefined);
  const instance = await Service.findByPk(serviceId);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'msg': 'Not found'
    });
    return;
  }
  Service.findOne({
  where: {id: serviceId},
  include: [{
    model: Category,
    attributes: ['name'],
    required: false
  }],
  }).then(serv => {
    res.json(serv);
  });
});

// Get event
router.get('/event/:evenId', async (req: Request, res: Response) => {
  const eventId = parseInt(req.params.evenId, undefined);
  /*if (res.locals.jwtPayload === null || (!res.locals.jwtPayload.roles.includes(1) && res.locals.jwtPayload.id !== id)) {
    res.statusCode = 401;
    res.json({'msg': 'You are not allowed to do this'});
    return;
  }*/
  const instance = await Event.findByPk(eventId);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'msg': 'Not found'
    });
    return;
  } else {
    res.json(instance);
  }
});

// Edit user profile
router.put('/profile/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, undefined);
  const instance = await User.findByPk(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'msg': 'Not found'
    });
    return;
  }
  User.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    street: req.body.street,
    birthday: req.body.birthday,
    phone: req.body.phone,
    gender: req.body.gender,
    city: req.body.city,
    postalCode: req.body.postalCode,
    country: req.body.country
  }, {
    where: {
      id: id
    }
  }).then(result => {
    res.statusCode = 200;
    // Add or update RoleUser
    if (req.body.isServiceProvider) {
        addRoleUser(id, 1);
    } else {
      delRoleUser(id, 1);
    }
    if (req.body.isEventManager) {
        addRoleUser(id, 3);
    } else {
      delRoleUser(id, 3);
    }
    res.json({'msg': 'User updated'});
  }).catch(error => {
    res.statusCode = 500;
    res.json({'msg': 'Error, user not updated'});
    console.log(error);
  });
});

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

// Function to create new service
router.post('/service', async (req: Request, res: Response) => {
  // search for user with requested email
  const id = parseInt(req.body.userId, undefined);
  const instance = await User.findByPk(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'msg': 'User not found'
    });
    return;
  } else {
    const serviceInstance = new Service();
    serviceInstance.post_(req.body);
    serviceInstance.save().then(result => {
      res.statusCode = 201;
      res.json({'msg': 'Service created'});
    }).catch(error => {
      res.statusCode = 500;
      console.log(error);
      res.json({'msg': 'Service was not created'});
    });
  }
});

// Edit service
router.put('/service/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.body.userId, undefined);
  const serviceId = parseInt(req.params.id, undefined);
  const instanceUser = await User.findByPk(userId);
  const instanceService = await Service.findByPk(serviceId);
  if (instanceUser == null) {
    res.statusCode = 404;
    res.json({
      'msg': 'User not found'
    });
    return;
  }
  if (instanceService == null) {
    res.statusCode = 404;
    res.json({
      'msg': 'Service not found'
    });
    return;
  }
  Service.update({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    available: req.body.available,
    quantity: req.body.quantity,
    availability: req.body.availability,
    place: req.body.place
  }, {
    where: {
      id: serviceId
    }
  }).then(result => {
    res.statusCode = 200;
    res.json({'msg': 'Service updated'});
  }).catch(error => {
    res.statusCode = 500;
    res.json({'msg': 'Error, service not updated'});
    console.log(error);
  });
});

// Function to create new event
router.post('/event', async (req: Request, res: Response) => {
  // search for user with requested email
  const id = parseInt(req.body.userId, undefined);
  const instance = await User.findByPk(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'msg': 'User not found'
    });
    return;
  } else {
    const eventInstance = new Event();
    eventInstance.post_(req.body);
    eventInstance.save().then(result => {
      res.statusCode = 201;
      res.json({'msg': 'Event created'});
    }).catch(error => {
      res.statusCode = 500;
      console.log(error);
      res.json({'msg': 'Event was not created'});
    });
  }
});

// Edit event
router.put('/event', async (req: Request, res: Response) => {
  const userId = parseInt(req.body.userId, undefined);
  const eventId = parseInt(req.body.eventId, undefined);
  const instanceUser = await User.findByPk(userId);
  const instanceEvent = await Event.findByPk(eventId);
  if (instanceUser == null) {
    res.statusCode = 404;
    res.json({
      'msg': 'User not found'
    });
    return;
  }
  if (instanceEvent == null) {
    res.statusCode = 404;
    res.json({
      'msg': 'Event not found'
    });
    return;
  }
  Event.update({
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    place: req.body.place
  }, {
    where: {
      id: eventId
    }
  }).then(result => {
    res.statusCode = 200;
    res.json({'msg': 'Event updated'});
  }).catch(error => {
    res.statusCode = 500;
    res.json({'msg': 'Error, event not updated'});
    console.log(error);
  });
});

// New booking
router.post('/booking', async (req: Request, res: Response) => {
  const eventId = parseInt(req.body.eventId, undefined);
  const serviceId = parseInt(req.body.serviceId, undefined);
  const instanceEvent = await Event.findByPk(eventId);
  const instanceService = await Service.findByPk(serviceId);
  if (instanceEvent == null) {
    res.statusCode = 404;
    res.json({
      'msg': 'Event not found'
    });
    return;
  }
  if (instanceService == null) {
    res.statusCode = 404;
    res.json({
      'msg': 'Service not found'
    });
    return;
  }
  const eventService = new EventService();
  eventService.post_(req.body);
  eventService.save().then(result => {
    res.statusCode = 201;
    res.json({'msg': 'Booking created'});
  }).catch(error => {
    res.statusCode = 500;
    console.log(error);
    res.json({'msg': 'Booking was not created'});
  });
});

export const UserController: Router = router;
