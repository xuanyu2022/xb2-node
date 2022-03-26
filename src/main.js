const { response } = require('express');
const express = require('express');
const app = express();
port = 3000;

/**
 *使用JSON中间件
 **/

app.use(express.json());



app.listen(port, () => {
  console.log(' 服务器已启动');
});

app.get('/', (req, res) => {
  res.send('你好啊');

});

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


app.get('/posts', (request, response) => {
  response.send(data);
});

app.get('/posts/:postId', (request, response) => {
  const { postId } = request.params;
  const posts = data.filter(item => item.id == postId);
  response.send(posts[0]);
});
//设置响应的头部数据
response.set('Sing-Along', 'How I wonder what you are');
/**
 * 创建内容
 */

app.post('/posts', (request, response) => {
  const { content } = request.body;
  /**
   * 设置响应状态码
   */
  response.status(201);

  // 输入'请求的header数据
  console.log(request.headers['sing-along']);




  //做出响应
  response.send({
    message: `成功创建了内容:${content}`
  });
});
