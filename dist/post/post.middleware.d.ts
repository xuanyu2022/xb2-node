import { Request, Response, NextFunction } from 'express';
export declare const sort: (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response<any>, next: NextFunction) => Promise<void>;
export declare const filter: (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response<any>, next: NextFunction) => Promise<void>;
export declare const paginate: (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response<any>, next: NextFunction) => Promise<void>;