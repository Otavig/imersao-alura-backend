import { MongoClient } from "mongodb";

export default async function conectarAoBanco(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao)
        console.log('Conectando ao cluster do banco de dados...');
        await mongoClient.connect();
        console.log('Conectando a MongoDb Atlas com Sucesso!');
        return mongoClient;
    } catch (error) {
        console.error('Falha na conexão com o banco!', error)
        process.exit();
    }
}