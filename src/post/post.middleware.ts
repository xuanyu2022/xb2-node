import { Request, Response, NextFunction } from 'express';

/** 排序方式  */
export const sort= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
  //获取客户端的排序方式  
  const {sort} = request.query;

  //排序用的sql
  let sqlsort:string;

  //设置排序用的SQL

  switch (sort) {
    case 'earliest':
        sqlsort = 'post.id DESC';
      break;
    case 'latest':
        sqlsort = 'post.id ASC';
      break;
   case 'most_comment':
        sqlsort = 'totalComments DESC,post.id ASC';
      break;
   default:
        sqlsort = 'post.id DESC';
      break;
  }
  request.sort = sqlsort;
  next();
};

/** 
 * 过滤列表
*/
export const filter= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
 const { tag, user, action } = request.query;
 
 //设置默认过滤
 request.filter = {
   name: 'defalut',
   sql: 'post.id IS NOT NULL',
 };

  if(tag && !user && !action){
    request.filter={
      name:'tagName',
      sql:'tag.name = ?',
      param:`${tag}`,
    };
  }
  if(user&& action== 'published' && !tag){
    request.filter={
      name:'userPublished',
      sql: 'user.id = ?',
      param:`${user}`,
    };
  }

  next();
};