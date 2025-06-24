const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MensajeSchema = new Schema({
  cooperativa: { type: Schema.Types.ObjectId, ref: 'Cooperativa', required: true },
  issue: { type: String, required: true },
  message: { type: String, required: true },
  sending_date: { type: Date, default: Date.now }
});
  
module.exports = mongoose.model('Mensaje', MensajeSchema);