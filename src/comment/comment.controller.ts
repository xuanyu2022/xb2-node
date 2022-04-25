import { Request, Response, NextFunction } from 'express';
import { createComment,isReplyComment,updateComment,deleteComment, getComments,getCommentsTotalCount,getCommentReplies } from './comment.service';

/**
* 发表评论
*/
export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
  ) => {
  // 准备数据
  const { id: userId } = request.user;
  const { content, postId } = request.body;
  //声明一个comment, 组织一下他的值, 其中为简写, 正常的应该是 content:content,
  const comment = {
  content,
  postId,
  userId,
  };
  try {
  // 保存评论
  const data = await createComment(comment);
  // 做出响应
  response.status(201).send(data);
  } catch (error) {
  next(error);
  }
  };


  /**
* 回复评论
*/
export const reply = async (
  request: Request,
  response: Response,
  next: NextFunction,
  ) => {
  // 准备数据
  const { commentId } = request.params;
  const parentId = parseInt(commentId, 10);
  const { id: userId } = request.user;
  const { content, postId } = request.body;
  const comment = {
  content,
  postId,
  userId,
  parentId,
  };

  try {
  // 检查评论是否为回复评论
  const reply = await isReplyComment(parentId);
  if (reply) return next(new
  Error('UNABLE_TO_REPLY_THIS_COMMENT'));
  } catch (error) {
  return next(error);
  }
  
  try {
  // 回复评论
  const data = await createComment(comment);
  // 做出响应
  response.status(201).send(data);
  } catch (error) {
  next(error);
  }
  };



  /**
* 修改评论
*/
export const update = async (
  request: Request,
  response: Response,
  next: NextFunction,
  ) => {
  // 准备数据
  const { commentId } = request.params;
  const { content } = request.body;
  const comment = {
  id: parseInt(commentId, 10),
  content,
  };
  try {
  // 修改评论446
  const data = await updateComment(comment);
  // 做出响应
  response.send(data);
  } catch (error) {
  next(error);
  }
  };


/**
* 删除评论
*/
export const destroy = async (
  request: Request,
  response: Response,
  next: NextFunction,
  ) => {
  // 准备数据
  const { commentId } = request.params;
  try {
  // 删除评论
  const data = await deleteComment(parseInt(commentId, 10));
  // 做出响应
  response.send(data);
  } catch (error) {
  next(error);
  }
  };


  /** 
   * 评论列表
  */
  export const index= async (
    request:Request,
    response:Response,
    next:NextFunction,
  ) =>{

    try {
         const totalCount =await  getCommentsTotalCount({ filter:request.filter });
        response.header('X-Total-Count',totalCount);
    } catch (error) {
      
    }
   try {
        const comments = await getComments({filter:request.filter,pagination:request.pagination,});

        response.send(comments);
   } catch (error) {
     next(error)
   }
  };

/** 
 * 回复列表
*/
export const indexRplies= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
  const {commentId } = request.params;
 try {
  const replies = await getCommentReplies({commentId:parseInt(commentId,10),});
  response.send(replies);
 } catch (error) {
   next(error);
 } 

};