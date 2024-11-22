import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.KEY_API_GEMINI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export default async function gerarDescricaoComGemini(imageBuffer) {
    const prompt = "Gere uma descrição em português do brasil para a seguinte imagem";

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png",
            },
        };
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Alt-Text não disponível.";
    } catch (error) {
        console.error("Erro ao obter alt-text:", erro.message, erro);
        throw new Error("Erro ao obter o alt-text do Gemini.");
    }
}
