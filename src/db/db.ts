import {Pool} from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

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