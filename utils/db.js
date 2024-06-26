
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGODB_URI;

const connectToDatabase = () => {
    mongoose.connect( uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } );

    const db = mongoose.connection;

    db.on( 'error', ( error ) => {
        console.error( 'Error de conexion a MongoDB:', error );
    } );

    db.once( 'open', () => {
        console.log( 'Conectado a MongoDB' );
    } );
};

export default connectToDatabase;