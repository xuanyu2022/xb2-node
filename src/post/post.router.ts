import express from 'express';
import * as PostController from './post.controller';
import {sort,filter, paginate } from './post.middleware';
import {authGuard, accessControl, currentUser} from '../auth/auth.middleware';
import { POSTS_PER_PAGE } from '../app/app.config';
const router = express.Router();


//内容列表               
router.get('/posts', sort, filter, paginate(POSTS_PER_PAGE),PostController.index);
/**单个内容 */
router.get('/posts/:postId',PostController.show);


export default router;
//创建内容                                存储内容
router.post('/posts',currentUser,authGuard, PostController.store);
//更新内容              
router.patch('/posts/:postId',currentUser,authGuard, accessControl({possession:true}), PostController.update);

//**删除内容 */

router.delete('/posts/:postId',currentUser,authGuard, accessControl({possession:true}), PostController.destroy);

/**添加内容标签 */
router.post('/posts/:postId/tag',currentUser,authGuard,accessControl({possession:true}), PostController.storePostTag,);
/** 移除内容标签 */

router.delete('/posts/:postId/tag',currentUser,authGuard,accessControl({possession:true}), PostController.destroyPostTag);


