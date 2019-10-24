import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';

const router: Router = Router();

router.options('/', (req:  Request, res: Response ) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.sendStatus(200);
});

// Function to list approved users
router.get('/approved', async (req: Request, res: Response) => {
  let options = {};
  options = {
    attributes: ['id', 'firstName', 'lastName', 'email'],
    where: {
      approved: true
    }
  };
  User.findAll(options).then(result => {
    res.statusCode = 200;
    res.json(result.map(e => e));
  }).catch(error  => {
    res.statusCode = 500;
    res.json({'msg': 'Error, there is not user list'});
  });
});

// Function to list users to approve
router.get('/to-approve', async (req: Request, res: Response) => {
  let options = {};
  options = {
    attributes: ['id', 'firstName', 'lastName', 'email'],
    where: {
      approved: false
    }
  };
  User.findAll(options).then(result => {
    res.statusCode = 200;
    res.json(result.map(e => e));
  }).catch(error  => {
    res.statusCode = 500;
    res.json({'msg': 'Error, there is not user list'});
  });
});

// Function to approve users
router.put('/approve/:id', async (req: Request, res: Response) => {
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
    approved: true,
  }, {
    where: {
      id: id
    }
  }).then(result => {
    res.statusCode = 200;
    res.json({'msg': 'User approved'});
  }).catch(error  => {
    res.statusCode = 500;
    res.json({'msg': 'Error, user not approved'});
  });
});

// Function to create users
router.post('/', async (req: Request, res: Response) => {
  const instance = new User();
  instance.post_(req.body);
  instance.save().then(result => {
    res.statusCode = 201;
    res.json({'msg': 'User created'});
  }).catch(error  => {
    res.statusCode = 500;
    res.json({'msg': 'Error, user not created'});
  });
});



export const RegisterController: Router = router;
