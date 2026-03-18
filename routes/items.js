const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET items by status (lost or found)
router.get('/status/:status', async (req, res) => {
    try {
        const items = await Item.find({ status: req.params.status }).sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create new item
router.post('/', async (req, res) => {
    try {
        const { name, category, description, location, date, email, status } = req.body;

        // Validation
        if (!name || !category || !description || !location || !date || !email || !status) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newItem = new Item({
            name,
            category,
            description,
            location,
            date: new Date(date),
            email,
            status
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update item by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, category, description, location, date, email, status } = req.body;

        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        if (name) item.name = name;
        if (category) item.category = category;
        if (description) item.description = description;
        if (location) item.location = location;
        if (date) item.date = new Date(date);
        if (email) item.email = email;
        if (status) item.status = status;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE item by ID
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SEARCH items
router.get('/search/:term', async (req, res) => {
    try {
        const searchTerm = req.params.term;
        const items = await Item.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
