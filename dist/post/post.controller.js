"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_service_1 = require("./post.service");
exports.index = async (request, response, next) => {
    const posts = await post_service_1.getPosts();
    response.send(posts);
};
//# sourceMappingURL=post.controller.js.map