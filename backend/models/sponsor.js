const mongoose = require('mongoose');

const sponsorSchema = mongoose.Schema({
  nom: { type: String , required: true},
  imagePath: {type:String, required:true},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});

module.exports = mongoose.model('Sponsor', sponsorSchema);
