import {connection } from '../app/database/mysql';
import { AvatarModel } from './avatar.model';



export const createAvatar = async (avatar:AvatarModel) => {

    const statement = `
        INSERT INTO avatar
        SET ?
    `;
    // 执行查询,   执行后, 把结果的第一个数据结构出来, 起个名字data
    const [data] = await connection.promise().query(statement,avatar);
    //返回data
    return data;
  };