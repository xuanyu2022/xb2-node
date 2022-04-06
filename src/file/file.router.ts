import express from 'express';
import * as fileController from './file.controller';
import {authGuard } from '../auth/auth.middleware';
import {fileInterceptor} from './file.middleware';
const router = express.Router();

router.post ('file',authGuard,fileInterceptor,fileController.store);
export default router;

