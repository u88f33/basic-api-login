import mongoose from "mongoose";

const db = mongoose.connection;

const connectDB = async ( uri ) => {
    try {

        await mongoose.connect( uri );

    } catch ( err ) {
        console.log( `Error while connecting to MongoDB` );
        console.log( `Error: ${ err }` );
    }
}


db.on( "connected", () => {
    console.log( "Connected to MongoDB successfully" );
} );

db.on( "error", ( err ) => {
    console.log( `Error while connecting to MongoDB: ${ err }` )
} )

export default connectDB;