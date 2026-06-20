import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import InsertStudentRecordCtrlPost from
"../controllers/insert.controller.js";

const router = express.Router();

const uploadsFolderPath = path.join( process.cwd(), "public", "uploads" );

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if ( !fs.existsSync( uploadsFolderPath ) ) {
      fs.mkdirSync( uploadsFolderPath );
    }

    cb(null, uploadsFolderPath );
    
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

router.post(
    "/",
    upload.single("studentImage"),
    InsertStudentRecordCtrlPost
);

export default router;