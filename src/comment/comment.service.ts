import { connection } from '../app/database/mysql';
import { CommentModel } from './comment.model';

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


