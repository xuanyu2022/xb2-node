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
const userService = __importStar(require("../user/user.service"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.validateLoginData = async (request, response, next) => {
    const { name, password } = request.body;
    if (!name)
        return next(new Error('NAME_IS_REQUIRED'));
    if (!password)
        return next(new Error('PASSWORD_IS_REQUIRED'));
    const user = await userService.getUserByName(name, { password: true });
    if (!user)
        return next(Error('USER_DOES_NOT_EXIST'));
    const matched = await bcryptjs_1.default.compare(password, user.password);
    console.log(user.password);
    console.log(password);
    if (!matched)
        return next(new Error('PASSWORD_DOES_NOT_MATCH'));
    next();
};
//# sourceMappingURL=auth.middleware.js.map