const mongoose = require('mongoose');

const motDePresidentSchema = mongoose.Schema({
  contenu: {type: String, required: true},
  imagePath: {type:String, required:true},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});

module.exports = mongoose.model('MotDePresident', motDePresidentSchema);
