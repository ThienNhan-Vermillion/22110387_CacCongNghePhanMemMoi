import mysql from 'mysql2/promise';
declare const pool: mysql.Pool;
declare const connectDB: () => Promise<void>;
export { pool };
export default connectDB;
//# sourceMappingURL=database.d.ts.map