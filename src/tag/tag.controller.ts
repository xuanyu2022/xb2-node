import {Request,Response,NextFunction } from 'express';  //处理器方法接受的参数的类型
import {createTag,getTagByName} from './tag.service';

/** 定义创建标签用的接口*/
export const store= async (
  request:Request,
  response:Response,
  next:NextFunction,
) =>{
    const {name } = request.body;

    try {
      const tag = await getTagByName(name);
      if(tag) throw new Error('TAG_ALREADY_EXIST');
      const data = await createTag({name}) ;
        response.status(201).send(data);
    } catch (error) {
      next(error);
    }
};