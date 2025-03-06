import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index';
import { errorMiddleware } from './middlewares/error.middleware';

const app: Express = express();


app.use(cors()); // Habilita CORS
app.use(helmet()); // Adiciona cabeçalhos de segurança
app.use(morgan('dev')); // Log de requisições
app.use(express.json()); // Analisa corpos de requisição JSON

// Rotas
app.use('/api', routes);

// Middleware de tratamento de erros global
app.use(errorMiddleware);

// Rota de exemplo (opcional)
app.get('/', (req: Request, res: Response) => {
  res.send('API está funcionando!');
});

export default app;