const express = require('express');
const router = express.Router();
const productRoutes = require('../controllers/productController')
const { authJwt } = require('../middlewares')

router.get('/', productRoutes.getProduct);
router.get('/productUser', productRoutes.productUser);
router.post('/', productRoutes.createProduct);
router.delete('/:id', productRoutes.removeProduct);

module.exports = router;