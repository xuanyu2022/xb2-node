import {Request,Response,NextFunction} from 'express';
import * as userService from './user.service';

export const validateUserData = (
  request:Request,
  response:Response,
  next:NextFunction
) =>{
  console.log('验证用户数据');
  const{name,password} = request.body;

  if(!name)  return next(new Error('NAME_IS_REQUIRED'));
  if(!password) return next(new Error('PASSWORD_IS_REQUIRED'));

  next();
};