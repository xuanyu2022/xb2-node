import dotenv from 'dotenv';

dotenv.config();

/** 应用配置 *///用解构的方法, 从process.env 导出APP_PORT的值

export const { APP_PORT } = process.env;


//数据仓库配置
export const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_PASSWORD,
  MYSQL_USER,
  MYSQL_DATABASE,
} = process.env;

//导入base64格式
export let {PRIVATE_KEY,PUBLIC_KEY} = process.env;
//还原key文件
PRIVATE_KEY = Buffer.from(PRIVATE_KEY,'base64').toString();
PUBLIC_KEY = Buffer.from(PUBLIC_KEY,'base64').toString();  


/**
 * 内容分页
 */
export const { POSTS_PER_PAGE} = process.env;