
const Presentation=require("../models/presentation");



exports.updatePresentation=(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol+'://'+ req.get("host");
    imagePath = url+ "/images/"+req.file.filename;
  }
  const presentation = new Presentation({
    _id: req.body.id,
    contenu: req.body.contenu,
    imagePath: imagePath,
    creator:req.userData.userId
  });
  Presentation.updateOne({_id:req.params.id,creator:req.userData.userId},presentation).then(result=>{
    if(result.n>0){
      res.status(200).json({message:"mettre à jour avec succès"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  }).catch(error=>{
    message:"n'a pas pu mettre à jour presentation"
  });
}



exports.getPresentation=(req,res,next)=>{
  Presentation.findById(req.params.id).then(presentation => {
    if(presentation) {
      res.status(200).json(presentation);
    } else {
      res.status(404).json({message:'Presentation pas trouvé'});
    }
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}
