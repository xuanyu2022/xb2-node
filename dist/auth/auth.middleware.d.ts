import { Request, Response, NextFunction } from 'express';
export declare const validateLoginData: (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response<any>, next: NextFunction) => Promise<void>;
export declare const authGuard: (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response<any>, next: NextFunction) => void;
