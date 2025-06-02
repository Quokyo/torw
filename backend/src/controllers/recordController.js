const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all records
const getRecords = async (req, res) => {
  try {
    const records = await prisma.record.findMany();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single record
const getRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await prisma.record.findUnique({
      where: { id: parseInt(id) }
    });

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create record (admin only)
const createRecord = async (req, res) => {
  try {
    const { title, artist, price, description, imageUrl, stock } = req.body;

    const record = await prisma.record.create({
      data: {
        title,
        artist,
        price: parseFloat(price),
        description,
        imageUrl,
        stock: parseInt(stock)
      }
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update record (admin only)
const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, price, description, imageUrl, stock } = req.body;

    const record = await prisma.record.update({
      where: { id: parseInt(id) },
      data: {
        title,
        artist,
        price: parseFloat(price),
        description,
        imageUrl,
        stock: parseInt(stock)
      }
    });

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete record (admin only)
const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.record.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord
}; 