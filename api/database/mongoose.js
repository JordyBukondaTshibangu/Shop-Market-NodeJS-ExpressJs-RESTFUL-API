const mongoose = require('mongoose');

require('../models/order');
require('../models/product');
require('../models/user');

const url = 'mongodb://localhost:27017/my-shop-market-db';


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection

    db.on('error', (err) => console.log(err))
    db.once('open', () =>  console.log('Connected to the Database'))