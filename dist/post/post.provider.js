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
  `,
    totalComments: `
  (
    SELECT 
        COUNT(comment.id)
    FROM
       comment
    WHERE
       comment.postId = post.id
    ) as totalComments
  `,
    leftJoinOneFile: `
  LEFT JOIN LATERAL (
  SELECT *
  FROM file
  WHERE file.postId = post.id
  ORDER BY file.id DESC
  LIMIT 1
  ) AS file ON post.id = file.postId
  `,
    file: `
  CAST(
     IF (
      COUNT(file.id),
      GROUP_CONCAT(
           DISTINCT JSON_OBJECT(
          'id', file.id,
         'width', file.width,
         'height', file.height
           )
       ),
     NULL
   ) AS JSON
  ) AS file
  `,
    leftJoinTags: `
      LEFT JOIN post_tag
      ON post_tag.postId = post.id
      LEFT JOIN tag
      ON tag.id = post_tag.tagId
  `,
    tags: `
     CAST(
       IF(
         COUNT(tag.id),
         CONCAT(
           '[',
              GROUP_CONCAT(
                DISTINCT JSON_OBJECT(
                   'id',tag.id,
                   'name',tag.name
                )
              ),
          ']'
         ),
         NULL
       )AS JSON
     )AS tags
`,
};
//# sourceMappingURL=post.provider.js.map