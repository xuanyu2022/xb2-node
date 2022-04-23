import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
export declare const fileFilter: (fileTypes: string[]) => (request: Request<import("express-serve-static-core").ParamsDictionary>, file: Express.Multer.File, callback: multer.FileFilterCallback) => void;
export declare const fileInterceptor: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary>;
export declare const fileProcessor: (request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response<any>, next: NextFunction) => Promise<void>;
