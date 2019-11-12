import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Event} from '../models/event.model';
const router: Router = Router();
import {sequelize} from '../server';

router.get('/profile/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, undefined);
  let resultUjson: any;

  // check if the user is logged in and is allowed to see info, i.e. if she has the right id or she is admin
  const loggedInUser = await User.findOne({where: {'email': res.locals.jwtPayload.sub}});
  if (loggedInUser === null || (!await loggedInUser.$has('role', 1) && loggedInUser.id !== id)) {
      res.statusCode = 401;
      res.json({'msg': 'You are not allowed to do this'});
      return;
    }

  User.findOne({
    where: {id: id},
    attributes: ['id', 'firstName', 'lastName', 'address', 'email']
  }).then(resultUser => {
    if (resultUser === null) {
      res.statusCode = 404;
      res.json({
        'msg': 'Not found'
      });
      return;
    } else {
      res.statusCode = 200;
      resultUjson = resultUser.toJSON();

      sequelize.query('SELECT e.name FROM User AS u INNER JOIN EventUser AS eu ON u.id=eu.userId INNER JOIN Event AS e ON e.id=eu.eventId WHERE u.id = :id', {
        replacements: {id: id},
        type: sequelize.QueryTypes.SELECT
      }).then(resultEvent => {
        res.statusCode = 200;
        const resultEjson = resultEvent.map((e: any) => e);
        resultUjson['events'] = resultEjson;
        // res.send(resultUjson);
      }).catch(error  => {
        res.statusCode = 500;
        res.json({'msg': 'Error, there is not event list'});
      });

      sequelize.query('SELECT s.name FROM User AS u INNER JOIN ServiceUser AS su ON u.id=su.userId INNER JOIN Service AS s ON s.id=su.serviceId WHERE u.id = :id', {
        replacements: {id: id},
        type: sequelize.QueryTypes.SELECT
      }).then(resultServ => {
        res.statusCode = 200;
        const resultSjson = resultServ.map((e: any) => e);
        resultUjson['services'] = resultSjson;
        res.send(resultUjson);
      }).catch(error  => {
        res.statusCode = 500;
        res.json({'msg': 'Error, there is not services list'});
      });
    }
  }).catch(error  => {
    res.statusCode = 500;
    res.json({'msg': 'Error, there is not event list'});
  });
});

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
    address: req.body.street
  }, {
    where: {
      id: id
    }
  }).then(result => {
    res.statusCode = 200;
    res.json({'msg': 'User updated'});
  }).catch(error  => {
    res.statusCode = 500;
    res.json({'msg': 'Error, user not updated'});
    console.log(error);
  });
});

export const UserController: Router = router;
