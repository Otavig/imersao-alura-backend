import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"; //Precis do .js
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

async function getTodosPosts() {
    // Conecta ao banco de dados 'imersao-instabytes'
    const db = conexao.db('imersao-instabytes'); 

    // Seleciona a coleção 'posts' dentro do banco de dados
    const colecao = db.collection("posts"); 

    // Busca todos os documentos da coleção 'posts' e retorna um array com os resultados
    return colecao.find().toArray();
}

async function criarPost(novoPost) {
    const db = conexao.db('imersao-instabytes'); 
    const colecao = db.collection("posts"); 
    return colecao.insertOne(novoPost);
}

async function atualizarPost(id, novoPost) {
    const db = conexao.db('imersao-instabytes');
    const colecao = db.collection("posts");

    try {
        console.log(`normal: ${id}`)
        const objID = ObjectId.createFromHexString(id);
        return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
    } catch (error) {
        console.error(`Error creating ObjectId: ${error.message}`);
        throw new Error("Invalid post ID format");
    }
}

export {getTodosPosts, criarPost, atualizarPost}