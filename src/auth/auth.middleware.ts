import {Request,Response,NextFunction} from 'express';
import * as userService from '../user/user.service';
import bcryptjs from 'bcryptjs';
import { config } from 'dotenv/types';

export const validateLoginData = async (
  request:Request,
  response:Response,
  next: NextFunction
) =>{
 
  const {name,password} = request.body;
  
  //验证必填数据
  if(!name) return next(new Error('NAME_IS_REQUIRED'));
  if(!password) return next(new Error('PASSWORD_IS_REQUIRED'));

  //验证用户名
  const user = await userService.getUserByName(name,{password:true});
  if(!user) return next(Error('USER_DOES_NOT_EXIST'));


  //验证用户密码
  const matched = await bcryptjs.compare(password, user.password);
  console.log(user.password);
  console.log(password);
    if(!matched) return next(new Error('PASSWORD_DOES_NOT_MATCH'));
  
  next();
};