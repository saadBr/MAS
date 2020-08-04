const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  nom: { type: String , required: true},
  poste: {type: String, required: true},
  imagePath: {type:String, required:true},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});

module.exports = mongoose.model('Player', playerSchema);
