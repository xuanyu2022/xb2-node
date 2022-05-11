import { connection } from '../app/database/mysql';
import { TokenPayload } from '../auth/auth.interface';
import { PostModel } from './post.model';
import { sqlFragment } from './post.provider';


/** * 获取内容列表  */
export interface GetPostsOptionsFilter {
  name:string;
  sql?:string;
  //占位符的值
  param?: string;
}
export interface GetPostsOptionsPagination{
  limit:number;
  offset:number;
}

interface GetPostOptions  {
  sort?:string;
  filter?:GetPostsOptionsFilter;
  pagination?:GetPostsOptionsPagination;
  currentUser?:TokenPayload;
}

export const getPosts = async (options: GetPostOptions) => {
  const {sort, filter,pagination:{limit,offset},currentUser,} =options;
  //SQL参数,params是给查询里的占位符准备的,可以把limit和offset放入
  let params:Array<any>=[limit,offset];
  //设置sql参数
  if (filter.param){
    params = [filter.param, ...params];
  }
  const {id:userId} = currentUser;

  const statement = `SELECT 
                            post.id,
                            post.title,
                            post.content, 
                           ${sqlFragment.user},
                           ${sqlFragment.totalComments},
                           ${sqlFragment.file},
                           ${sqlFragment.tags},
                           ${sqlFragment.totalLikes},
                           (SELECT COUNT(user_like_post.postId)
                            FROM user_like_post
                            WHERE user_like_post.postId = post.id
                                && user_like_post.userId = ${userId}
                            ) AS liked
                       FROM post
                      ${sqlFragment.leftJoinUser} 
                      ${sqlFragment.innerJoinOneFile}
                      ${sqlFragment.leftJoinTags}
                      ${filter.name == 'userLiked' ? sqlFragment.innerJoinUserLikePost:''}
                      
                      WHERE ${filter.sql}
                      GROUP BY post.id
                      ORDER BY ${sort}
                      LIMIT ?
                      OFFSET ?
     `;
     console.log('getpost');
     console.log(statement);
  const [data] = await connection.promise().query(statement,params);
  
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


//** 删除内容 */

export const deletePost = async (postId:number) =>{
  const statement =`
    DELETE FROM post
    WHERE id=?
  `;

  const [data]= await connection.promise().query(statement,postId);
  return data;
}


/** 保存内容标签 的服务*/
export const createPostTag= async (
  postId:number,tagId:number
 ) =>{
     const statement = `
         INSERT INTO post_tag(postId,tagId)
         VAlues(?,?)
     `;
     const [data] = await connection.promise().query(statement,[postId,tagId]);
     return data;
   };
 
 /** 检查  内容标签   的服务*/
 export const postHasTag= async (
 postId:number,tagId:number
 ) =>{
     const statement = `
         SELECT * FROM post_tag
         WHERE postId=? AND tagId=?
     `;
         const [data] = await connection.promise().query(statement,[postId,tagId]);
 
         return data[0] ? true : false;
 };
 

 /**
  * 移除  内容标签
  */

export const deletePostTag = async (postId:number,tagId:number) => {
        const statement = `
            DELETE FROM post_tag
            WHERE postId=? AND tagId=?
        `;
        const [data] = await connection.promise().query(statement,[postId,tagId]);
        return data;

};
/**
* 23 定义  统计内容数量  的功能
*/
export const getPostsTotalCount = async (options:
  GetPostOptions) => { 
  const { filter } = options;
  // SQL 参数
  let params = [filter.param];
  // 准备查询
  const statement = `
  SELECT
  COUNT(DISTINCT post.id) AS total
  FROM post
  ${sqlFragment.leftJoinUser}
  ${sqlFragment.innerJoinOneFile}
  ${sqlFragment.leftJoinTags}
  ${filter.name == 'userLiked' ? sqlFragment.innerJoinUserLikePost : ''}
  WHERE ${filter.sql}
  `;
  console.log('getpostTotalCount');
  console.log(statement);
  // 执行查询
  const [data] = await connection.promise().query(statement,
  params);
  // 提供结果
  return data[0].total;
  };



  export interface GetPostByIdOptions {
    currentUser?: TokenPayload;
    }
  /** 
   * 按ID 查询内容
  */
  export const getPostById= async (postId:number,options: GetPostByIdOptions = {},) =>{
      
    const {currentUser: { id: userId },} = options;
    
    const statement =`
          SELECT 
              post.id,
              post.title,
              post.content,
              ${sqlFragment.user},
              ${sqlFragment.totalComments},
              ${sqlFragment.file},
              ${sqlFragment.tags},
              ${sqlFragment.totalLikes},
              (
                SELECT COUNT(user_like_post.postId)
                FROM user_like_post
                WHERE
                user_like_post.postId = post.id
                && user_like_post.userId = ${userId}
                ) AS liked

          FROM post
            ${sqlFragment.leftJoinUser}
            ${sqlFragment.leftJoinOneFile}
            ${sqlFragment.leftJoinTags}
          WHERE post.id = ?
      `
      const [data] = await connection.promise().query(statement,postId);

        if(!data[0].id) {
          throw new Error('NOT_FOUND');
        }

      return data[0];
   
  };