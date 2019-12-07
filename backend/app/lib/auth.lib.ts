import {Response} from 'express';

/**
 * Checks for a given id if current user has this id and responds with 401 if it is not.
 *
 * @param response Response object for this operation (also holds the jwt payload)
 * @param id to check
 * @return true if the given one is the id of the logged in user, false otherwise
 */
export function respond40IfNotAuthentic(response: Response, id: number): boolean {
  if (response.locals.jwtPayload === null || response.locals.jwtPayload.id !== id) {
    response.status(401).json({'msg': 'You are not allowed to do this'});
    return false;
  } else {
    return true;
  }
}
