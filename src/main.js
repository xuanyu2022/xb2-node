const { response } = require('express');
const express = require('express');
const app = express();
port = 3000;

/** *使用JSON中间件 express.json**/
app.use(express.json());

//创建web服务器
app.listen(port, () => {
  console.log(' 服务器已启动');
});

//创建get接口, 响应发送你好啊 
app.get('/', (req, res) => {
  res.send('你好啊');
});

//json数据, 
const data = [
  {
    id: 1,
    title: '关山月',
    content: '明月出天山, 苍茫云海间',
  },
  {
    id: 2,
    title: '望岳关山月',
    content: '会当凌绝顶,一览众山小',
  },
  {
    id: 3,
    title: '忆江南',
    content: '日出江花红似火, 春来江水绿如蓝',
  },
];

//创建get接口, 响应发送data数据
app.get('/posts', (request, response) => {
  response.send(data);
});



//创建get接口, 获得请求的id;筛选id;响应发送该id的内容 
app.get('/posts/:postId', (request, response) => {
  const { postId } = request.params;
  const posts = data.filter(item => item.id == postId);
  response.send(posts[0]);
});



/** * 创建内容资源用的接口post*/
//定义内容接口;
app.post('/posts', (request, response) => {
  //提取request的主体数据
  const { content } = request.body;
  ///////////设置响应状态码 
  response.status(201);
  // 输入'请求的header数据
  console.log(request.headers['sing-along']);
  //设置响应的头部数据
  response.set('Sing-Along', 'How I wonder what you are');
  //做出响应
  response.send({
    message: `成功创建了内容:${content}`
  });
});
