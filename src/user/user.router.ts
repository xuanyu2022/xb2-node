import express from 'express';
import * as userController from './user.controller';
  const router = express.Router();
  export default router;

  router.post('/users',userController.store);