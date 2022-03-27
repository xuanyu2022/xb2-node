"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(' 服务器已启动');
});
app.get('/', (req, res) => {
    res.send('你好啊');
});
const data = [
    {
        id: 1,
        title: '~关山月~',
        content: '明月出天山, 苍茫云海间~',
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
    const posts = data.filter(item => item.id == parseInt(postId, 10));
    response.send(posts[0]);
});
app.post('/posts', (request, response) => {
    const { content } = request.body;
    response.status(201);
    console.log(request.headers['sing-along']);
    response.set('Sing-Along', 'How I wonder what you are');
    response.send({
        message: `成功创建了内容:${content}`
    });
});
//# sourceMappingURL=main.js.map