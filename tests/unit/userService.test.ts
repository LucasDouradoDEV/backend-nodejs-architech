import { UserService } from '../../src/services/user.service';
import { UserRepository } from '../../src/repositories/user.repository';
import { User } from '@prisma/client';

// Mock do UserRepository
const mockUserRepository = {
  createUser: jest.fn(),
  getUsers: jest.fn(),
  getUserById: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockUserRepository as unknown as UserRepository);
    jest.clearAllMocks();
  });

  it('Deve criar um novo usuário', async () => {
    const userData = { email: 'test@example.com', password: 'password123', createdAt: new Date(), updatedAt: new Date() };
    const createdUser = { id: 1, ...userData } as User;

    mockUserRepository.createUser.mockResolvedValue(createdUser);

    const result = await userService.createUser(userData);

    expect(result).toEqual(createdUser);
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(userData);
  });

  it('Deve retornar todos os usuários', async () => {
    const users = [{ id: 1, email: 'test1@example.com', createdAt: new Date(), updatedAt: new Date() }, { id: 2, email: 'test2@example.com', createdAt: new Date(), updatedAt: new Date() }] as User[];

    mockUserRepository.getUsers.mockResolvedValue(users);

    const result = await userService.getUsers();

    expect(result).toEqual(users);
    expect(mockUserRepository.getUsers).toHaveBeenCalled();
  });

  it('Deve retornar um usuário pelo ID', async () => {
    const user = { id: 1, email: 'test@example.com', createdAt: new Date(), updatedAt: new Date() } as User;

    mockUserRepository.getUserById.mockResolvedValue(user);

    const result = await userService.getUserById(1);

    expect(result).toEqual(user);
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(1);
  });

  it('Deve atualizar um usuário', async () => {
    const userData = { email: 'updated@example.com', updatedAt: new Date() };
    const updatedUser = { id: 1, ...userData, createdAt: new Date() } as User;

    mockUserRepository.updateUser.mockResolvedValue(updatedUser);

    const result = await userService.updateUser(1, userData);

    expect(result).toEqual(updatedUser);
    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(1, userData);
  });

  it('Deve deletar um usuário', async () => {
    const user = { id: 1, email: 'test@example.com', createdAt: new Date(), updatedAt: new Date() } as User;

    mockUserRepository.deleteUser.mockResolvedValue(user);

    const result = await userService.deleteUser(1);

    expect(result).toEqual(user);
    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(1);
  });
});