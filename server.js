import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import connectToDatabase from './utils/db.js';
import __dirname from './utils/utils.js'


import ProductsManager from './daos/mongodb/ProductsManager.class.js';
import viewsRouter from './routes/views.router.js';
import { routerCart } from './routes/carts.router.js';
import { routerCategories } from './routes/categories.router.js';
import { routerProducts } from './routes/products.router.js';
import { routerUsers } from './routes/users.router.js';
import { routerLogin } from './routes/login.router.js';

dotenv.config();

const app = express();

connectToDatabase();

const port = process.env.PORT || 8080;

app.use( cors() );
app.use( cookieParser() );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, '/public' ) ) );

mongoose.connection.once( 'open', () => {

  const httpServer = app.listen( port, () => {
    console.log( `Server is running on port ${port}` );
  } );

  const socketServer = new Server( httpServer );

  app.engine( 'handlebars', handlebars.engine( {
    defaultLayout: 'main',
    layoutsDir: path.join( __dirname, 'views/layouts/' ),
    partialsDir: path.join( __dirname, 'views/' ),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    }
  } ) );

  app.set( 'view engine', 'handlebars' );
  app.set( 'views', path.join( __dirname, 'views' ) );

  const productsManager = new ProductsManager();

  ( async () => {

    const products = await productsManager.getProducts();
    socketServer.emit( 'update-products', products );

  } )();

  socketServer.on( 'connection', ( socket ) => {
    socket.on( 'new-product', async ( newProduct ) => {

      try {

        await productsManager.addProduct( newProduct );
        socketServer.emit( 'update-products', await productsManager.getProducts() );

      } catch ( error ) {
        console.error( error );
      }
    } );

    socket.on( 'delete-product', async ( productID ) => {

      try {
        await productsManager.deleteProduct( productID );
        socketServer.emit( 'update-products', await productsManager.getProducts() );

      } catch ( error ) {
        console.error( error );
      }

    } );

  } );

  app.use( ( req, res, next ) => {
    req.socketServer = socketServer;
    next();
  } );

  app.get( '/', ( req, res ) => {
    res.render( 'login' );
  } );

  app.use( viewsRouter );
  app.use( routerLogin );
  app.use( routerCategories );
  app.use( routerCart );
  app.use( routerProducts );
  app.use( routerUsers );

  app.use( ( err, req, res, next ) => {
    console.error( err.stack );
    res.status( 500 ).send( 'Something broke!' );
  } );

} );