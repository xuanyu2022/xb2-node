import { Request, Response, NextFunction } from 'express';

/**
 * 输出请求地址,  这是演示用的. 22集中间件的时候取消使用他.post.router中
 */
export const requestUrl = (
  //指出参数的类型
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.url);
  next();
};

/**
 * 默认的   异常处理器
 */

export const defaultErrorHandler = (
  //指出参数的类型
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error.message) {
    console.log('黄色警告', error.message);
  }

  let statusCode: number, message: string;
  //处理异常
  switch (error.message) {
    case 'NAME_IS_REQUIRED':
      statusCode = 400;
      message = '请提供用户名';
      break;
    case 'PASSWORD_IS_REQUIRED':
      statusCode = 400;
      message = '请提供用户密码';
      break;    
    case 'USER_ALREADY_EXIST':
        statusCode = 409;
        message = '用户名已被占用';
        break; 
    case 'USER_DOES_NOT_EXIST':
          statusCode = 400;
          message = '用户不存在';
          break;  
   case 'PASSWORD_DOES_NOT_MATCH':
          statusCode = 400;
          message = '密码不对';
          break;   
   case 'UNAUTHORIZED': 
            statusCode = 401;
            message = '请先登录';
            break;  
    case 'USER_DOES_NOT_OWN_RESOURCE': 
            statusCode = 403;
            message = '您不能处理这个内容';
            break;  
     case 'FILE_NOT_FOUND': 
            statusCode = 404;
            message = '文件不存在';
            break;  
    case 'TAG_ALREADY_EXIST': 
            statusCode = 400;
            message = '标签已经存在';
            break;  
    case 'POST_ALREADY_HAS_THIS_TAG': 
            statusCode = 400;
            message = 'nei标签已有';
            break;  
   case 'UNABLE_TO_REPLY_THIS_COMMENT': 
            statusCode = 400;
            message = '无法回复这条标签';
            break;  

  case 'FILE_TYPE_NOT_ACCEPT': 
            statusCode = 400;
            message = '不能上传此类型的文件';
            break; 
   case 'FILE_NOT_FOUND': 
            statusCode = 400;
            message = '找不到该文件';
            break; 
    case 'NOT_FOUND': 
            statusCode = 404;
            message = '没找到~~~';
            break; 
    case 'USER_NOT_FOUND': 
            statusCode = 404;
            message = '没有找到用户';
            break; 
    case 'PASSWORD_IS_THE_SAME': 
            statusCode = 400;
            message = '要修改的密码不能与原密码一致';
            break; 
     case '': 
            statusCode = 400;
            message = '';
            break;
     case '': 
            statusCode = 400;
            message = '';
            break; 
     case '': 
            statusCode = 400;
            message = '';
            break;  
    
    default:
      statusCode = 500;
      message = '服务暂时出了点问题 ~~';
      break;
  }

  response.status(statusCode).send({ message });
};
