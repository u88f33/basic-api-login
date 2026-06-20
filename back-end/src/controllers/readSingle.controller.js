import StudentApiCollection from "../models/student.model.js";

const ReadStudentRecordCtrl = async ( req, res, next ) => {

    try {

        const getSingleRecord = await StudentApiCollection.findById( req.params.id );


        res.status( 200 ).json(
            {
                "message": "Fetched successfully",
                "Records": getSingleRecord
            }
        )

    } catch ( error ) {

        console.log( `Error while getting Student Record: ${ error }` );
        
        res.status( 500 ).json(
            {
                "message": "Cannot get Student Record",
                "error": error.message
            }
        )
    }

}

export default ReadStudentRecordCtrl;