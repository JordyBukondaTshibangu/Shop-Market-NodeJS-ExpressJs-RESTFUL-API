const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./api/database/mongoose');
const app = express()
const productRoutes = require('./api/route/products')
const orderRoutes = require('./api/route/orders')
const userRoutes = require('./api/route/user')

mongoose.Promise = global.Promise;
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use('/uploads', express.static('uploads'))

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*')
    res.header('Acces-Control-Allow-Headers', '*')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,DELETE,PATCH,GET')
        return res.status(200).json({})
    }
    next();
})
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/users', userRoutes)


app.use((req, res, next) =>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(` The server is up running on port: ${port}`))