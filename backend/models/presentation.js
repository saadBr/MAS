const mongoose = require('mongoose');

const presentationSchema = mongoose.Schema({
  contenu: {type: String, required: true},
  imagePath: {type:String, required:true},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});

module.exports = mongoose.model('Presentation', presentationSchema);
