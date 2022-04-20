import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { connection } from '../app/database/mysql';
import { TagModel } from '../tag/tag.model';
import { getTagByName,createTag } from '../tag/tag.service';
//接口处理器参数需要的类型
import { getPosts, createPost, updatePost, deletePost, createPostTag, postHasTag,deletePostTag, } from './post.service';


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

  //如果执行异常, 就会执行catch区块里的东西.
  //next(error)指的是把遇到的异常情况交给 异常处理器 处理
  try {
    const posts = await getPosts({sort:request.sort,filter:request.filter,});
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

/**
 * 添加内容标签接口的处理器
 */

/** 添加内容标签*/
export const storePostTag= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
    const { postId } = request.params;
    const { name  } = request.body;
    let tag: TagModel;
   
    //查找标签
    try {
      tag = await getTagByName(name);
    } catch (error) {
      return next(error);
    }
   
    //有标签,  验证标签
    if(tag) {
         try {
           const postTag = await postHasTag(parseInt(postId,10),tag.id);
           if (postTag) return next(new Error('POST_ALREADY_HAS_THIS_TAG'));
          } catch (error) {
              return next(error);
             }
        }
    
        //没有标签, 创建标签
    if(!tag){
                try {
                  const data = await createTag({name});
                  tag = {id:data.insertId};
                } catch (error) {
                  return next(error);
                }
           }
    //给内容打上标签

        try {
          await createPostTag(parseInt(postId,10),tag.id);
         response.sendStatus(201);
       } catch (error) {
             return next(error);
          }
 
};


/**
 * 移除内容标签的接口
 */

//移除的处理器
export const destroyPostTag= async (    
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
      const { postId } = request.params;
      const { tagId }= request.body;

      try {
          await deletePostTag(parseInt(postId,10),tagId);
          response.sendStatus(200)
      } catch (error) {
        next(error);
      }
};