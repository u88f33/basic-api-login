import express from "express";
import multer from "multer";
import path from "path";
import UpdateStudentRecordCtrl from "../controllers/update.controller.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join( process.cwd(), "public", "uploads" ))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const limits = {
    fileSize: 1024 * 1024 * 3
};

const fileFilter = ( req, file, cb ) => {
  if ( file.mimetype.startsWith( "image/" ) ) {
    cb( null, true );
  } else {
    cb( new Error( "Only images are allowed" ), false );
  }
}

const upload = multer({
    storage,
    limits,
    fileFilter
});

router.put(
    "/:id",
    upload.single( "studentImage" ),
    UpdateStudentRecordCtrl
);

export default router;