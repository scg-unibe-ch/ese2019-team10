import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';

const router: Router = Router();


router.get('/', async (req: Request, res: Response) => {
  const instances = await User.findAll();
  res.statusCode = 200;
  res.send(instances.map(e => e));
});

router.post('/', async (req: Request, res: Response) => {
  const instance = new User();
  instance.post_(req.body);
  await instance.save();
  res.statusCode = 201;
  res.send('{"msg": "User created"}');
});

export const RegisterController: Router = router;
