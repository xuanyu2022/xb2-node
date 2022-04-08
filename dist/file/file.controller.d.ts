import { Request, Response, NextFunction } from 'express';
export declare const store: (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response<any>, next: NextFunction) => Promise<void>;
export declare const serve: (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response<any>, next: NextFunction) => Promise<void>;
export declare const metadata: (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response<any>, next: NextFunction) => Promise<void>;
