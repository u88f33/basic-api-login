import StudentApiCollection from "../models/student.model.js";

const InsertStudentRecordCtrlPost = async ( req, res, next ) => {

    try {

        req.body.studentImage = null;
        
        if ( req.file ) {
            req.body.studentImage = req.file.filename;
        }
        
        const data = req.body;

        const insertDataInDatabase = 
        await StudentApiCollection.insertMany( data );
        
        res.status( 200 ).json(
            {
                "message": "Data Inserted successfully in Database"
            }
        );

    } catch ( error ) {

        console.log( `Error: ${ error }` );
        res.status( 500 ).json({
            "message": "Data is not sent to MongoDB",
            "Error": error.message
        });

    }

}

export default InsertStudentRecordCtrlPost;