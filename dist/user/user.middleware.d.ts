import { Request, Response, NextFunction } from 'express';
export declare const validateUserData: (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response<any>, next: NextFunction) => Promise<void>;
export declare const hashpassword: (request: Request<import("express-serve-static-core").ParamsDictionary>, Response: Response<any>, next: NextFunction) => Promise<void>;
export declare const validateUpdateUserData: (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response<any>, next: NextFunction) => Promise<void>;
