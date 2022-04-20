"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = async (request, response, next) => {
    const { sort } = request.query;
    let sqlsort;
    switch (sort) {
        case 'earliest':
            sqlsort = 'post.id DESC';
            break;
        case 'latest':
            sqlsort = 'post.id ASC';
            break;
        case 'most_comment':
            sqlsort = 'totalComments DESC,post.id ASC';
            break;
        default:
            sqlsort = 'post.id DESC';
            break;
    }
    request.sort = sqlsort;
    next();
};
exports.filter = async (request, response, next) => {
    const { tag, user, action } = request.query;
    request.filter = {
        name: 'defalut',
        sql: 'post.id IS NOT NULL',
    };
    if (tag && !user && !action) {
        request.filter = {
            name: 'tagName',
            sql: 'tag.name = ?',
            param: `${tag}`,
        };
    }
    if (user && action == 'published' && !tag) {
        request.filter = {
            name: 'userPublished',
            sql: 'user.id = ?',
            param: `${user}`,
        };
    }
    next();
};
//# sourceMappingURL=post.middleware.js.map