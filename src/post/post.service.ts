import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';


/** * 获取内容列表  */
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

/** 创建内容:                                                           定义存储用的服务 */
//createPost 执行把存储到post中
export const createPost = async (post: PostModel) => {
  const statement = `
              INSERT INTO post
              SET?
            `;
  // 执行SQL语句, post意思是代替?号的值
  const [data] = await connection.promise().query(statement, post);

  return data;
};



//**更新内容                                                            : 定义存储用的服务(更新) */

export const updatePost = async (postId:number,post:PostModel) => {
  const statement = `
    UPDATE post
    SET ?
    WHERE id=?
  `;
  const [data] = await connection.promise().query(statement,[post,postId]);
  return data;
};


//**删除内容 */

export const deletePost = async (postId:number) =>{
  const statement =`
    DELETE FROM post
    WHERE id=?
  `;

  const [data]= await connection.promise().query(statement,postId);
  return data;
}


