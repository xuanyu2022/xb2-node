const express = require('express');
const app = express();
port = 3000;

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
    id: 4,
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