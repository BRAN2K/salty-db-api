import db = require("../db/db");
import nCache from "node-cache";

const selectFighterQuery = "SELECT * FROM fighter WHERE name = $1";
const insertFighterQuery = "INSERT INTO fighter(name, wins, losses) VALUES($1, $2, $3)";
const updateFighterQuery = "UPDATE fighter SET wins = wins+$1, losses = losses+$2 WHERE name = $3";

const cache = new nCache({ stdTTL: 10, checkperiod: 2, useClones: false });

export async function insertFighter(req:any, res:any) {
    const { name } = req.body;
    const response = await db.query(insertFighterQuery, [name, 0, 0]);

    if (response) {
        console.log("Fighter added successfully");
        res.status(201).send({
            message: "Fighter added successfully",
            body: {
                fighter: [ name, 0, 0 ]
            },
        });
    }
    else {
        res.status(400).send({message: "Query error"});
    }
}

export async function getOneFighter(req:any, res:any) {
    const cacheKey = "__cache__" + req.url;
    let value:any;

    try {
        value = await cache.get(cacheKey);
    }
    catch {
        value = undefined;
    }

    if (value && (Array.isArray(value)) ) {
        console.log("sending cached response");
        res.status(value[0]).send(value[1]);
    }
    else {
        const { name } = req.params;
        const response = await db.query(selectFighterQuery, [name]);
        if (response && response.rowCount > 0) {
            console.log("Query successful", response.rows);
            value = [ 200, response.rows];
            cache.set(cacheKey, value); 
            res.status(value[0]).send(value[1]);
        }
        else if (response) {
            console.log("fighter not found");
            value = [204, { message: "fighter not found"}]
            cache.set(cacheKey, value);
            res.status(value[0]).send(value[1]);
        }
        else {
            console.log("Query error");
            value = [400, { message: "Query error"}]
            cache.set(cacheKey, value);
            res.status(value[0]).send(value[1]);
        }
    }
}

export async function updateFighter(req:any, res:any) {
    const {wins, losses, name} = req.body;

    const response = await db.query(updateFighterQuery, [wins, losses, name]);
    if (response) {
        console.log("Fighter updated successfuly");
        res.status(200).send({ message: "Updated successfully"});
    }
    else {
        res.status(400).send({ message: "Query error"});
    }
}