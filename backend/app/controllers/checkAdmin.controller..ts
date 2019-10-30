import {NextFunction, Request, Response, Router} from 'express';
import {User} from '../models/user.model';

const router: Router = Router();

/* This method needs res.locals.jwtPayload.sub to be set. This attribute is set in the GET
   method of the checkAccess.controller.ts. In most cases, checkAccess.controller.ts will have
    to be put before this controller in the routing chain.*/
router.get(/^\/*/g, ( req: Request, res: Response, next: NextFunction ) => {
  const userEmail: string = res.locals.jwtPayload.sub;

  User.findOne( {where : {'email': userEmail}}).then( user => {
    if ( user !== null ) {
      user.Role.forEach((role) => { if (role.name === 'Admin') { next(); } });
    }

    req.statusCode = 401;
    req.statusMessage = 'You are not authorized to do this!';
  });
});

export const CheckAdminController: Router = router;
