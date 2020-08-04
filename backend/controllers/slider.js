
const Slider=require("../models/slider");

exports.createSlider=(req,res,next)=>{
  const url = req.protocol+'://'+ req.get("host");
  const slider = new Slider({
    description: req.body.description,
    imagePath: url + "/images/"+req.file.filename,
    creator:req.userData.userId
  });
  slider.save().then(result=>{
    res.status(201).json({
      message:"Slider ajouté avec succès",
      slider: {
        ...result,
        id:result._id
      }
  });
}).catch(error=>{
  console.log(error);
  res.status(500).json({
    message:"La creation d'un slider a échoué"
  })
});
}

exports.updateSlider=(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol+'://'+ req.get("host");
    imagePath = url+ "/images/"+req.file.filename;
  }
  const slider = new Slider({
    _id: req.body.id,
    description: req.body.description,
    imagePath: imagePath,
    creator:req.userData.userId
  });
  Slider.updateOne({_id:req.params.id,creator:req.userData.userId},slider).then(result=>{
    if(result.n>0){
      res.status(200).json({message:"mettre à jour avec succès"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  }).catch(error=>{
    message:"n'a pas pu mettre à jour slider"
  });
}

exports.deleteSlider=(req,res,next)=>{
  Slider.deleteOne({_id: req.params.id,creator:req.userData.userId})
  .then(result =>{
    console.log(result)
    if(result.n>0){
      res.status(200).json({message:"slider supprimé"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  })
  .catch(error=>{
    res.status(401).json({message:"n'a pas pu supprimer slider"});
  });
}

exports.getSliders=(req,res,next) => {
  const pageSize= +req.query.pagesize;
  const currentPage = +req.query.page;
  const sliderQuery= Slider.find();
  let fetchedSliders;
  if(pageSize && currentPage) {
    sliderQuery
    .skip(pageSize * (currentPage-1)).limit(pageSize);
  }
  sliderQuery
  .then(documents=>{
    fetchedSliders=documents;
    return Slider.collection.countDocuments();
  }).then(count=>{
    res.status(200).json({message:'Récupéré avec succès',sliders:fetchedSliders,maxSliders:count});
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}

exports.getSlider=(req,res,next)=>{
  Slider.findById(req.params.id).then(slider => {
    if(slider) {
      res.status(200).json(slider);
    } else {
      res.status(404).json({message:'Slider pas trouvé'});
    }
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}
