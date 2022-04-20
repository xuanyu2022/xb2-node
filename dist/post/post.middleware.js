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
//# sourceMappingURL=post.middleware.js.map