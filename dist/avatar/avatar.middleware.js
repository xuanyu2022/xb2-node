"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_middleware_1 = require("../file/file.middleware");
const multer_1 = __importDefault(require("multer"));
const jimp_1 = __importDefault(require("jimp"));
const path_1 = __importDefault(require("path"));
const avatarUploadFilter = file_middleware_1.fileFilter(['image/png', 'image/jpg', 'image/jpeg']);
const avatarUpload = multer_1.default({
    dest: 'uploads/avatar',
    fileFilter: avatarUploadFilter,
});
exports.avatarInterceptor = avatarUpload.single('avatar');
exports.avatarProcessor = async (request, response, next) => {
    const { file } = request;
    const filePath = path_1.default.join(file.destination, 'resized', file.filename);
    try {
        const image = await jimp_1.default.read(file.path);
        image
            .cover(256, 256)
            .quality(85)
            .write(`${filePath}-large`);
        image
            .cover(128, 128)
            .quality(85)
            .write(`${filePath}-medium`);
        image
            .cover(64, 64)
            .quality(85)
            .write(`${filePath}-small`);
    }
    catch (error) {
        next(error);
    }
    next();
};
//# sourceMappingURL=avatar.middleware.js.map