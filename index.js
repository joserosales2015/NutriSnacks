const express = require('express');
require('dotenv').config();
const { default: PG } = require('pg');
const { Pool } = require("pg");

const app = express();
const SERVERPORT = process.env.SERVER_PORTO || 8080;
const connectionString = process.env.DATABASE_URL;


if (!connectionString) {
    throw new Error('La variable de entorno DATABASE_URL no está configurada.');
}


// Configura tu conexión a PostgreSQL
const pool = new Pool({
  user: process.env.PG_USERNAME,
  host: process.env.PG_HOSTNAME,
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
    console.log(process.env.SERVER_PORT);
    console.log(`Servidor escuchando en http://localhost:${SERVERPORT}`);
});