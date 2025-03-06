export interface User {
    id: number;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface UserCreate {
    email: string;
    password?: string;
  }
  
  export interface UserUpdate {
    email?: string;
    password?: string;
  }