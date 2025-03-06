import { UserRepository } from '../repositories/user.repository';
import { User } from '@prisma/client';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    // Adicione lógica de negócio para criação de usuário aqui, se necessário
    return this.userRepository.createUser(userData);
  }

  async getUsers(): Promise<User[]> {
    // Adicione lógica de negócio para busca de usuários aqui, se necessário
    return this.userRepository.getUsers();
  }

  async getUserById(id: number): Promise<User | null> {
    // Adicione lógica de negócio para busca de usuário por ID aqui, se necessário
    return this.userRepository.getUserById(id);
  }

  async updateUser(
    id: number,
    userData: Partial<Omit<User, 'id'>>
  ): Promise<User> {
    // Adicione lógica de negócio para atualização de usuário aqui, se necessário
    return this.userRepository.updateUser(id, userData);
  }

  async deleteUser(id: number): Promise<User> {
    // Adicione lógica de negócio para exclusão de usuário aqui, se necessário
    return this.userRepository.deleteUser(id);
  }
}