import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';
import { sqlFragment } from './post.provider';


/** * 获取内容列表  */
export interface GetPostOptionFilter {
  name:string;
  sql?:string;
  //占位符的值
  param?: string;
}
export interface GetPostOptionsPagination{
  limit:number;
  offset:number;
}

interface GetPostOptions  {
  sort?:string;
  filter?:GetPostOptionFilter;
  pagination?:GetPostOptionsPagination;
}
export const getPosts = async (options: GetPostOptions) => {
  const {sort, filter,pagination:{limit,offset},} =options;
  //SQL参数,params是给查询里的占位符准备的,可以把limit和offset放入
  let params:Array<any>=[limit,offset];
  //设置sql参数
  if (filter.param){
    params = [filter.param, ...params];
  }
  const statement = `SELECT 
                            post.id,
                            post.title,
                            post.content, 
                           ${sqlFragment.user},
                           ${sqlFragment.totalComments},
                           ${sqlFragment.file},
                           ${sqlFragment.tags}
                       FROM post
                      ${sqlFragment.leftJoinUser} 
                      ${sqlFragment.leftJoinOneFile}
                      ${sqlFragment.leftJoinTags}
                      WHERE ${filter.sql}
                      GROUP BY post.id
                      ORDER BY ${sort}
                      LIMIT ?
                      OFFSET ?
     `;
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
