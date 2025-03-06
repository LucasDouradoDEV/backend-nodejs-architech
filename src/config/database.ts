import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

// Conecta ao banco de dados
const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("🔥 Conectado ao banco de dados com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados:", error);
        process.exit(1); // Finaliza a aplicação em caso de erro
    }
};

export { prisma, connectDB };