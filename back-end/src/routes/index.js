import express from "express";
import InsertRecordRoute from "./insert.route.js";
import ReadRecordsRoute from "./read.route.js";
import ReadSingleRecordRoute from "./readSingle.route.js";
import UpdateSingleRecordRoute from "./update.route.js";
import DeleteSingleRecordRoute from "./delete.route.js";
import UserAuthenticationRoute from "./authenticate.route.js";

// MiddleWare
import authenticateUser from "../middlewares/authenticate.js";

const router = express.Router();

router.use(
    "/",
    UserAuthenticationRoute
);

router.use( authenticateUser );

router.use( 
    "/",
    InsertRecordRoute
);

router.use(
    "/",
    ReadRecordsRoute
)

router.use(
    "/",
    ReadSingleRecordRoute
);

router.use(
    "/",
    UpdateSingleRecordRoute
)

router.use(
    "/",
    DeleteSingleRecordRoute
);

export default router;