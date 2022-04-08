import {Request,Response,NextFunction} from 'express';
import multer from 'multer';
import Jimp from 'jimp';

/**
 * 创建一个Multer
 */

const fileUpload = multer ({
  dest:'upload/',
});

/** 文件拦截器 */
export const fileInterceptor = fileUpload.single('file');

/** 文件处理器*/

export const fileProcessor= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
 const {path} = request.file;
 let image: Jimp;
 try {
   image = await Jimp.read(path);

 }catch (error){
   return next(error);
 }
 console.log(image);
 next();
};
