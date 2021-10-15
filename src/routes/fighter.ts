import express from "express-promise-router";
import fighterController = require("../controllers/fighter");
const router = express();

router.post('/fighter', fighterController.insertFighter);

router.get('/fighter', fighterController.getOneFighter);

router.put('/fighter', fighterController.updateFighter);

export {router};
