
const db = require('../config/db');

const Resource = {
    findAllAvailable: async () => {
        const [rows] = await db.query('SELECT bt.name AS type, COUNT(r.id) AS count FROM resources r JOIN bench_types bt ON r.type_id = bt.id WHERE r.booked_by IS NULL GROUP BY bt.name');
        return rows;
    },

    findByType: async (typeId) => {
        const [rows] = await db.query('SELECT * FROM resources WHERE type_id = ? AND booked_by IS NULL', [typeId]);
        return rows;
    },

    book: async (resourceId, userId) => {
        const [result] = await db.query('UPDATE resources SET booked_by = ?, booked_at = NOW() WHERE id = ? AND booked_by IS NULL', [userId, resourceId]);
        return result.affectedRows > 0;
    },

    release: async (resourceId, userId) => {
        const [result] = await db.query('UPDATE resources SET booked_by = NULL, booked_at = NULL WHERE id = ? AND booked_by = ?', [resourceId, userId]);
        return result.affectedRows > 0;
    }
};

module.exports = Resource;
