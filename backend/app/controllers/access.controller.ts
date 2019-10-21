import {Request, Response, Router} from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

const RSA_PUBLIC_KEY: Buffer = fs.readFileSync('dev-public.key');

const router: Router = Router();
router.get('/', (req: Request, res: Response) => {
  const jwtToken: string | undefined = req.header('auth');
  // if auth is not set, return unauthorized
  if ( ! jwtToken === undefined ) {
    res.sendStatus(401);
    return;
  }
  try {
    // @ts-ignore -- can be ignored because jwtToken cannot be undefined here
    res.locals.jwtPayload = jwt.verify(jwtToken, RSA_PUBLIC_KEY);
  } catch (e) {
    res.sendStatus(401);
    return;
  }
});

export const AccessController: Router = router;
