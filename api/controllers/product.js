const Product = require('../models/product')
const mongoose = require('mongoose')

exports.products_get_all = (req, res) => {
Product.find()
.select("name price _id productImage")
.exec()
.then(products => {
    const response = {
        count : products.length,
        products : products.map((product) => {
            return {
                name : product.name,
                price : product.price,
                _id : product._id,
                request : {
                    type : 'GET',
                    url : `http://localhost:3000/products/${product._id}`
                }
            }
        })
    }
    if(products){
        res.status(200).json(response)
    }else{
        res.status(404).json({
            message : 'No Prodcuts found'})
    }    
})
.catch(err => {
    console.log(err)
    res.status(500).json({
        message : 'Failed to GET products',
        err
    })
})
}
exports.products_create = (req, res, next) => {
console.log(req.file)

const product = new Product({
    _id : new mongoose.Types.ObjectId(),
    name : req.body.name,
    price : req.body.price,
    productImage : req.file.path,
})
product.save()
.then((product) => {
    res.status(201).json({
        message : "Created product successfully",
        creattedProduct :{
            name : product.name,
            price : product.price,
            productImage : req.file.path,
            _id : product._id,
            request : {
                type : 'POST',
                url : `http://localhost:3000/products/${product._id}`}
            }
        })
})
.catch((err) =>{ 
    console.log(err)
    res.status(500).json({
        message : 'Failed to POST ',
        err
    })
})
}
exports.products_get_single = (req, res) => {
const id = req.params.productId
Product
.findById(id)
.select('name price _id productImage')
.exec()
.then(product =>{
    if(product){ 
        res.status(200).json({
            message : "Verifying a single product successfully",
            product :{
                name : product.name,
                price : product.price,
                productImage : product.productImage,
                _id : product._id,
                request : {
                    type : 'GET',
                    url : `http://localhost:3000/products/${product._id}`},
                    GetAllProduct : {
                        url : 'http://localhost:3000/products/',
                        description : 'GET ALL PRODUCTS'
                    }
                }
            })}
    else{
        res.status(404).json({
            message : 'No Prodcuts found'
        })
    }
})
.catch((err)=>{
    console.log(err)
    res.status(500).json({
        message : 'Failed to GET the product',
        err
    })
})
}
exports.product_update = (req, res) => {
const id = req.params.productId
const update = req.body
console.log(req.body)
Product.findByIdAndUpdate({_id : id}, update)
.exec()
.then(product => {
    res.status(200).json({
        message : "Updating a single product successfully",
        product :{
            name : product.name,
            price : product.price,
            _id : product._id,
            request : {
                type : 'PUT',
                url : `http://localhost:3000/products/${product._id}`}
            }
        })
})
.catch(err => {
    console.log(err)
    res.status(500).json({
        message : 'Failed to PATCH',
        err
    })
})  
}
exports.product_delete = (req, res) => {
const id = req.params.productId
Product.remove({_id : id})
.exec()
.then(product =>{
    res.status(200).json({
        message : 'Product deleted Sucessfully',
        request : {
            type : 'POST',
            body : {
                name : 'String',
                price : 'Number'
            }
        }
    })
})
.catch(err => {
    console.log(err)
    res.status(500).json({
        message : 'Failed to DELETE',
        err
    })
})
}