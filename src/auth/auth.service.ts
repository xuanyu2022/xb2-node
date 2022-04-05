import jwt from 'jsonwebtoken';
import {PRIVATE_KEY} from '../app/app.config';
import {connection} from '../app/database/mysql';
interface SignTokenOptions {
  payload?:any;
}

export const signToken = (options:SignTokenOptions) => {
  const {payload} = options;

  const token = jwt.sign(payload,PRIVATE_KEY,{algorithm:'RS256'});
  return token;
};

/** * 检查拥有权  * */
interface PossessOptions{
  resourceId:number;
  resourceType:string;
  userId:number;
}
//检查
export const possess = async (options:PossessOptions) => {
  const {resourceId,resourceType,userId} = options;
  const statement = `
    SELECT COUNT(${resourceType}.id) as count
    FROM ${resourceType}
    WHERE ${resourceType}.id = ? AND userId=?
  `;
  //检查拥有权
  const [data] = await connection.promise().query(statement,[resourceId,userId]);
  //console.log(data);
  //提供检查结果
  return data[0].count ? true : false;

};
