import express from 'express';
import * as PostController from './post.controller';
import { requestUrl } from '../app/app.middleware';
const router = express.Router();

//定义接口
router.get('/posts', requestUrl, PostController.index);

export default router;
//存储内容的接口
router.post('/posts', PostController.store);
//更新内容的接口
router.patch('/posts/:postId',PostController.update);