import { Request, Response, NextFunction } from 'express';
import { createComment } from './comment.service';

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