import {Request,Response,NextFunction} from 'express';
import * as userService from './user.service';
import bcryptjs from 'bcryptjs';
import _ from'lodash';


/**
 * 验证用户信息
 */
export const validateUserData = async (
  request:Request,
  response:Response,
  next:NextFunction
) =>{
  console.log('验证用户数据');
  const{name,password} = request.body;
    if(!name)  return next(new Error('NAME_IS_REQUIRED'));
  if(!password) return next(new Error('PASSWORD_IS_REQUIRED'));

  const user = await userService.getUserByName(name);

  if(user) return next(Error('USER_ALREADY_EXIST'));

  next();
};


export const hashpassword = async (
  request:Request,
  Response:Response,
  next:NextFunction
) => {
  const {password} = request.body;
  request.body.password = await bcryptjs.hash(password,10);
  next();
};

/** 
 * 验证 '更新  用户数据'
*/
export const validateUpdateUserData= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
  const {validate,update} = request.body;

  const {id: userId} = request.user;
  try {
    
    //检查用户是否提交了当前密码
    if(!_.has(validate,'password')){
      return next(new Error('PASSWORD_IS_REQUIRED'));
    }
    //调取用户数据
    const user = await userService.getUserById(userId,{password:true})
    //验证用户密码是否匹配
    const matched = await bcryptjs.compare(validate.password,user.password);

    if(!matched){
      return next(new Error('PASSWORD_DOES_NOT_MATCH'));
    }
    //检查用户名是否被占用
    if(update.name){
      const user = await userService.getUserByName(update.name);

      if(user){
        return next(new Error('USER_ALREADY_EXIST'));
      }
    }

    //处理用户更新密码
    if(update.password){
      const matched = await bcryptjs.compare(update.password,user.password);
      if(matched){
        return next(new Error('PASSWORD_IS_THE_SAME'));
      }
      //HASH 用户更新密码
      request.body.update.password = await bcryptjs.hash(update.password,10);
    }
      } catch (error) {
    return next(error);
  }
  next();
};