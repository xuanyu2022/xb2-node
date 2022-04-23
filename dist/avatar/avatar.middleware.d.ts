import { Request, Response, NextFunction } from 'express';
export declare const avatarInterceptor: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary>;
export declare const avatarProcessor: (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response<any>, next: NextFunction) => Promise<void>;
