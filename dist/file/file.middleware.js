"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const jimp_1 = __importDefault(require("jimp"));
const file_service_1 = require("./file.service");
const fileUpload = multer_1.default({
    dest: 'uploads/',
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
    const { imageSize, tags } = image['_exif'];
    request.fileMetaData = {
        width: imageSize.width,
        height: imageSize.height,
        metadata: JSON.stringify(tags),
    };
    file_service_1.imageResizer(image, request.file);
    next();
};
//# sourceMappingURL=file.middleware.js.map