const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { postValidation } = require('../utils/validators');
const { createPost, getPosts, deletePost } = require('../controllers/postsController');

router.use(auth); 

router.get('/', getPosts);
router.post('/', postValidation, createPost);
router.delete('/:id', deletePost);

module.exports = router;
