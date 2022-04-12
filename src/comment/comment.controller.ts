import { Request, Response, NextFunction } from 'express';
import { createComment,isReplyComment } from './comment.service';

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

