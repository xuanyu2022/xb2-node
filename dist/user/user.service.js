"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../app/database/mysql");
exports.createUser = async (user) => {
    const statement = `
    INSERT INTO user
    SET ?
  `;
    const [data] = await mysql_1.connection.promise().query(statement, user);
    return data;
};
;
exports.getUser = (condition) => {
    return async (param, options = {}) => {
        const { password } = options;
        const statement = `
      SELECT 
        user.id,
        user.name,
        IF (COUNT(avatar.id),1,NULL) AS avatar
        ${password ? ', password' : ''} 
      FROM
             user
      LEFT JOIN avatar
        ON avatar.userId = user.id
      WHERE ${condition} = ?
    `;
        const [data] = await mysql_1.connection.promise().query(statement, param);
        console.log(data[0]);
        return data[0];
    };
};
exports.getUserByName = exports.getUser('user.name');
exports.getUserById = exports.getUser('user.id');
//# sourceMappingURL=user.service.js.map