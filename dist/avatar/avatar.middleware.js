"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_middleware_1 = require("../file/file.middleware");
const multer_1 = __importDefault(require("multer"));
const avatarUploadFilter = file_middleware_1.fileFilter(['image/png', 'image/jpg', 'image/jpeg']);
const avatarUpload = multer_1.default({
    dest: 'uploads/avatar',
    fileFilter: avatarUploadFilter,
});
exports.avatarInterceptor = avatarUpload.single('avatar');
//# sourceMappingURL=avatar.middleware.js.map