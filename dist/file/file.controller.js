"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const file_service_1 = require("./file.service");
exports.store = async (request, response, next) => {
    const { id: userId } = request.user;
    const { post: postId } = request.query;
    const fileinfo = lodash_1.default.pick(request.file, ['originalname', 'mimetype', 'filename', 'size',]);
    try {
        const data = await file_service_1.createFile(Object.assign(Object.assign({}, fileinfo), { userId, postId: parseInt(`${postId}`, 10) }));
        response.status(201).send(data);
    }
    catch (error) {
        next(error);
    }
};
exports.serve = async (request, response, next) => {
    const { fileId } = request.params;
    try {
        const file = await file_service_1.findFileById(parseInt(fileId, 10));
        response.sendFile(file.filename, {
            root: 'upload',
            header: {
                'content-type': file.mimetype,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=file.controller.js.map