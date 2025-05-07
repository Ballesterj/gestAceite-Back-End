const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FincaSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    surface: { type: Number, required: true },
    oliveAmount: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'Socio', required: true },
    harvests: [{
      year: { type: Number, required: true },
      olivesHarvestedKg: { type: Number, required: true },
      oilYieldPercent: { type: Number, required: true }
    }],
  });
  
  module.exports = mongoose.model('Finca', FincaSchema);
  