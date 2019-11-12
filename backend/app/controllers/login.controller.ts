import {Request, Response, Router} from 'express';
import {User} from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import {sha3_256} from 'js-sha3';
import {readFileSync} from 'fs';
import {Role} from '../models/role.model';

const RSA_PRIVATE_KEY: Buffer = readFileSync('dev-private.key');
const EXPIRY_TIME: number = 60 * 60 * 2; // jwt expiry time in seconds

const router: Router = Router();

router.post('/', async (req: Request, res: Response ) => {
  const userEmail: string = req.body.email.toLowerCase();

  // search for a user with provided email and compare password hashes
  User.findOne( { where: {email: userEmail}, include: [Role] } )
    .then( user => {
      const providedPasswordHash: string = sha3_256(req.body.password);

      if ( user === null ) {
        res.statusMessage = 'Wrong username/password combination.';
        res.sendStatus(401); // forbidden
        return;
      }

      const passwordCorrect: boolean = (user.passwordHash.localeCompare(providedPasswordHash) === 0);

      // if email and password match and user is approved, return bearer token, otherwise unauthorized
      if ( ! user.approved ) {
        res.statusCode = 401;
        res.send({
          msg: 'Account is not approved yet.'
        }); // send unauthorized
      } else if ( ! passwordCorrect ) {
        res.statusCode = 401;
        res.send({
          msg: 'Wrong username/password combination.'
        }); // send unauthorized
      } else {
        const roleIdList = user.role.map(role => role.id);
        const jwtBearerToken = jwt.sign({
            roles: roleIdList,
            id: user.id
          },
          RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: EXPIRY_TIME,
            subject: userEmail
          });

        res.status(200).json({
          idToken: jwtBearerToken,
          userId: user.id,
          isAdmin: roleIdList.includes(1),
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
