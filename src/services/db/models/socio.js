const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User Schema
 */

const SocioSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: {
    type: String,
    enum: ['admin', 'agricultor'], 
    default: 'agricultor' 
  },
  cooperativa: { type: Schema.Types.ObjectId, ref: 'Cooperativa'},
  phone: { type: String },
  creationDate: { type: Date, default: Date.now },
  mensajes_leidos: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Mensaje' 
  }]
});


module.exports = mongoose.model('Socio', SocioSchema);