import express from "express-promise-router";
import fightsController = require("../controllers/fights");
const router = express();

router.post('/fights', fightsController.insertFight);

export {router};
