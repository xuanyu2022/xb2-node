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
const fileController = __importStar(require("./file.controller"));
const auth_middleware_1 = require("../auth/auth.middleware");
const file_middleware_1 = require("./file.middleware");
const router = express_1.default.Router();
router.post('/files', auth_middleware_1.authGuard, file_middleware_1.fileInterceptor, fileController.store);
exports.default = router;
//# sourceMappingURL=file.router.js.map