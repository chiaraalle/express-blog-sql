const express = require('express')
const router = express.Router();
const posts = require('../data/posts');
const postsController = require('../controllers/postsController');
const connection = require('../data/db');


//associo ogni rotta alla sua funzione
// index
router.get('/', postsController.index);
// show
router.get('/:id', postsController.show);
// store
router.post('/', postsController.store);
// update
router.put('/:id', postsController.update);
// modify
router.patch('/:id', postsController.modify);
// destroy
router.delete('/:id', postsController.destroy)
      
module.exports = router;