import StudentApiCollection from "../models/student.model.js";

const ReadStudentRecordsCtrl = async ( req, res, next ) => {

    try {

        const data = req.body;
        const getDatabaseRecords = await StudentApiCollection.find();

        res.status( 200 ).json(
            {
                "message": "Fetched Records successfully",
                "Records": getDatabaseRecords
            }
        )

    } catch ( error ) {

        console.log( `Error while getting DB records: ${ error }` );
        
        res.status( 500 ).json(
            {
                "message": "Cannot get Database Records",
                "error": error.message
            }
        )
    }

}

export default ReadStudentRecordsCtrl;