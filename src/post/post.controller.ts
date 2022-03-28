import { Request, Response, NextFunction } from 'express';
//接口处理器参数需要的类型
import {getPosts} from './post.service';

/**
 * 内容列表
 */
// 导出  处理器
export const index = (
  //指出参数的类型
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if( request.headers.authorization !=='SECRET'){
    return next(new Error());
  }
 
  const posts = getPosts();
  response.send(posts);
};


