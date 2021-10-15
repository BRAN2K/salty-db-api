import express from "express";
import cors from "cors";

import indexRouter = require('./routes/index');
import fighterRouter = require('./routes/fighter');
import fightsRouter = require('./routes/fights');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({type: "application/vnd.api+json"}));
app.use(cors());

app.use(indexRouter.router);
app.use('/api/', fighterRouter.router);
app.use('/api/', fightsRouter.router);

export {app};
