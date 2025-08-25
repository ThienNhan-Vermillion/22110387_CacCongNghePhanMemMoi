import { pool } from '../config/database';
import { User, CreateUserData, UpdateUserData, UserRow } from '../types/user';

class CRUDService {
  async createUser(data: CreateUserData): Promise<User> {
    const { name, email, age } = data;
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age || null]
    );
    
    const insertResult = result as any;
    const userId = insertResult.insertId;
    
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('Failed to create user');
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const [rows] = await pool.execute('SELECT * FROM users ORDER BY id DESC');
    return (rows as UserRow[]).map(this.mapRowToUser);
  }

  async getUserById(id: number): Promise<User | null> {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    const userRows = rows as UserRow[];
    
    if (userRows.length === 0) {
      return null;
    }
    
    const userRow = userRows[0];
    if (!userRow) {
      return null;
    }
    
    return this.mapRowToUser(userRow);
  }

  async updateUser(id: number, data: UpdateUserData): Promise<User | null> {
    const { name, email, age } = data;
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (email !== undefined) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (age !== undefined) {
      updateFields.push('age = ?');
      updateValues.push(age);
    }

    if (updateFields.length === 0) {
      return this.getUserById(id);
    }

    updateValues.push(id);
    const [result] = await pool.execute(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    const updateResult = result as any;
    if (updateResult.affectedRows === 0) {
      return null;
    }

    return this.getUserById(id);
  }

  async deleteUser(id: number): Promise<boolean> {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    const deleteResult = result as any;
    return deleteResult.affectedRows > 0;
  }

  private mapRowToUser(row: UserRow): User {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      age: row.age ?? undefined,
      created_at: row.created_at,
      updated_at: row.updated_at
    } as User;
  }
}

export default new CRUDService();
