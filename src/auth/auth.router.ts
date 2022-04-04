import express from 'express';
import * as authController from './auth.controller';
import { validateLoginData } from './auth.middleware';
import { authGuard } from './auth.middleware';
const router = express.Router();

 
/** 用户登录  */
router.post('/login',validateLoginData,authController.login); 
/**定义验证登录接口 */
router.post('/auth/validate', authGuard, authController.validate);








export default router;