const express = require('express');
const bodyParser = require('body-parser');
const Transaccion = require('./models/transaccion');
const db = require('./db');

const app = express();
const port = process.env.PORT || 80;

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


app.post('/cantidad-transacciones-en-fecha', async (req, res) => {
  try {
    const { fecha } = req.body;
    
    if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return res.status(400).json({ error: 'Fecha no válida. Utiliza el formato "YYYY-MM-DD".' });
    }

    const fechaInicio = new Date(fecha);
    fechaInicio.setHours(0, 0, 0, 0);
    const fechaFin = new Date(fecha);
    fechaFin.setHours(23, 59, 59, 999);

    const cantidadTransacciones = await Transaccion.countDocuments({
      fecha: { $gte: fechaInicio, $lte: fechaFin }
    });

    res.json({ fecha, cantidadTransacciones });
  } catch (error) {
    console.error('Error al consultar la cantidad de transacciones:', error);
    res.status(500).json({ error: 'Error al consultar la cantidad de transacciones' });
  }
});

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
