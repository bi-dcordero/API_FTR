const mongoose = require('mongoose');

const transaccionSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true
  },
  tarjeta: {
    type: String,
    required: true
  },
  moneda: {
    type: String,
    required: true
  },
  mcc: {
    type: String,
    required: true
  },
  monto: {
    type: Number,
    required: true
  }
});

const Transaccion = mongoose.model('FraudeTR', transaccionSchema);

module.exports = Transaccion;
