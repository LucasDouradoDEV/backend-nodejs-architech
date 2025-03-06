import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { jwtConfig } from '../config/jwt';
import { User } from '@prisma/client';

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Credenciais inválidas');
    }

    return this.generateToken(user);
  }

  async register(email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.createUser({
      email,
      password: hashedPassword,
    });
  }

  async refreshToken(token: string): Promise<string> {
    const decoded = this.verifyToken(token);

    if (!decoded) {
      throw new Error('Token inválido');
    }

    const user = await this.userRepository.getUserById(decoded.id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, jwtConfig.secret);
    } catch (error) {
      return null;
    }
  }
}