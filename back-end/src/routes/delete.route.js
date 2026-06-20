import express from "express";
import DeleteStudentRecordCtrl from "../controllers/delete.controller.js";

const router = express.Router();

router.delete(
    "/:id",
    DeleteStudentRecordCtrl
);

export default router;