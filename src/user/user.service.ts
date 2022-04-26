import { connection } from '../app/database/mysql';
import {UserModel} from './user.model';

export const createUser = async (user:UserModel) =>{
  const statement = `
    INSERT INTO user
    SET ?
  `;

  const [data]= await connection.promise().query(statement,user);
  return data;
};


//
interface GetUserOptions{
  password?:boolean;
};

/**
 * 获取 用户
 */
export const getUser= (condition:string) => {

  return async (param:string | number, options: GetUserOptions = {},
    ) => {
      const { password } = options;
      //sql
      const statement =`
      SELECT 
        user.id,
        user.name,
        IF (COUNT(avatar.id),1,NULL) AS avatar
        ${password ? ', password':''} 
      FROM
             user
      LEFT JOIN avatar
        ON avatar.userId = user.id
      WHERE ${condition} = ?
    `;
  
    const [data]= await connection.promise().query(statement,param);
    console.log(data[0]);
    return data[0].id ?  data[0] : null ;
  }; 
}
/**
 * 按用户名获取用户
 */
export const getUserByName = getUser('user.name');
/**
 * 按ID获取用户
 */
export const getUserById   = getUser('user.id');


/** 
 * 更新用户数据
*/
export const updateUser= async (userId:number,userData:UserModel) =>{
 
  const statement = `
    UPDATE user
    SET?
    WHERE user.id = ?
  `;
  
  //sql 参数
  const params = [userData,userId];
  const [data] = await connection.promise().query(statement,params);
    return data;
};

