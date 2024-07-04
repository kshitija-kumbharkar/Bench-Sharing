
const BenchType = require('../models/benchTypeModel');

const addBenchType = async (req, res) => {
    const { name, description } = req.body;
    try {
        await BenchType.create(name, description);
        res.status(201).send('Bench type added');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getAllBenchTypes = async (req, res) => {
    try {
        const benchTypes = await BenchType.findAll();
        res.status(200).json(benchTypes);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updateBenchType = async (req, res) => {
    const { id, name, description } = req.body;
    try {
        await BenchType.update(id, name, description);
        res.status(200).send('Bench type updated');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteBenchType = async (req, res) => {
    const { id } = req.params;
    try {
        await BenchType.delete(id);
        res.status(200).send('Bench type deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { addBenchType, getAllBenchTypes, updateBenchType, deleteBenchType };
