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
        //内容的评论列表
        if(post && !user && !action ){

            request.filter ={
              name:'postComments',
              sql:'comment.parentId IS NULL AND comment.postId = ?',
              param:`${post}`,
            }
        }

      //用户的评论列表
        if(user && action=='published' &&!post){

          request.filter ={
            name:'userPublished',
            sql:'comment.parentId IS NULL AND comment.userId=?',
            param:`${user}`,
          }
      }
      //用户的回复评论列表
      if(user && action=='replied' &&!post){

        request.filter ={
          name:'userReplied',
          sql:'comment.parentId IS NOT NULL AND comment.userId=?',
          param:`${user}`,
        }
    }
  
        
      next();
};