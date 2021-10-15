import db = require("../db/db");

const insertFightQuery = "INSERT INTO fights(fightera, fighterb, winner) VALUES($1, $2, $3)";

export async function insertFight(req:any, res:any) {
    const { fightera, fighterb, winner } = req.body;
    const response = await db.query(insertFightQuery, [fightera, fighterb, winner]);

    if (response) {
        console.log("Fight added successfully", response.rows);
        res.status(201).send({
            message: "Fight added successfully",
        });
    }
    else {
        res.status(400).send({message: "Query error"});
    }
}