"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostController = __importStar(require("./post.controller"));
const post_middleware_1 = require("./post.middleware");
const auth_middleware_1 = require("../auth/auth.middleware");
const app_config_1 = require("../app/app.config");
const router = express_1.default.Router();
router.get('/posts', post_middleware_1.sort, post_middleware_1.filter, post_middleware_1.paginate(app_config_1.POSTS_PER_PAGE), PostController.index);
router.get('/posts/:postId', PostController.show);
exports.default = router;
router.post('/posts', auth_middleware_1.currentUser, auth_middleware_1.authGuard, PostController.store);
router.patch('/posts/:postId', auth_middleware_1.authGuard, auth_middleware_1.accessControl({ possession: true }), PostController.update);
router.delete('/posts/:postId', auth_middleware_1.authGuard, auth_middleware_1.accessControl({ possession: true }), PostController.destroy);
router.post('/posts/:postId/tag', auth_middleware_1.authGuard, auth_middleware_1.accessControl({ possession: true }), PostController.storePostTag);
router.delete('/posts/:postId/tag', auth_middleware_1.authGuard, auth_middleware_1.accessControl({ possession: true }), PostController.destroyPostTag);
//# sourceMappingURL=post.router.js.map