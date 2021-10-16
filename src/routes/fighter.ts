import express from "express-promise-router";
import fighterController = require("../controllers/fighter");
import loginController = require("../controllers/login");

const router = express();

router.get('/fighter/:name', fighterController.getOneFighter);

router.post('/fighter', loginController.verifyJWT, fighterController.insertFighter);

router.put('/fighter', loginController.verifyJWT, fighterController.updateFighter);

export {router};
