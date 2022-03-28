import dotenv from 'dotenv';

dotenv.config();

/**
 * 应用配置
 */

//用解构的方法, 从process.env 导出APP_PORT的值
export const { APP_PORT } = process.env;
