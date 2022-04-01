"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../app/database/mysql");
exports.getPosts = async () => {
    const statement = `SELECT 
                            post.id,
                            post.title,
                            post.content, 
                            JSON_OBJECT(
                              'id',user.id,
                              'name',user.name
                              ) as user 
                       FROM post
                       LEFT JOIN user
                       ON user.id = post.userId     
     `;
    const [data] = await mysql_1.connection.promise().query(statement);
    return data;
};
exports.createPost = async (post) => {
    const statement = `
              INSERT INTO post
              SET?
            `;
    const [data] = await mysql_1.connection.promise().query(statement, post);
    return data;
};
//# sourceMappingURL=post.service.js.map