"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService = __importStar(require("./user.service"));
exports.store = async (request, response, next) => {
    const { name, password } = request.body;
    try {
        const data = await userService.createUser({ name, password });
        response.status(201).send(data);
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.show = async (request, response, next) => {
    const { userId } = request.params;
    try {
        const user = await userService.getUserById(parseInt(userId, 10));
        if (!user) {
            return next(new Error('USER_NOT_FOUND'));
        }
        response.send(user);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=user.controller.js.map