import fs from "fs"
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

async function listarTodosPosts(req, res) {
    const resultados = await getTodosPosts();
    // res.status(200).json(posts); // Converte para Json
    res.status(200).json(resultados); // Converte para Json
}

async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ "Error": "Falha na requisição" });
    }
}

async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ "Error": "Falha na requisição" });
    }
}


async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ "Error": "Falha na requisição" });
    }
}


export { listarTodosPosts, postarNovoPost, uploadImagem, atualizarNovoPost }