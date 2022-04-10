import { connection } from '../app/database/mysql';//处理器方法接受的参数的类型
import {TagModel} from './tag.model';


/** 定义存储标签数据的功能*/
export const createTag = async ( 
  tag:TagModel    
) =>{
    const statement = `
        INSERT INTO tag
        SET ?
    `;

    const [data] = await connection.promise().query(statement,tag);
    return data as any;

};

/**
 * 按名字查找标签
 */

export const getTagByName = async (tagName:string) => {

        const statement = `
            SELECT id,name FROM tag
            WHERE name=?
        `;
        const [data] = await connection.promise().query(statement,tagName);
        return data[0];
}