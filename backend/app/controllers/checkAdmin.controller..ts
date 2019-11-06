import {NextFunction, Request, Response, Router} from 'express';
import {User} from '../models/user.model';

const router: Router = Router();

/* This method needs res.locals.jwtPayload.sub to be set. This attribute is set in the GET
   method of the checkLogin.controller.ts. In most cases, checkLogin.controller.ts will have
    to be put before this controller in the routing chain.*/
router.all('/*', ( req: Request, res: Response, next: NextFunction ) => {
  const userEmail: string = res.locals.jwtPayload.sub;
  console.log(userEmail);

  User.findOne( {where : {'email': userEmail}}).then( user => {
    if ( user !== null ) {
      user.$has('role', 1).then(hasAdminRole => {
        if (hasAdminRole) {
          next();
        } else {
          res.statusCode = 401;
          res.json({'msg': 'You are not authorized to do this!'});
        }
      });
    }
  });
});

export const CheckAdminController: Router = router;
