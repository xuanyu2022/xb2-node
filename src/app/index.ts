import express from 'express';
import postRouter from '../post/post.router';
import { defaultErrorHandler } from './app.middleware';
import authRouter from '../auth/auth.router';
import userRouter from '../user/user.router';
import fileRouter from '../file/file.router';
import tagRouter from '../tag/tag.router';
import avatarRouter from '../avatar/avatar.router';
import commentRouter from '../comment/comment.router';
import likeRouter from '../like/like.router';
import appRouter from './app.router';
import { ALLOW_ORIGIN } from './app.config';
import cors from 'cors';
import { currentUser } from '../auth/auth.middleware';



//创建应用
const app = express();


/**
* 当前用户
*/
//全局使用currentUser中间件
app.use(currentUser);

// 处理json
app.use(express.json());
//使用路由    应用**路由
app.use(
  postRouter,
  userRouter,
  authRouter,
  fileRouter,
  tagRouter,
  commentRouter,
  avatarRouter,
  likeRouter,
  appRouter,

  );

//默认异常处理器
app.use(defaultErrorHandler);


/**
* 跨域资源共享
*/
app.use(
  cors({
  origin: ALLOW_ORIGIN,
  exposedHeaders: 'X-Total-Count',
  }),
  );

  /**
 * 导出应用
 */

export default app;
