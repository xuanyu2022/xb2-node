import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import { createAvatar, findAvatarByUserId } from './avatar.service';

/**
* 上传头像
*/
export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
  ) => {

    //当前用户的ID  
    const {id: userId } = request.user;
    //头像文件信息
    const fileInfo=_.pick(request.file,['mimetype','size','filename']);
    //准备头像数据   组合起来
    const avatar = {...fileInfo,userId};
    try {
      //保存头像数据
      const data = await createAvatar(avatar);    
      //做出响应
      response.status(201).send(data);
    } catch (error) {
      next(error);
    }
 };

/** 
 * 头像服务
*/
export const serve= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
      const { userId } = request.params;

    try {
          const avatar = await findAvatarByUserId(parseInt(userId,10));
          if (!avatar){
            throw new Error('FILE_NOT_FOUND')
          }
    const { size } = request.query;
    //文件名与目录
    let filename = avatar.filename;
    let root = path.join('uploads','avatar');
    let resized = 'resized';
     

    if(size){
      //可用的头寸尺寸
        const imageSize=['large','medium','small'];
       //测试可用的头像尺寸, 与客户端提交的相比较. 
        if(!imageSize.some(item=>item==size)){
          throw new Error('FILE_NOT_FOUND')
        }
  //检查文件是否存在
    const fileExist = fs.existsSync(path.join(root,resized,`${filename}-${size}`));
    
    if(!fileExist){
      filename = `${filename}-${size}` ;
      root = path.join(root,resized);
    }
  }

   
    response.sendFile(filename,{root,headers:{'content-type':avatar.mimetype}});


    } catch (error) {
      next(error);
    }
};