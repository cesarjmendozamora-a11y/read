const { Router } = require('express');
const {
  createUser,
  listUsers,
  getUserById,
} = require('../controllers/users.controller');

const router = Router();

router.post('/', createUser);
router.get('/', listUsers);
router.get('/:id', getUserById);

module.exports = router;
