import { Request, Response, NextFunction } from 'express';


/** 
 * 过滤器
*/
export const filter= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
        request.filter = {
          name:'dafault',
          sql:'comment.parentId IS NULL'
        }
      next();
};