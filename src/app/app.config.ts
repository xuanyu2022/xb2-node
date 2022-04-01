import dotenv from 'dotenv';

dotenv.config();

/**
 * 应用配置
 */

//用解构的方法, 从process.env 导出APP_PORT的值
export const { APP_PORT } = process.env;

//数据仓库配置
export const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_PASSWORD,
  MYSQL_USER,
  MYSQL_DATABASE,
} = process.env;
