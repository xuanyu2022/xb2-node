// const greeting = '你好啊_greeting_';
// console.log(greeting);

const http = require('http');

const server = http.createServer((request, response) => {
  response.write('hello~');
  response.end();
}
);

server.listen(3000, () => {
  console.log('火箭服务已启动');
})
