import express from 'express';
import { authGuard } from '../auth/auth.middleware';
import * as tagController from './tag.controller';


//创建标签路由
const router = express.Router();

router.post('/tags', authGuard,tagController.store);
//导出路由
export default router;