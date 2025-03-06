import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(userData: Omit<User, 'id'>): Promise<User> {
  return prisma.user.create({
    data: userData,
  });
}

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function getUserById(id: number): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function updateUser(
  id: number,
  userData: Partial<Omit<User, 'id'>>
): Promise<User> {
  return prisma.user.update({
    where: { id },
    data: userData,
  });
}

export async function deleteUser(id: number): Promise<User> {
    return prisma.user.delete({
        where: { id },
    });
}