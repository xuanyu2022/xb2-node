import { Request, Response, NextFunction } from 'express';
export declare const login: (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response<any>, next: NextFunction) => Promise<void>;
export declare const validate: (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response<any>, next: NextFunction) => void;
