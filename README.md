# SHOP-MARKET-RESTFUL-EXPRESS-API-


## Table of content 

* General info
* Technologies
* Setup

## Introduction 

Simple RESTFUL API created using Node.JS, Express.JS and MongoDB.

## Technologies

* Node.js
* Express.js
* MongoDB

## Perequisite

Before launching this project you must ensure that you have MongoDB installed locally
Bellow are the links to help you installing it:

 —> https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

 —> https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

 —> https://docs.mongodb.com/manual/administration/install-on-linux/

## Launch

*  git clone 
* cd 
* npm install 
* npm run dev



## APP STRUCTURE AND KEY POINTS


- [x] API ==> Server
			
In the server we import 
    1.  express (The framework on which will be built the app)
    2.  body-parser (It helps sending POST and PUT requests as it enables you to take JSON body data )
    3.  multer (It enables you to upload images)
    4.  jsonwebtoken ( for user authentication and routes protection)
    5.  bcrypt ( for password encryption)
    6.  Morgan (dev tool )
    7. 

- [x] Database  => Database
    * Import mongoose 
    * Import models
    * Create a connection url
    * Create the connect method 	

- [x] API ==> Models

We use the Mongoose schema to create a schema for the entities in our app
A document schema is a JSON object that allows you to define the shape and content of documents and embedded documents in a collection

We have : 
    * User schema (email, password)
    *  Order schema (quantity, product)
    * Product schema (name, price, product image)

- [x] API ==> Routes

The routes are : 

    1. SIGNUP USER  ==>  PUT ==> /signup
    2. SIGNIN USER  ==> POST ==> /login
    3. DELETE USER  ==> DELETE ==> /:userId
    4. CREATE PRODUCT ==> POST ==> /products
    5. READ ALL PRODUCTS ==> GET ==> /products
    6. READ SINGLE PRODUCT ==> GET ==> /products/:productId
    7. UPDATE PRODUCT ==> PUT ==> /products/:productId
    8. DELETE PRODUCT ==> DELETE ==> /products/:productId
    9. CREATE ORDER ==> POST ==> /orders
    10. READ ALL ORDERS ==> GET ==> /orders
    11. READ SINGLE ORDER ==> GET ==> /orders/:orderId
    12. DELETE ORDER ==> DELETE ==> /orders/:orderId

- [x] MIDDLEWARE ==> Auth
	
	We used JWT(jsonwebtoken) sign and verify method to create a token to authenticate the 
	user and give me access to certain routes where he/she could perform operations






