export interface User {
  id?: number;
  name: string;
  email: string;
  age?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateUserData {
  name: string;
  email: string;
  age?: number;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  age?: number;
}

export interface UserRow {
  id: number;
  name: string;
  email: string;
  age: number | null;
  created_at: Date;
  updated_at: Date;
}
