import StudentApiCollection from "../models/student.model.js";
import path from "path";
import fs from "fs";

const DeleteStudentRecordCtrl = async ( req, res, next ) => {

    try {
        const currentRecordInDb = 
        await StudentApiCollection.findById( req.params.id );


        if ( currentRecordInDb.studentImage != null ) {
            await fs.unlink(
                path.join(
                    process.cwd(),
                    "public",
                    "uploads",
                    currentRecordInDb.studentImage
                ),
                (err) => {
                    if ( err ) {
                        console.log( err );
                    }
                }
            );
        }

        const deleteRecordInDatabase = await StudentApiCollection.findByIdAndDelete(
            req.params.id
        );

        res.status( 200 ).json({
            "message": "File Deleted Successfully"
        })
    } catch ( error ) {

        console.log( `Error while updating: ${ error }` );

        res.status( 500 ).json(
            {
                "message": "Cannot Delete Student Record",
                "error": error.message
            }
        )

    }

}

export default DeleteStudentRecordCtrl;