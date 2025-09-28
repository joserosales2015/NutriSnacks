const express = require('express');

const app = express();
const PORT = 3000;

const usuarios = [
    { id: 1, nombre: 'Juan', edad: 28 },
    { id: 2, nombre: 'María', edad: 34 },
    { id: 3, nombre: 'Pedro', edad: 22 },
    { id: 4, nombre: 'Sofia', edad: 20 },
]

app.get('/', (req, res) => {
    res.send('¡Servicios de NutriSnacks!');
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});