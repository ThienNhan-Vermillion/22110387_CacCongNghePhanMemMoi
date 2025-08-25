"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
class CRUDService {
    async createUser(data) {
        const { name, email, age } = data;
        const [result] = await database_1.pool.execute('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', [name, email, age || null]);
        const insertResult = result;
        const userId = insertResult.insertId;
        const user = await this.getUserById(userId);
        if (!user) {
            throw new Error('Failed to create user');
        }
        return user;
    }
    async getAllUsers() {
        const [rows] = await database_1.pool.execute('SELECT * FROM users ORDER BY id DESC');
        return rows.map(this.mapRowToUser);
    }
    async getUserById(id) {
        const [rows] = await database_1.pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        const userRows = rows;
        if (userRows.length === 0) {
            return null;
        }
        const userRow = userRows[0];
        if (!userRow) {
            return null;
        }
        return this.mapRowToUser(userRow);
    }
    async updateUser(id, data) {
        const { name, email, age } = data;
        const updateFields = [];
        const updateValues = [];
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
        const [result] = await database_1.pool.execute(`UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`, updateValues);
        const updateResult = result;
        if (updateResult.affectedRows === 0) {
            return null;
        }
        return this.getUserById(id);
    }
    async deleteUser(id) {
        const [result] = await database_1.pool.execute('DELETE FROM users WHERE id = ?', [id]);
        const deleteResult = result;
        return deleteResult.affectedRows > 0;
    }
    mapRowToUser(row) {
        return {
            id: row.id,
            name: row.name,
            email: row.email,
            age: row.age ?? undefined,
            created_at: row.created_at,
            updated_at: row.updated_at
        };
    }
}
exports.default = new CRUDService();
//# sourceMappingURL=CRUDService.js.map