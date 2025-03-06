import { User } from '@prisma/client';
import { prisma } from '../config/database';

export class UserRepository {
  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    return prisma.user.create({
      data: userData,
    });
  }

  async getUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUser(
    id: number,
    userData: Partial<Omit<User, 'id'>>
  ): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}