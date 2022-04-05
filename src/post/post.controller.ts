import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
//接口处理器参数需要的类型
import { getPosts, createPost, updatePost, deletePost } from './post.service';

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
  } catch (error) {
    next(error);
  }
};

//**创建内容  */

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { title, content } = request.body;
  const {id:userId } = request.user;
  try {
    const data = await createPost({ title, content,userId});
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};


//**更新内容-  12章 */

export const update = async (
  request: Request,
  response:Response,
  next:NextFunction
) => {
    const {postId} =request.params;
    const post = _.pick(request.body,['title','content']);

    try{
      const data = await updatePost(parseInt(postId,10), post);
      response.send(data);
    }catch(error){
      next(error);
    }
};

//** 删除内容*/

export const destroy = async (
  request:Request,
  response:Response,
  next:NextFunction
) =>{
  const {postId}=request.params;

  try{
    const data = await deletePost(parseInt(postId,10));
    response.send(data);
  }catch(error){
    next(error);
  }
};