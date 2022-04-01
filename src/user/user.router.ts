import express from 'express';
import * as userController from './user.controller';
import {validateUserData} from './user.middleware';
  const router = express.Router();
  export default router;


  //**创建用户的接口 */
  router.post('/users',validateUserData,userController.store);