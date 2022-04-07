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
    const data = await createFile( {...fileinfo,userId, postId:parseInt(`${postId}`,10)});
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
   const file = await findFileById(parseInt(fileId,10));
  
   response.sendFile(file.filename,{
     root:'upload',
     header:{
       'content-type':file.mimetype,
     },
      });
 }catch(error){
   next(error);
 }

};

