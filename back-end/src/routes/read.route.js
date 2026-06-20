import express from "express";
import ReadStudentRecordsCtrl from
"../controllers/read.controller.js";

const router = express.Router();

router.get( 
    "/",
    ReadStudentRecordsCtrl
);

export default router;