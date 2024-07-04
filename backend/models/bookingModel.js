
const db = require('../config/db');

const Booking = {
    create: async (resourceId, userId) => {
        await db.query('INSERT INTO bookings (resource_id, booked_by, booked_at) VALUES (?, ?, NOW())', [resourceId, userId]);
    },

    release: async (resourceId, userId) => {
        await db.query('UPDATE bookings SET released_at = NOW() WHERE resource_id = ? AND booked_by = ? AND released_at IS NULL', [resourceId, userId]);
    },

    findByUser: async (userId) => {
        const [rows] = await db.query('SELECT r.name, b.booked_at, b.released_at FROM bookings b JOIN resources r ON b.resource_id = r.id WHERE b.booked_by = ?', [userId]);
        return rows;
    }
};

module.exports = Booking;
