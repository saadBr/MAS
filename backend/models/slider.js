const mongoose = require('mongoose');

const sliderSchema = mongoose.Schema({
  description: { type: String , required: true},
  imagePath: {type:String, required:true},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});

module.exports = mongoose.model('Slider', sliderSchema);
