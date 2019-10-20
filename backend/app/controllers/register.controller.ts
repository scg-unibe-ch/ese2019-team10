import {Router, Request, Response} from 'express';
import {Sequelize} from 'sequelize-typescript';
import {User} from '../models/user.model';

const router: Router = Router();
const Op = Sequelize.Op;

router.options('/', (req:  Request, res: Response ) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.sendStatus(200);
})

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

router.put('/approve', async (req: Request, res: Response) => {
  const instances = await User.findAll();
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
