import express from 'express';
import * as authController from './auth.controller';

const router = express.Router();

export default router;

router.post('/login',authController.login);