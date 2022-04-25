import { connection } from '../app/database/mysql';
import { GetPostsOptionsFilter } from '../post/post.service';
import { CommentModel } from './comment.model';
import {  sqlFragment} from './comment.provider';
export const createComment = async (comment: CommentModel) => {
  // 准备查询
  const statement = `
  INSERT INTO comment
  SET ?
  `;
  // 执行查询
  const [data] = await connection.promise().query(statement, comment);
  // 提供数据
  return data;
  };


/**
* 检查评论是否为回复评论
*/
export const isReplyComment = async (commentId: number) => {
  // 准备查询
  const statement = `
  SELECT parentId FROM comment
  WHERE id = ?
  `;
  // 执行查询
  const [data] = await connection.promise().query(statement,
  commentId);437
  // 返回结果
  return data[0].parentId ? true : false;
  };


  /**
* 修改评论
*/
export const updateComment = async (comment: CommentModel) => {
  // 准备数据
  const { id, content } = comment;
  // 准备查询
  const statement = `
  UPDATE comment
  SET content = ?
  WHERE id = ?
  `;
  // 执行查询
  const [data] = await connection.promise().query(statement,
  [content, id]);
  // 提供数据
  return data;
  };

  /**
* 删除评论
*/
export const deleteComment = async (commentId: number) => {
  // 准备查询
  const statement = `
  DELETE FROM comment
  WHERE id = ?
  `;
  // 执行查询
  const [data] = await connection.promise().query(statement, commentId);
  // 提供数据
  return data;
  };


  /** 
   * 获取评论列表
  */
  interface getCommentsOptions{
    filter?: GetPostsOptionsFilter;
  }

  export const getComments= async (options:getCommentsOptions) =>{

      const { filter } = options

  let params: Array<any>=[];
    if(filter.param){
      params = [filter.param,...params]
    }
  const statement =`
    SELECT 
        comment.id,
        comment.content,
        ${sqlFragment.user},
        ${sqlFragment.post}
        ${filter.name == 'userReplied'? `,${sqlFragment.repliedComments}`:''}
        ${filter.name !== 'userReplied'? `,${sqlFragment.totalReplies}`:''}
    FROM comment
        ${sqlFragment.leftJoinPost}
        ${sqlFragment.leftJoinUser}
    WHERE
         ${filter.sql}
    GROUP BY comment.id 
    ORDER BY comment.id DESC
  `;

  const [data] = await connection.promise().query(statement,params);

  return data;
   
  };