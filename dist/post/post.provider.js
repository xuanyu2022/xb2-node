"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlFragment = {
    user: `
  JSON_OBJECT(
    'id',user.id,
    'name',user.name
    ) as user 

  `,
    leftJoinUser: `
  LEFT JOIN user
  ON user.id = post.userId    
  `
};
//# sourceMappingURL=post.provider.js.map