import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'crud_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connectDB = async (): Promise<void> => {
  try {
    // Test the connection
    await pool.getConnection();
    console.log('✅ MySQL connected');
    
    // Create users table if it doesn't exist
    await createUsersTable();
  } catch (err) {
    console.error('❌ MySQL connection error:', err);
    throw err;
  }
};

const createUsersTable = async (): Promise<void> => {
  // Drop table if exists to ensure correct structure
  const dropTableSQL = `DROP TABLE IF EXISTS users`;
  const createTableSQL = `
    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      age INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  
  try {
    await pool.execute(dropTableSQL);
    await pool.execute(createTableSQL);
    console.log('✅ Users table created successfully');
  } catch (err) {
    console.error('❌ Error creating users table:', err);
    throw err;
  }
};

export { pool };
export default connectDB;
