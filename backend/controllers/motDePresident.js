
const MotDePresident=require("../models/motDePresident");



exports.updateMotDePresident=(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol+'://'+ req.get("host");
    imagePath = url+ "/images/"+req.file.filename;
  }
  const motDePresident = new MotDePresident({
    _id: req.body.id,
    contenu: req.body.contenu,
    imagePath: imagePath,
    creator:req.userData.userId
  });
  MotDePresident.updateOne({_id:req.params.id,creator:req.userData.userId},motDePresident).then(result=>{
    if(result.n>0){
      res.status(200).json({message:"mettre à jour avec succès"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  }).catch(error=>{
    message:"n'a pas pu mettre à jour motDePresident"
  });
}



exports.getMotDePresident=(req,res,next)=>{
  MotDePresident.findById(req.params.id).then(motDePresident => {
    if(motDePresident) {
      res.status(200).json(motDePresident);
    } else {
      res.status(404).json({message:'MotDePresident pas trouvé'});
    }
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}
