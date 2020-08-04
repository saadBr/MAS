const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  designation: { type: String , required: true},
  prix: {type: String, required: true},
  imagePath: {type:String, required:true},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});

module.exports = mongoose.model('Article', articleSchema);
