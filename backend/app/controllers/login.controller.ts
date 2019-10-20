import {Request, Response, Router} from 'express';
import {User} from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import {sha3_256} from 'js-sha3';
import {readFileSync} from 'fs';

const RSA_PRIVATE_KEY: Buffer = readFileSync('dev-private.key');

const router: Router = Router();

router.options('/', (req: Request, res: Response ) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.sendStatus(200);
});

router.post('/', async (req: Request, res: Response ) => {
  const userEmail: string = req.body.email.toLowerCase();
  const userPassword = req.body.password;

  // search for a user with provided email and compare password hashes
  User.findOne({where: {email: userEmail}}).then( user => {
    const providedPasswordHash: string = sha3_256(req.body.password);

    if ( user === null ) {
      res.sendStatus(401); // forbidden
      return;
    }

    const compareResult: number = user.passwordHash.localeCompare(providedPasswordHash);

    // if email and password match, return bearer token
    if (compareResult === 0) {
      const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 120,
        subject: userEmail
      });

      res.status(200).json({
        idToken: jwtBearerToken,
        expiresIn: 120
      });
    } else {
      res.sendStatus(401); // send unauthorized
    }
  });
});

export const LoginController: Router = router;
