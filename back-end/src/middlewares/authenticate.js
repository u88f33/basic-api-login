import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateUser = async ( req, res, next ) => {

    try {

        const bearerHeader = req.headers["authorization"];
       
        
        if ( typeof bearerHeader != "undefined" ) {
            const token = bearerHeader.split( " " )[1];
            const user = jwt.verify( token, process.env.JWT_SECRET );
            
            
            req.token = user;
            next();
        } else {
            res.status( 403 ).json({
                "message": "No token Provided"
            })
        }

    } catch ( err ) {
        res.status( 403 ).json({
            "message": "Error while login",
            "error": err.message
        })
    }

}

export default authenticateUser;