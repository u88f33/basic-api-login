import fs from "fs";
import path from "path";
import StudentApiCollection from "../models/student.model.js";

const UpdateStudentRecordCtrl = async ( req, res, next ) => {
    try {

        const recordBeforeUpdate = 
        await StudentApiCollection.findById( req.params.id );

        
        req.body.studentImage = recordBeforeUpdate.studentImage;

        if ( req.file ) {
                
            if ( recordBeforeUpdate.studentImage != null ) {
                await fs.unlink(
                    path.join(
                        process.cwd(), 
                        "public", 
                        "uploads",  
                        recordBeforeUpdate.studentImage
                    ),
                    ( err ) => {
                        if ( err ) {
                            return res.status(500).json({
                                "Error while deleting file": `${err}`
                            });
                        }
                    }
                )
            }
            
            req.body.studentImage = req.file.filename;
        }

        const updatedStudentData = req.body;

        const recordAfterUpdate = await StudentApiCollection.findByIdAndUpdate(
            req.params.id,
            updatedStudentData,
            {"returnDocument" : "after"}
        );

        res.status( 200 ).json(
            {
                "message": "Record updated successfully"
            }
        )

    } catch ( error ) {

        console.log( `Error while updating: ${ error }` );

        res.status( 500 ).json(
            {
                "message": "Cannot update Student Record",
                "error": error.message
            }
        )

    }
}

export default UpdateStudentRecordCtrl;