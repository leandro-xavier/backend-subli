const { Router } = require('express');
const router = Router();
const userRoutes = require('../controllers/user.controller');
const { authJwt } = require("../middlewares");

router.get('/', userRoutes.getUsers);
router.post('/', userRoutes.createUser);
router.get('/:id', userRoutes.getUser)

module.exports = router;