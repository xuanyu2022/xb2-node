"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = async (request, response, next) => {
    console.log(request.file);
    response.sendStatus(200);
};
//# sourceMappingURL=file.controller.js.map