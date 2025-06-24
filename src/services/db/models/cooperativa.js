const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CooperativaSchema = new Schema({
    name: { type: String, required: true },
    direction: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },
    creationDate: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Cooperativa', CooperativaSchema);