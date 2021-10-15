const express = require('express');
const { createBucket, getAllBuckets, deleteBucket } = require('../controllers/bucket');
const router = express.Router();

  
router.get('/', getAllBuckets);
router.post('/', createBucket);  
router.delete('/:id', deleteBucket);

module.exports = router;