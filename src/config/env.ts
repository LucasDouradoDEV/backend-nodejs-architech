import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/mydb',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
};

function validateEnv() {
  for (const key in env) {
    if (!env[key]) {
      throw new Error(`Variável de ambiente ${key} não definida.`);
    }
  }
}

validateEnv();