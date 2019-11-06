import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';

const router: Router = Router();

// Function to create users
router.post('/', async (req: Request, res: Response) => {
  // search for user with requested email
  User.findOne({where: {'email': req.body['email']}}).then(user => {
    // if user does not exist (user is null), create according to request
    if (user === null) {
      const instance = new User();
      instance.post_(req.body);
      instance.save().then(result => {
        res.statusCode = 201;
        res.json({'msg': 'User created'});
      }).catch(error  => {
        res.statusCode = 500;
        res.json({'msg': 'Error, user not created'});
      });
    // otherwise send 400
    } else {
      res.statusCode = 400;
      res.json({'msg': 'E-mail address already in use'});
    }
  });
});

export const RegisterController: Router = router;
