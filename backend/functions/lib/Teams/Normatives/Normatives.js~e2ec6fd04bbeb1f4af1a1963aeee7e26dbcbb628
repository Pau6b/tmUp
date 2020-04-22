"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const admin = require("firebase-admin");
const app = express();
app.post("/upload", (req, res) => {
    (async () => {
        try {
            await admin.storage().bucket("gs://tmup-908e4.appspot.com").upload("/home/ivgasa99/Escritorio/Explicaciones.odt");
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })().then().catch();
});
module.exports = app;
//# sourceMappingURL=Normatives.js.map