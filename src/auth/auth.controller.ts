import {Request,Response,NextFunction} from 'express';
import {signToken} from './auth.service';



export const login = async (
  request:Request,
  response:Response,
  next:NextFunction
) => {
  const {user:{id,name}} = request.body;
     //const {id,name} =request.body;
   const payload = {id,name};
   try {
    const token = signToken ({payload});
    response.send({id,name,token});
       //console.log (payload);
      // console.log({payload});
  } catch (error) {
    next(error);
  }
 // response.send({message:`欢迎回来,${name}`});
};


/** 验证登录 */

export const validate = (
  request:Request,
  response:Response,
  next:NextFunction
) => {
  console.log(request.user);
  response.sendStatus(200);
};