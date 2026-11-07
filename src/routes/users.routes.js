const { Router } = require('express');
const {
  createUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');
const { validateId, validateUser } = require('../middlewares/validate');

const router = Router();

router.post('/', validateUser, createUser);
router.get('/', listUsers);
router.get('/:id', validateId, getUserById);
router.put('/:id', validateId, validateUser, updateUser);
router.delete('/:id', validateId, deleteUser);

module.exports = router;
