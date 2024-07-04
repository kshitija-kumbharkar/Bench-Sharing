
const db = require('../config/db');

const BenchType = {
    findAll: async () => {
        const [rows] = await db.query('SELECT * FROM bench_types');
        return rows;
    },

    create: async (name, description) => {
        const [result] = await db.query('INSERT INTO bench_types (name, description) VALUES (?, ?)', [name, description]);
        return result.insertId;
    },

    update: async (id, name, description) => {
        await db.query('UPDATE bench_types SET name = ?, description = ? WHERE id = ?', [name, description, id]);
    },

    delete: async (id) => {
        await db.query('DELETE FROM bench_types WHERE id = ?', [id]);
    }
};

module.exports = BenchType;
