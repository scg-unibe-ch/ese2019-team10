import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';

const router: Router = Router();


router.get('/approved', async (req: Request, res: Response) => {
  let options = {};
  options = {
    where: {
      approved: true
    }
  };
  const instances = await User.findAll(options);
  res.statusCode = 200;
  res.send(instances.map(e => e));
});

router.get('/to-approve', async (req: Request, res: Response) => {
  let options = {};
  options = {
      where: {
        approved: false
      }
  };
  const instances = await User.findAll(options);
  res.statusCode = 200;
  res.send(instances.map(e => e));
});

router.put('/approve/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await User.findByPk(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'msg': 'not found'
    });
    return;
  }
  User.update({
    approved: true,
  }, {
    where: {
      id: id
    }
  });
  res.statusCode = 200;
  res.send('{"msg": "User approved"}');
});

router.post('/', async (req: Request, res: Response) => {
  const instance = new User();
  instance.post_(req.body);
  await instance.save();
  res.statusCode = 201;
  res.send('{"msg": "User created"}');
});



export const RegisterController: Router = router;
