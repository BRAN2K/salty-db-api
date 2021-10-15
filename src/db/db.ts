import {Pool} from "pg";
import {postgres} from "../config.json";

const pool = new Pool(postgres);

async function query(query:string, values:(string|number)[]) {
    try {
        const res = await pool.query(query, values);
        return res
    }
    catch (err) {
        console.log((<Error>err).stack);
        return null;
    }
}

export {query};