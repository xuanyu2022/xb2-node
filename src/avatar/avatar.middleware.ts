import { Request, Response, NextFunction } from 'express';
import {fileFilter} from '../file/file.middleware';
import  multer  from 'multer';

const avatarUploadFilter = fileFilter(['image/png','image/jpg','image/jpeg']);

const avatarUpload = multer({
  dest:'uploads/avatar',
  fileFilter:avatarUploadFilter,
}); 

/**
* 文件拦截器
*/
export const avatarInterceptor = avatarUpload.single('avatar');
