"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../app/database/mysql");
exports.createComment = async (comment) => {
    const statement = `
  INSERT INTO comment
  SET ?
  `;
    const [data] = await mysql_1.connection.promise().query(statement, comment);
    return data;
};
//# sourceMappingURL=comment.service.js.map