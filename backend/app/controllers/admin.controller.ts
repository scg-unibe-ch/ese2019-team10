// Function to approve users
import {User} from '../models/user.model';
import {Router, Request, Response} from 'express';

const router: Router = Router();

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

export const AdminController: Router = router;
