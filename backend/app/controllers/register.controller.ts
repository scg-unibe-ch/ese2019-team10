import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';

const router: Router = Router();

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
