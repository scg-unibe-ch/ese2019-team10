import {Request, Response, Router} from 'express';
import {User} from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import {sha3_256} from 'js-sha3';
import {readFileSync} from 'fs';

const RSA_PRIVATE_KEY: Buffer = readFileSync('dev-private.key');
const EXPIRY_TIME: number = 60 * 60 * 2; // expiry time in seconds

const router: Router = Router();

router.post('/', async (req: Request, res: Response ) => {
  const userEmail: string = req.body.email.toLowerCase();
  const userPassword = req.body.password;

  // search for a user with provided email and compare password hashes
  User.findOne( { where: {email: userEmail} } )
    .then( user => {
      const providedPasswordHash: string = sha3_256(req.body.password);

      if ( user === null ) {
        res.statusMessage = 'Wrong username/password combination.';
        res.sendStatus(401); // forbidden
        return;
      }

      const pwCompareResult: number = user.passwordHash.localeCompare(providedPasswordHash);

      // if email and password match and user is approved, return bearer token, otherwise unauthorized
      if ( ! user.approved ) {
        res.statusMessage = 'Account is not approved yet.';
        res.statusCode = 401;
        res.send({
          msg: 'Account is not approved yet.'
        }); // send unauthorized
      } else if ( pwCompareResult !== 0 ) {
        res.statusMessage = 'Wrong username/password combination.';
        res.statusCode = 401;
        res.send({
          msg: 'Wrong user/password combination.'
        }); // send unauthorized
      } else {
        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
          algorithm: 'RS256',
          expiresIn: EXPIRY_TIME,
          subject: userEmail
        });

        res.status(200).json({
          idToken: jwtBearerToken,
          userId: user.id,
          expiresIn: EXPIRY_TIME
        });
      }
    },
        err => {
          res.statusMessage = err;
          res.sendStatus(401); // forbidden
          return;
      });
});

export const LoginController: Router = router;
