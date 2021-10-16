import db = require("../db/db");
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

const getAdminQuery = "SELECT * FROM admins WHERE name = $1";

export async function generateJWT(req:any, res:any) {
    const {user, password} = req.body;
        
    const response = await db.query(getAdminQuery, [user]);

    if (response && response.rowCount > 0) {
        const match = await bcrypt.compare(password, response?.rows[0]["password"]);
        if (match) {
            const id = response.rows[0]["id"];
            jwt.sign({id}, (<Secret>process.env.JWT_SECRET), {expiresIn: "30d"}, function(err:any, token:any) {
                if (err) return res.status(500).send({ message: 'Failed to generate token'});
                return res.status(200).send({auth: true, token: token});
            });
        }
        res.status(500).send({message: 'invalid login'});
    }
    res.status(500).send({message: 'database error'});
}

export async function verifyJWT(req:any, res:any, next:any) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided'});

    jwt.verify(token, (<Secret>process.env.SECRET), function(err:any, decoded:any) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token'});

        req.userId = decoded.id;
        next();
    });
}