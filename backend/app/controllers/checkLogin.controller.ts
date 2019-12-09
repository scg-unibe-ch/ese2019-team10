import {NextFunction, Request, Response, Router} from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

const RSA_PUBLIC_KEY: Buffer = fs.readFileSync('dev-public.key');

const router: Router = Router();

function checkAndHandleJWT(req: Request, res: Response, next: NextFunction) {
  const jwtToken: string | undefined = req.header('auth');

  // if auth is not set in request header, return unauthorized
  if (jwtToken === undefined || jwtToken === null) {
    res.sendStatus(401);
    return;
  }

  // if jwt.verify succeeds (no error is thrown) the next function gets called. If it does not,
  // an error is thrown response is 401
  try {
    res.locals.jwtPayload = jwt.verify(jwtToken, RSA_PUBLIC_KEY);
    next();
  } catch (e) {
    res.sendStatus(401);
    return;
  }
}

router.get('/*', checkAndHandleJWT);
router.put('/*', checkAndHandleJWT);
router.post('/*', checkAndHandleJWT);
router.delete('/*', checkAndHandleJWT);

export const CheckLoginController: Router = router;
