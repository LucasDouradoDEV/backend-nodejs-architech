import { AuthService } from '../../src/services/auth.service';
import { UserRepository } from '../../src/repositories/user.repository';
import { hashPassword, comparePasswords } from '../../src/utils/hash';
import { generateToken, verifyToken } from '../../src/utils/jwt';
import { User } from '@prisma/client';

// Mock do UserRepository
const mockUserRepository = {
  getUserByEmail: jest.fn(),
  createUser: jest.fn(),
  getUserById: jest.fn(),
};

// Mock das funções de hash e JWT
jest.mock('../../src/utils/hash', () => ({
  hashPassword: jest.fn(),
  comparePasswords: jest.fn(),
}));

jest.mock('../../src/utils/jwt', () => ({
  generateToken: jest.fn(),
  verifyToken: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService(mockUserRepository as unknown as UserRepository);
    jest.clearAllMocks();
  });

  it('Deve fazer login com sucesso', async () => {
    const user = { id: 1, email: 'test@example.com', password: 'hashedPassword' } as User;
    (mockUserRepository.getUserByEmail as jest.Mock).mockResolvedValue(user);
    (comparePasswords as jest.Mock).mockResolvedValue(true);
    (generateToken as jest.Mock).mockReturnValue('mockedToken');

    const result = await authService.login('test@example.com', 'password123');

    expect(result).toBe('mockedToken');
    expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith('test@example.com');
    expect(comparePasswords).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(generateToken).toHaveBeenCalledWith(user);
  });

  it('Deve falhar ao fazer login com credenciais inválidas', async () => {
    (mockUserRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);

    await expect(authService.login('test@example.com', 'password123')).rejects.toThrow('Credenciais inválidas');
  });

  it('Deve registrar um novo usuário com sucesso', async () => {
    const userData = { email: 'new@example.com', password: 'password123' };
    (mockUserRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);
    (hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
    (mockUserRepository.createUser as jest.Mock).mockResolvedValue({ id: 2, ...userData, password: 'hashedPassword' } as User);

    const result = await authService.register('new@example.com', 'password123');

    expect(result).toEqual({ id: 2, ...userData, password: 'hashedPassword' });
    expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith('new@example.com');
    expect(hashPassword).toHaveBeenCalledWith('password123');
    expect(mockUserRepository.createUser).toHaveBeenCalledWith({ email: 'new@example.com', password: 'hashedPassword' });
  });

  it('Deve falhar ao registrar um usuário com email já existente', async () => {
    (mockUserRepository.getUserByEmail as jest.Mock).mockResolvedValue({} as User);

    await expect(authService.register('existing@example.com', 'password123')).rejects.toThrow('Email já cadastrado');
  });

  it('Deve renovar um token com sucesso', async () => {
    const user = { id: 1, email: 'test@example.com' } as User;
    (verifyToken as jest.Mock).mockReturnValue({ id: 1 });
    (mockUserRepository.getUserById as jest.Mock).mockResolvedValue(user);
    (generateToken as jest.Mock).mockReturnValue('newMockedToken');

    const result = await authService.refreshToken('validToken');

    expect(result).toBe('newMockedToken');
    expect(verifyToken).toHaveBeenCalledWith('validToken');
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(1);
    expect(generateToken).toHaveBeenCalledWith(user);
  });

  it('Deve falhar ao renovar um token inválido', async () => {
    (verifyToken as jest.Mock).mockReturnValue(null);

    await expect(authService.refreshToken('invalidToken')).rejects.toThrow('Token inválido');
  });
});