import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Número de rounds de salt (quanto maior, mais seguro, mas mais lento)
  return bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}