import express from "express";
import multer from "multer";
import cors from "cors"
import {listarTodosPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controller/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({
    dest: "./uploads", storage
});
// Linux ou no mac
// const upload = multer({
//     dest: "./uploads"
// });

const routes = (app) => {
    app.use(express.json()); // Json uma forma de ficar transitando Texto (Express vai devolver Json para pessoas)
    app.use(cors(corsOptions))

    app.get("/posts", listarTodosPosts); // Varias informações, precisamos de um identificador para um só
    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;