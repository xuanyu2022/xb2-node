"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlFragment = {
    leftJoinUser: `
    LEFT JOIN user
      ON user.id = comment.userId
    LEFT JOIN avatar
      ON avatar.userId = user.id
  `,
    user: `
    JSON_OBJECT(
      'id',user.id,
      'name',user.name,
      'avatar',IF(COUNT(avatar.id),1,NULL)
    ) as user
  `,
    leftJoinPost: `
      LEFT JOIN post
        ON post.id= comment.postId

  `,
    post: `
      JSON_OBJECT(
        'id', post.id,
        'title',post.title
      ) as post
  `,
    repliedComments: `
        (
          SELECT 
                JSON_OBJECT(
                    'id', repliedComment.id,
                    'content',repliedComment.content
                )
          FROM 
                  comment repliedComment
          WHERE 
                  
                  comment.parentId = repliedComment.id
        )as repliedComments
`,
    totalReplies: `
        (SELECT 
            COUNT(DISTINCT reply.id)
        FROM comment reply
        WHERE 
            reply.parentId = comment.id
          )AS totalReplies
`,
};
//# sourceMappingURL=comment.provider.js.map