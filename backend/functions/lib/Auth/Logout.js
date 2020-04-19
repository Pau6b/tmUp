"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.post('/', (req, res) => {
    (async () => {
        try {
            if (req.session.user === null) {
                return res.status(400).send("LO1");
            }
            req.session.user = null;
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
module.exports = app;
//# sourceMappingURL=Logout.js.map