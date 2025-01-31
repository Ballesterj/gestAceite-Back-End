const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GananciaSchema = new Schema({
    finca: { type: Schema.Types.ObjectId, ref: 'Finca', required: true },
    concept: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Ganancia', GananciaSchema);