import express from "express";
import path from "path";
import ApiRoute from "./src/routes/index.js";
import connectDB from "./src/config/conn.js";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "http2";

const app = express();

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
connectDB( MONGO_URI );

app.set( "view engine", "ejs" );
app.set( 
    "views", 
    path.join( process.cwd(), "views" ) 
);

app.use( express.static( "./public" ) );
app.use( express.urlencoded( { extended: false } ) );
app.use( express.json() );

app.use( cors() );
app.use( 
    "/api/students", 
    express.static(
        path.join(
            process.cwd(),
            "public",
            "uploads"
        )
    )
)

app.use( "/api/students", ApiRoute );

app.use( ( err, req, res, next ) => {
    if ( err ) {
        res.status( 400 ).json({
            "success": false,
            "errorStatus": err.status,
            "errorMsg": err.message
        })
    }
} );

const PORT = process.env.PORT;
app.listen( PORT, () => {
    console.log( `Listening to port# ${ PORT }` );
} );