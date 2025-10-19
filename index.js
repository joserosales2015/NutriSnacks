const express = require('express');
require('dotenv').config();
const { default: PG } = require('pg');
const { Pool } = require("pg");

const app = express();
const SERVERPORT = process.env.SERVER_PORT || 3000;
// const rejectUnauthorized = process.env.PG_REJECT_UNAUTHORIZED === 'false' ? false : true;
const connectionString = process.env.DATABASE_URL;
const caCert = process.env.PG_CA_CERT;

if (!connectionString) {
    throw new Error('La variable de entorno DATABASE_URL no está configurada.');
}


// Configura tu conexión a PostgreSQL
const pool = new Pool({
    connectionString: connectionString,
    // NO necesitas pasar 'ssl: { rejectUnauthorized: false }'
    // porque 'sslmode=require' ya está en la URL inyectada por DO.
    // Si quieres forzar la verificación (verify-ca), sí necesitarías configurarlo aquí.
    ssl: {
        // 3. Pasa el contenido del certificado a la conexión
        ca: caCert,
    },
});

app.get('/', (req, res) => {
    res.send('¡Servicios NutriSnacks!');
    console.log(process.env.DATABASE_CA_CERT);
});

app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query("SELECT id, nombre, email, " +
            "TO_CHAR(fecha_nac AT TIME ZONE 'America/Lima', 'YYYY-MM-DD HH24:MI:SS.MS') AS fecha_nac " + 
            "FROM usuarios;");
        res.json(result.rows); // Devuelve los usuarios en formato JSON
    } catch (err) {
        console.error("Error al consultar usuarios:", err);
        res.status(500).send("Error en el servidor");
    }
});

app.listen(SERVERPORT, () => {
    console.log(`Servidor escuchando en http://localhost:${SERVERPORT}`);
});