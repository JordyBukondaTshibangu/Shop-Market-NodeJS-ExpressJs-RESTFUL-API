const mongoose = require('mongoose')
const Order = require('../models/order')
const Product = require('../models/product')

exports.orders_get_all = (req, res) =>{
Order.find()
.select(' product quantity id')
.populate('product', 'name')
.exec()
.then((orders) => {
    const response = {
        count : orders.length,
        products : orders.map((order) => {
            return {
                quantity : order.quantity,
                productId : order.product,
                _id : order._id,
                request : {
                    type : 'GET',
                    url : `http://localhost:3000/orders/${order._id}`
                        }
                }
        })
    }
    res.status(200).json({
        message : 'Orders requested GET successful',
        response
    })
})
.catch((err) => {
    console.log(err)
    res.status(500).json({
        message : 'Failed to GET request',
        err : err.message
    })
})
}
exports.order_create = (req, res) => {

Product.findById(req.body.product)
.then(product => {
    if(!product){
        res.status(404).send('Product Not Found')
    }
    else{
        const order = new Order({ 
            _id : mongoose.Types.ObjectId(),
            product : req.body.product,
            quantity : req.body.quantity
        })
            return order.save()
    }
})
.then(order => {
    res.status(201).json({
        message : "Created order successfully",
        creattedProduct :{
            quantity : order.quantity,
            productId : order.product,
            _id : order._id,
            request : {
                type : 'POST',
                url : `http://localhost:3000/orders/${order._id}`}
            }
        })
})
.catch((err) => {
    console.log(err)
    res.status(500).json({
            message : 'Failed to POST order',
            err : err
        })
    })

}
exports.order_get_single = (req, res) => {
const id = req.params.orderId
Order
.findById(id)
.populate('product', 'id name price')
.then(order =>{
    if(order){ 
        res.status(200).json({
            message : "Verifying a single order successfully",
            product :{
                quantity : order.quantity,
                product : order.product,
                _id : order._id,
                request : {
                    type : 'GET',
                    url : `http://localhost:3000/orders/${order._id}`},
                    GetAllProduct : {
                        url : 'http://localhost:3000/orders/',
                        description : 'GET ALL ORDERS'
                    }
                }
            })}
    else{
        res.status(404).json({
            message : 'No order found'
        })
    }
})
.catch((err)=>{
    console.log(err)
    res.status(500).json({
        message : 'Failed to GET the Orders',
        err
    })
})

}
exports.order_delete = (req, res) => {
const id = req.params.orderId
Order.remove({_id : id})
.exec()
.then(order => {
    res.status(200).json({
        message : 'Product deleted Sucessfully',
        request : {
            type : 'POST',
            url : `http://localhost:3000/products/${order._id}`,
            body : {
                quantity : 'Number',
                product : 'Number'
            }
        }
    })
})
.catch(err => {
    console.log(err)
    res.status(500).json({
        message :'Failed to Delete order',
        error : err.message
    })

})
}