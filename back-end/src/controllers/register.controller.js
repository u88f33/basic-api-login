import UsersCollection from "../models/user.model.js";
import bcrypt from "bcryptjs";

const RegisterUserCtrlPost = async ( req, res, next ) => {

    try {

        console.log( req.body );

        const {
            userName,
            userEmail,
            userPassword
        } = req.body;

        const isUserAlreadyInDb = 
        await UsersCollection.findOne(
            {
                $or: [ { userName }, { userEmail } ]
            }
        );

        
        if ( isUserAlreadyInDb ) {
            return res.status( 403 ).json({
                messsage: "User is already present in the Database"
            });
        }

        const hashedPassword = await bcrypt.hash( userPassword, 10 );

        const formattedData = {
            userName: userName,
            userEmail: userEmail,
            userPassword: hashedPassword
        }

        const insertUserRegDataInDb = await UsersCollection.insertOne( formattedData );

        if ( !insertUserRegDataInDb ) {
            return res.status( 200 ).json({
                message: "Unable to send data"
            })
        }

        res.status( 200 ).json({
            "message": "Registration data successfully sent to Database",
            "data": insertUserRegDataInDb
        })

    } catch ( err ) {

        console.log( `Error While Registration` );
        console.log( `Error: ${ err.message }` );

        res.status( 500 ).json({
            "message": "Error while Registration",
            "error": err.message
        })

    }

}

export default RegisterUserCtrlPost;