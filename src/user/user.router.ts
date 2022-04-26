import express from 'express';
import * as userController from './user.controller';
import {validateUserData,hashpassword,validateUpdateUserData} from './user.middleware';
  import { authGuard } from '../auth/auth.middleware';
const router = express.Router();
  
export default router;


  //**创建用户的接口 */
  router.post('/users',validateUserData, hashpassword, userController.store);

  /**
   * 用户账户
   */
    router.get('/user/:userId', userController.show);

    /**
     * 更新用户
     */
    router.patch('/users',authGuard,validateUpdateUserData,userController.update);