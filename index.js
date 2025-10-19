const express = require('express');
require('dotenv').config();
const { default: PG } = require('pg');
const { Pool } = require("pg");

const app = express();
const SERVERPORT = process.env.SERVER_PORT || 3000;
const connectionString = process.env.DATABASE_URL;


if (!connectionString) {
    throw new Error('La variable de entorno DATABASE_URL no está configurada.');
}


// Configura tu conexión a PostgreSQL

console.log("user:", process.env.PG_USERNAME);
console.log("host:", process.env.PG_HOSTNAME);
console.log("bd:", process.env.PG_DATABASE);
console.log("pwd:", process.env.PG_PASSWORD);
console.log("port:", process.env.PG_PORT);

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false, // sslmodde -> 'require'
  },
});


app.get('/', (req, res) => {
    res.send('¡Servicios NutriSnacks!');
});

app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM usuarios;");
        res.json(result.rows); // Devuelve los usuarios en formato JSON
    } catch (err) {
        console.error("Error al consultar usuarios:", err);
        res.status(500).send("Error en el servidor");
    }
});

app.listen(SERVERPORT, () => {
    console.log(`Servidor escuchando en http://localhost:${SERVERPORT}`);
});