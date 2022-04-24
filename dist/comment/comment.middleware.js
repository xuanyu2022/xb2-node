"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = async (request, response, next) => {
    const { post, user, action } = request.query;
    request.filter = {
        name: 'dafault',
        sql: 'comment.parentId IS NULL'
    };
    if (post && !user && !action) {
        request.filter = {
            name: 'postComments',
            sql: 'comment.parentId IS NULL AND comment.postId = ?',
            param: `${post}`,
        };
    }
    next();
};
//# sourceMappingURL=comment.middleware.js.map