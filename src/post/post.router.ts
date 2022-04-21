import express from 'express';
import * as PostController from './post.controller';
import {sort,filter, paginate } from './post.middleware';
import {authGuard, accessControl} from '../auth/auth.middleware';
const router = express.Router();

//内容列表               
router.get('/posts', sort, filter, paginate, PostController.index);

export default router;
//创建内容                                存储内容
router.post('/posts', authGuard, PostController.store);
//更新内容              
router.patch('/posts/:postId',authGuard, accessControl({possession:true}), PostController.update);

//**删除内容 */

router.delete('/posts/:postId',authGuard, accessControl({possession:true}), PostController.destroy);

/**添加内容标签 */
router.post('/posts/:postId/tag',authGuard,accessControl({possession:true}), PostController.storePostTag,);
/** 移除内容标签 */

router.delete('/posts/:postId/tag',authGuard,accessControl({possession:true}), PostController.destroyPostTag);
