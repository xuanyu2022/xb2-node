import path from 'path';
import fs from 'fs';
import {Request,Response,NextFunction} from 'express';
import _ from 'lodash';
import { createFile, findFileById} from './file.service';

//** 上传文件*/

export const store= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
  const {id:userId} = request.user;
  const {post:postId } = request.query;
  
  const fileinfo = _.pick (request.file, ['originalname','mimetype','filename','size',]);

  try {
    const data = await createFile( {
      ...fileinfo, 
      userId, 
      postId:parseInt(`${postId}`,10), 
      ...request.fileMetaData,
    });
    response.status(201).send(data);

  } catch (error) {
    next(error);
  }
};
/** 
 * 文件服务
*/

export const serve= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
 const {fileId} = request.params;

 try{
   //查找文件信息
   const file = await findFileById(parseInt(fileId,10));
  ////////////////////////////////////////////////////////////////////18章的插入内容.图片尺寸
   //要提供的图像尺寸
  const {size} = request.query;
  //文件名与目录
  let filename = file.filename;
  let root = 'uploads';
  let resized = 'resized';

    if (size){
      //可用的图像惠存
        const imageSize = ['large','medium','thumbnail'];
        if (!imageSize){//如果尺寸没有
          throw new Error('FILE_NOT_FOUND');
        }
        //检查文件是否存在
        const fileExist = fs.existsSync(path.join(root,resized,`${filename}-${size}`));
        if (fileExist) {
          filename = `${filename}-${size}`;
          root = path.join(root,resized);
        }
    }

  ////////////////////////////////////////////////////////////////////////////////////结束
  //做出响应
   response.sendFile(filename,{
     root,
     header:{
       'content-type':file.mimetype, 
     },
      });
 }catch(error){
   next(error);
 }

};



/** 文件信息*/

export const metadata= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
  const {fileId} = request.params;
  try {
    const file = await findFileById(parseInt(fileId,10));
    const data = _.pick(file,['id','size','width','height','metadata']);
    response.send(data);
  } catch (error) { 
    next(error);
  }
};