import {Request, Response, Router} from 'express';
import {User} from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import {sha3_256} from 'js-sha3';
import {readFileSync} from 'fs';
import {Role} from '../models/role.model';

const RSA_PRIVATE_KEY: Buffer = readFileSync('dev-private.key');
const EXPIRY_TIME: number = 60 * 60 * 2; // jwt expiry time in seconds

const router: Router = Router();

/**
 * Get a JWT token string for given values
 *
 * @param id ID of the user who requests the token
 * @param email email address of the user who requests the token
 * @param roles array of numbers representing roles the user has
 */
function getJWT(id: number, email: string, roles: number[]): string {
  return jwt.sign({
      roles: roles,
      id: id
    },
    RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: EXPIRY_TIME,
      subject: email
    });
}

router.post('/', async (req: Request, res: Response ) => {
  const userEmail: string = req.body.email.toLowerCase();

  // search for a user with provided email and compare password hashes
  User.findOne( { where: {email: userEmail}, include: [Role] } )
    .then( user => {
      const providedPasswordHash: string = sha3_256(req.body.password);

      // if the user was not found, the login fails because of wrong username
      if ( user === null ) {
        res.statusCode = 401;
        res.send({msg: 'Failed to log in: Wrong username/password'}); // forbidden
        return;
      }

      const passwordCorrect: boolean = (user.passwordHash.localeCompare(providedPasswordHash) === 0);

      // if email and password do not match or user is not approved return unauthorized...
      if ( ! user.approved || ! passwordCorrect ) {
        const reason = (!passwordCorrect) ? 'Wrong username/password' : 'Account not approved yet';

        res.statusCode = 401;
        res.send({
          msg: 'Failed to log in: ' + reason
        });
      // ...otherwise send back JWT token string and some session/user info
      } else {
        const roleIdList = user.role.map(role => role.id);
        const jwtBearerToken = getJWT(user.id, user.email, roleIdList);

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
          res.sendStatus(500);
          return;
      });
});

export const LoginController: Router = router;
