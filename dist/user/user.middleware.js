"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService = __importStar(require("./user.service"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.validateUserData = async (request, response, next) => {
    console.log('验证用户数据');
    const { name, password } = request.body;
    if (!name)
        return next(new Error('NAME_IS_REQUIRED'));
    if (!password)
        return next(new Error('PASSWORD_IS_REQUIRED'));
    const user = await userService.getUserByName(name);
    if (user)
        return next(Error('USER_ALREADY_EXIST'));
    next();
};
exports.hashpassword = async (request, Response, next) => {
    const { password } = request.body;
    request.body.password = await bcryptjs_1.default.hash(password, 10);
    next();
};
//# sourceMappingURL=user.middleware.js.map