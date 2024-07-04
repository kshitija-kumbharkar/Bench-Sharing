
const Resource = require('../models/resourceModel');
const Booking = require('../models/bookingModel');

const getAvailableResources = async (req, res) => {
    try {
        const resources = await Resource.findAllAvailable();
        res.status(200).json(resources);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getResourcesByType = async (req, res) => {
    const { typeId } = req.params;
    try {
        const resources = await Resource.findByType(typeId);
        res.status(200).json(resources);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const bookResource = async (req, res) => {
    const { resourceId } = req.params;
    const userId = req.user.id;
    try {
        const success = await Resource.book(resourceId, userId);
        if (success) {
            await Booking.create(resourceId, userId);
            res.status(200).send('Resource booked');
        } else {
            res.status(400).send('Resource not available or already booked');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const releaseResource = async (req, res) => {
    const { resourceId } = req.params;
    const userId = req.user.id;
    try {
        const success = await Resource.release(resourceId, userId);
        if (success) {
            await Booking.release(resourceId, userId);
            res.status(200).send('Resource released');
        } else {
            res.status(400).send('Resource not booked by you or already released');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getUserBookings = async (req, res) => {
    const userId = req.user.id;
    try {
        const bookings = await Booking.findByUser(userId);
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { getAvailableResources, getResourcesByType, bookResource, releaseResource, getUserBookings };
