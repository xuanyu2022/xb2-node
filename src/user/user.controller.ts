import {Request,Response,NextFunction} from 'express';
import {UserModel} from './user.model';
import * as userService from './user.service';

export const store = async (
  request:Request,
  response:Response,
  next:NextFunction
) => {
  const {name,password} = request.body;

  try{
    const data = await userService.createUser({name,password});
    
    response.status(201).send(data);
  }catch(error){
    next(error);
  };

};



/** 
 * 用户账户
*/
export const show= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
 const { userId } = request.params;
 
try {
  const user = await userService.getUserById(parseInt(userId,10));
  if(!user){
    return next(new Error('USER_NOT_FOUND'));
  }
  response.send(user);
   
} catch (error) {
  next(error);
}
};