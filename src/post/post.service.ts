import {connection} from '../app/database/mysql';
/**
 * 获取内容列表
 */
export const getPosts = async () => {
  // const data = [
  //   {
  //     content: '明月出天山, 苍茫云海间',
  //   },
  //   {
  //     content: '会当凌绝顶,一览众山小',
  //   },
  //   {
  //     content: '日出江花红似火, 春来江水绿如蓝',
  //   },
  // ];
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
       const [data] = await connection.promise().query(statement);
       
       return data;
};