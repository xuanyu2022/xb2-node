import { Request, Response, NextFunction } from 'express';


/** 
 * 过滤器
*/
export const filter= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
        const {post,user,action} = request.query;
  
        request.filter = {
          name:'dafault',
          sql:'comment.parentId IS NULL'
        }

        if(post && !user && !action ){

            request.filter ={
              name:'postComments',
              sql:'comment.parentId IS NULL AND comment.postId = ?',
              param:`${post}`,
            }
        }

        




      next();
};