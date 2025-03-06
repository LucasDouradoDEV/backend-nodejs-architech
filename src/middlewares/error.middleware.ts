import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack); // Log do erro para depuração

  const statusCode = err.statusCode || 500; // Usa o código de status do erro, ou 500 como padrão
  const message = err.message || 'Erro interno do servidor'; // Usa a mensagem do erro, ou uma mensagem padrão

  res.status(statusCode).json({
    message: message,
    // Se estiver em desenvolvimento, envie o stack trace para ajudar na depuração
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
}