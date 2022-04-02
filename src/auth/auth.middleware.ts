import {Request,Response,NextFunction} from 'express';
import * as userService from '../user/user.service';

export const validateLoginData = async (
  request:Request,
  response:Response,
  next: NextFunction
) =>{
  const {name,password} = request.body;
  
  if(!name) return next(new Error('NAME_IS_REQUIRED'));
  if(!password) return next(new Error('PASSWORD_IS_REQUIRED'));

  const user = await userService.getUserByName(name);
  if(!user) return next(Error('USER_DOES_NOT_EXIST'));

  next();
};