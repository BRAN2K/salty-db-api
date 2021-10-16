import express from "express-promise-router";
import loginController = require("../controllers/login");
const router = express();

router.post('/login', loginController.generateJWT);

export {router};
