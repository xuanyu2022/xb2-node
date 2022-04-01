import { Request, Response, NextFunction } from 'express';
//接口处理器参数需要的类型
import { getPosts } from './post.service';

/**
 * 内容列表
 */
// 导出  处理器
export const index = async (
  //指出参数的类型
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // if( request.headers.authorization !=='SECRET'){
  //   return next(new Error());
  // }
  //如果执行异常, 就会执行catch区块里的东西. 
  //next(error)指的是把遇到的异常情况交给 异常处理器 处理
try {
  const posts = await getPosts();
  response.send(posts);
} catch (error){
    next(error);
}
};
