import request from 'supertest';
import app from '../../src/app';
import { prisma } from '../../src/config/database'; // Importe a instância do Prisma Client

describe('Testes de integração de autenticação', () => {
  beforeAll(async () => {
    // Limpe o banco de dados antes de cada teste
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve registrar um novo usuário', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('test@example.com');
  });

  it('Deve fazer login com um usuário existente', async () => {
    // Crie um usuário para login
    await prisma.user.create({
      data: {
        email: 'login@example.com',
        password: 'password123',
      },
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Deve retornar um erro ao fazer login com credenciais inválidas', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'invalid@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve renovar um token válido', async () => {
    // Crie um usuário e faça login para obter um token
    await prisma.user.create({
      data: {
        email: 'refresh@example.com',
        password: 'password123',
      },
    });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'refresh@example.com',
        password: 'password123',
      });

    const token = loginResponse.body.token;

    const response = await request(app)
      .post('/api/auth/refresh-token')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.token).not.toBe(token); // O novo token deve ser diferente do antigo
  });

  it('Deve retornar um erro ao renovar um token inválido', async () => {
    const response = await request(app)
      .post('/api/auth/refresh-token')
      .set('Authorization', 'Bearer invalidtoken');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });
});