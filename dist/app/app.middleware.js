"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestUrl = (request, response, next) => {
    console.log(request.url);
    next();
};
exports.defaultErrorHandler = (error, request, response, next) => {
    if (error.message) {
        console.log('黄色警告', error.message);
    }
    let statusCode, message;
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
        default:
            statusCode = 500;
            message = '服务暂时出了点问题 ~~';
            break;
    }
    response.status(statusCode).send({ message });
};
//# sourceMappingURL=app.middleware.js.map