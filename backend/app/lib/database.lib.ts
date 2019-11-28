import {Response} from 'express';

/************************************************************************
 * Validate if a row exists in the database                              *
 * @param model model (table) to consult                                 *
 * @param id integer, table's primary key to query                       *
 * @param message string, custom message to respond                      *
 *************************************************************************/
export async function isInstance(response: Response, model: any, id: number, message = 'Not found') {
  const instance = await model.findByPk(id);
  if (instance == null) {
    response.status(404).json({
      'msg': message
    });
    return false;
  } else {
    return instance;
  }
}

