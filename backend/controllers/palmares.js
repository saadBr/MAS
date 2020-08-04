
const Palmares=require("../models/palmares");


exports.updatePalmares=(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol+'://'+ req.get("host");
    imagePath = url+ "/images/"+req.file.filename;
  }
  const palmares = new Palmares({
    _id: req.body.id,
    contenu: req.body.contenu,
    imagePath: imagePath,
    creator:req.userData.userId
  });
  Palmares.updateOne({_id:req.params.id,creator:req.userData.userId},palmares).then(result=>{
    if(result.n>0){
      res.status(200).json({message:"mettre à jour avec succès"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  }).catch(error=>{
    message:"n'a pas pu mettre à jour palmares"
  });
}



exports.getPalmares=(req,res,next)=>{
  Palmares.findById(req.params.id).then(palmares => {
    if(palmares) {
      res.status(200).json(palmares);
    } else {
      res.status(404).json({message:'Palmares pas trouvé'});
    }
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}
