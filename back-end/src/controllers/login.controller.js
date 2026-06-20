import UsersCollection from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const LoginUserCtrlPost = async( req, res, next ) => {

    try {

        const {
            userName,
            userPassword
        } = req.body;

        const validateByUserName = await UsersCollection.findOne( { userName } );

        if ( !validateByUserName ) {
            return res.status( 403 ).json({
                "message": "Username not found",
            })
        };

        
        const comparePasswords = await bcrypt.compare( userPassword, validateByUserName.userPassword );

        if ( !comparePasswords ) {
            return res.status( 403 ).json({
                "message": "Username not found",
            })
        }
        
        const payload = {
            userId: validateByUserName._id,
            role: "user"
        }

        const secretKey = process.env.JWT_SECRET;
        const options = {
            expiresIn: "1h"
        }

        const token = jwt.sign(
            payload,
            secretKey,
            options
        )

        res.status(200).json({
            "token": token
        })

    } catch ( err ) {
        console.log( `Error: ${ err }` );
        res.status( 500 ).json({
            "message": "Unable to Login",
            "Error": `${ err }`
        });
    }

}

export default LoginUserCtrlPost;