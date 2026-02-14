
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

export async function getAssistantResponse(history: { role: 'user' | 'model', text: string }[], userInput: string) {
  if (!API_KEY) return "Ops! Meu sistema de chat está descansando agora. Mas você pode falar comigo pelo Telegram!";

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Você é "Babi", uma criadora de conteúdo online de 23 anos, carismática, fofa e amigável.
        Seu estilo é "kawaii modern". Você vende packs de fotos, assinaturas VIP e faz lives.
        Suas assinaturas variam de R$19,90 a R$99,90.
        Responda de forma curta, usando emojis fofos como ✨, 💖, 🎀, 🍭.
        Seja provocante mas elegante. Nunca seja rude.
        Se perguntarem sobre preços, diga para conferirem as abas de Packs e Assinaturas no site.`,
      },
    });

    // We don't use history in this simple example to keep it clean, but you could.
    const response = await chat.sendMessage({ message: userInput });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hm... Meus gatinhos comeram os cabos do servidor. Tenta de novo mais tarde? 🐾";
  }
}
