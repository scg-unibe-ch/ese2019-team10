import {Response} from 'express';

export function isAuthentic(response: Response, id: number): boolean {
  if (response.locals.jwtPayload === null || response.locals.jwtPayload.id !== id) {
    response.status(401).json({'msg': 'You are not allowed to do this'});
    return false;
  } else {
    return true;
  }
}
