import {NextFunction, Request, Response, Router} from 'express';
import {User} from '../models/user.model';

const router: Router = Router();
router.get(/^\/*/g, ( req: Request, res: Response, next: NextFunction ) => {
  const userEmail: string = res.locals.jwtPayload.sub;

  User.findOne( {where : {'email': userEmail}}).then( user => {
    if ( user !== null && user.isAdmin ) {
      next();
    }
  });
});

export const CheckAdminController: Router = router;
