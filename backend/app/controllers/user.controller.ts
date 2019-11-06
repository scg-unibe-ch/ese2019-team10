import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Event} from '../models/event.model';
const router: Router = Router();
import {sequelize} from '../server';

router.options('/', (req:  Request, res: Response ) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.sendStatus(200);
});



// Function to list users to approve
router.get('/profile/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, undefined);
  let resultUjson:any;

  User.findOne({
    where: {id: id},
    attributes: ['id', 'firstName', 'lastName', 'address', 'email', 'isAdmin',
      'isServiceProvider', 'isEventManager']
  }).then(resultUser => {
    if (resultUser == null) {
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
        let resultEjson = resultEvent.map((e:any) => e);
        resultUjson["events"] = resultEjson;
        //res.send(resultUjson);
      }).catch(error  => {
        res.statusCode = 500;
        res.json({'msg': 'Error, there is not event list'});
      });

      sequelize.query('SELECT s.name FROM User AS u INNER JOIN ServiceUser AS su ON u.id=su.userId INNER JOIN Service AS s ON s.id=su.serviceId WHERE u.id = :id', {
        replacements: {id: id},
        type: sequelize.QueryTypes.SELECT
      }).then(resultServ => {
        res.statusCode = 200;
        let resultSjson = resultServ.map((e:any) => e);
        resultUjson["services"] = resultSjson;
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
/*router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, undefined);
  const instance = await User.findByPk(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'msg': 'Not found'
    });
    return;
  } else {
    let options = {};
    options = {
      attributes: ['id', 'firstName', 'lastName', 'email'],
      where: {
        id: id
      }
    };
    User.findAll(options).then(result => {
      res.statusCode = 200;
      res.json(result.map(e => e));
    }).catch(error  => {
      res.statusCode = 500;
      res.json({'msg': 'Error'});
    });
  }
});*/


export const UserController: Router = router;
