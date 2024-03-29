import {NextFunction, Request, Response, Router} from 'express';
import {User} from '../models/user.model';

const router: Router = Router();

/* This method needs res.locals.jwtPayload.sub to be set. This attribute is set in the GET
   method of the checkLogin.controller.ts. In most cases, checkLogin.controller.ts will have
    to be put before this controller in the routing chain.*/
router.all('/*', ( req: Request, res: Response, next: NextFunction ) => {
  if ( ! res.locals.jwtPayload.roles) {
    throw Error('Trying to access user data for a user that is not logged in');
  } else if (res.locals.jwtPayload.roles.includes(1)) {
    next();
  } else {
    res.statusCode = 401;
    res.json({'msg': 'You are not authorized to do this!'});
  }
});

export const CheckAdminController: Router = router;
