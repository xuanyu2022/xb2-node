"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const jimp_1 = __importDefault(require("jimp"));
const fileUpload = multer_1.default({
    dest: 'upload/',
});
exports.fileInterceptor = fileUpload.single('file');
exports.fileProcessor = async (request, response, next) => {
    const { path } = request.file;
    let image;
    try {
        image = await jimp_1.default.read(path);
    }
    catch (error) {
        return next(error);
    }
    console.log(image);
    next();
};
//# sourceMappingURL=file.middleware.js.map