const express = require('express');
const { auth, adminAuth } = require('../middleware/authMiddleware');
const {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord
} = require('../controllers/recordController');

const router = express.Router();

// Public routes
router.get('/', getRecords);
router.get('/:id', getRecord);
router.post('/', createRecord);

// Admin only routes
router.put('/:id', adminAuth, updateRecord);
router.delete('/:id', adminAuth, deleteRecord);

module.exports = router; 