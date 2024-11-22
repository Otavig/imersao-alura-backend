import express from "express";
import routes from "./src/routes/postRoutes.js";
// ou
// const express = require('express');

const app = express();
app.use(express.static("uploads")) // Tornar as imagens públicas
routes(app)
const PORTA = 3000;


app.listen(PORTA, () => {
    console.log(`Servidor escutando em http://localhost:${PORTA}`);
});