import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Event} from '../models/event.model';
import {Role} from '../models/role.model';
import {Service, Category} from '../models/service.model';

const router: Router = Router();
import {sequelize} from '../server';

// Get user profile
router.get('/profile/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, undefined);
  if (res.locals.jwtPayload === null || (!res.locals.jwtPayload.roles.includes(1) && res.locals.jwtPayload.id !== id)) {
    res.statusCode = 401;
    res.json({'msg': 'You are not allowed to do this'});
    return;
  }
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
    include: [{
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
    res.json({'msg': 'User updated'});
  }).catch(error => {
    res.statusCode = 500;
    res.json({'msg': 'Error, user not updated'});
    console.log(error);
  });
});

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

export const UserController: Router = router;
