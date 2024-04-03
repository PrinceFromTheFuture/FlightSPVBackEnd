"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const test_js_1 = require("./test.js");
const app = express();
app.listen(3002, () => {
    console.log("listening");
});
app.get("/", (req, res) => {
    res.send(test_js_1.ts1.objet);
});
//# sourceMappingURL=server.js.map