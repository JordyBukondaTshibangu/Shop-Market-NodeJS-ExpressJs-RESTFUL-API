const express = require('express')
const multer = require('multer')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const ProductController = require('../controllers/product')

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './uploads/')
    },
    filename : function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const fileFilter = (req, file, cb) =>
{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true) //store the file
    }
    else{
        cb(null, false) // do not store the file
    }      
}
const upload = multer({
    storage : storage,
limits : {
    fileSize : 1024 * 1024 * 5
},
fileFilter
})

router.get('/', ProductController.products_get_all)
router.post('/',checkAuth,upload.single('productImage') ,ProductController.products_create)
router.get('/:productId', ProductController.products_get_single )
router.put('/:productId', checkAuth,ProductController.product_update)
router.delete('/:productId',checkAuth, ProductController.product_delete )

module.exports = router