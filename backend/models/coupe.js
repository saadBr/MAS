const mongoose = require('mongoose');

const coupeSchema = mongoose.Schema({
  titre: { type: String , required: true},
  nombre: {type: Number, required: true},
  imagePath: {type:String, required:true},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});

module.exports = mongoose.model('Coupe', coupeSchema);
