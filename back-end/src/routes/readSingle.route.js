import express from "express";
import ReadStudentRecordCtrl from
"../controllers/readSingle.controller.js";

const router = express.Router();

router.get( 
    "/:id",
    ReadStudentRecordCtrl
);

export default router;