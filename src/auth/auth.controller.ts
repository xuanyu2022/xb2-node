import {Request,Response,NextFunction} from 'express';

export const login = async (
  request:Request,
  response:Response,
  next:NextFunction
) => {
  const {name,password} = request.body;
  //验证数据
  response.send({message:`欢迎回来,${name}`});

};