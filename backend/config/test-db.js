const pool = require('./config/db');

async function testConnection() {
    try {
        const [rows, fields] = await pool.query("SELECT 1");
        console.log("Connection to database successful:", rows);
    } catch (error) {
        console.error("Error executing query:", error.message);
    } finally {
        pool.end(); 
    }
}

testConnection();
