const productController = require('../../controllers/product/Product')

// router
const router = require('express').Router()

// use routers
router.post('/addProduct' , productController.addProduct)

router.get('/allProducts', productController.getAllProducts)

router.get('/published', productController.getPublishedProduct)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)

// Products router
router.get('/:id', productController.getOneProduct)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)

module.exports = router 