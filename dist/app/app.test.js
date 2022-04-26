"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const demo_1 = require("./playground/demo");
describe('演示单元测试', () => {
    test('测试 greet 函数', () => {
        const greeting = demo_1.greet('王皓');
        expect(greeting).toBe(' 你好, 王皓');
    });
});
//# sourceMappingURL=app.test.js.map