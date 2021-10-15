import db = require("../db/db");

const selectFighterQuery = "SELECT * FROM fighter WHERE name = $1";
const insertFighterQuery = "INSERT INTO fighter(name, wins, losses) VALUES($1, $2, $3)";
const updateFighterQuery = "UPDATE fighter SET wins = wins+$1, losses = losses+$2 WHERE name = $3";

export async function insertFighter(req:any, res:any) {
    const { name } = req.body;
    const response = await db.query(insertFighterQuery, [name, 0, 0]);

    if (response) {
        console.log("Fighter added successfully", response.rows);
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
    const { name } = req.body;
    const response = await db.query(selectFighterQuery, [name]);
    if (response) {
        console.log("Query successful", response.rows);
        res.status(200).send(response.rows);
    }
    else {
        res.status(400).send({
            message: "Query error"
        });
    }
}

export async function updateFighter(req:any, res:any) {
    const {wins, losses, name} = req.body;

    const response = await db.query(updateFighterQuery, [wins, losses, name]);
    if (response) {
        console.log("Fighter updated successfuly", response.rows);
        res.status(200).send({ message: "Updated successfully"});
    }
    else {
        res.status(400).send({ message: "Query error"});
    }
}