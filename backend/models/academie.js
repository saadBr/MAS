const mongoose = require('mongoose');

const academieSchema = mongoose.Schema({
  titre: { type: String , required: true},
  contenu: {type: String, required: true},
  imagePath: {type:String, required:true},
  date:{type:Date,required:true},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});

module.exports = mongoose.model('Academie', academieSchema);
