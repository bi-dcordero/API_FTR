const express = require('express');
const bodyParser = require('body-parser');
const Transaccion = require('./models/transaccion');
const db = require('./db');

const app = express();
const port = 80;

app.use(bodyParser.json());

// Ruta para consultar todas las transacciones
app.get('/todas-las-transacciones', async (req, res) => {
  try {
    // Consultar la base de datos para obtener todas las transacciones
    const transacciones = await Transaccion.find({});
    res.json(transacciones);
  } catch (error) {
    console.error('Error al consultar transacciones:', error);
    res.status(500).json({ error: 'Error al consultar transacciones' });
  }
});

// Ruta para agregar una nueva transacción
app.post('/agregar-transaccion', async (req, res) => {
  try {
    const nuevaTransaccion = new Transaccion(req.body);
    const transaccionGuardada = await nuevaTransaccion.save();
    res.status(201).json(transaccionGuardada);
  } catch (error) {
    console.error('Error al agregar transacción:', error);
    res.status(500).json({ error: 'Error al agregar transacción' });
  }
});

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
