"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_service_1 = require("./comment.service");
exports.store = async (request, response, next) => {
    const { id: userId } = request.user;
    const { content, postId } = request.body;
    const comment = {
        content,
        postId,
        userId,
    };
    try {
        const data = await comment_service_1.createComment(comment);
        response.status(201).send(data);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=comment.controller.js.map