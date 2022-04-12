"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_router_1 = __importDefault(require("../post/post.router"));
const app_middleware_1 = require("./app.middleware");
const auth_router_1 = __importDefault(require("../auth/auth.router"));
const user_router_1 = __importDefault(require("../user/user.router"));
const file_router_1 = __importDefault(require("../file/file.router"));
const tag_router_1 = __importDefault(require("../tag/tag.router"));
const comment_router_1 = __importDefault(require("../comment/comment.router"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(post_router_1.default, user_router_1.default, auth_router_1.default, file_router_1.default, tag_router_1.default, comment_router_1.default);
app.use(app_middleware_1.defaultErrorHandler);
exports.default = app;
//# sourceMappingURL=index.js.map