import { Request, Response, NextFunction } from 'express';
import {fileFilter} from '../file/file.middleware';
import  multer  from 'multer';
import Jimp from 'jimp';
import path from 'path';

const avatarUploadFilter = fileFilter(['image/png','image/jpg','image/jpeg']);

const avatarUpload = multer({
  dest:'uploads/avatar',
  fileFilter:avatarUploadFilter,
}); 

/**
* 文件拦截器
*/
export const avatarInterceptor = avatarUpload.single('avatar');


/** 
 * 头像处理器
*/
export const avatarProcessor= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
    const { file } = request
    const filePath = path.join(file.destination,'resized',file.filename);
    try {
      const image = await Jimp.read(file.path);

       image
            .cover(256,256)
            .quality(85)
            .write(`${filePath}-large`);
       image
            .cover(128,128)
            .quality(85)
            .write(`${filePath}-medium`);
       image
            .cover(64,64)
            .quality(85)
            .write(`${filePath}-small`);   

    } catch (error) {
      next(error);
    }
  next();  
};