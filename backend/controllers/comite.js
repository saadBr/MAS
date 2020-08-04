
const Comite=require("../models/comite");

exports.createComite=(req,res,next)=>{
  const url = req.protocol+'://'+ req.get("host");
  const comite = new Comite({
    nom: req.body.nom,
    role: req.body.role,
    imagePath: url + "/images/"+req.file.filename,
    creator:req.userData.userId
  });
  comite.save().then(result=>{
    res.status(201).json({
      message:"Comite ajouté avec succès",
      comite: {
        ...result,
        id:result._id
      }
  });
}).catch(error=>{
  console.log(error);
  res.status(500).json({
    message:"La creation d'une comite a échoué"
  })
});
}

exports.updateComite=(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol+'://'+ req.get("host");
    imagePath = url+ "/images/"+req.file.filename;
  }
  const comite = new Comite({
    _id: req.body.id,
    nom: req.body.nom,
    role: req.body.role,
    imagePath: imagePath,
    creator:req.userData.userId
  });
  Comite.updateOne({_id:req.params.id,creator:req.userData.userId},comite).then(result=>{
    if(result.n>0){
      res.status(200).json({message:"mettre à jour avec succès"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  }).catch(error=>{
    message:"n'a pas pu mettre à jour comite"
  });
}

exports.deleteComite=(req,res,next)=>{
  Comite.deleteOne({_id: req.params.id,creator:req.userData.userId})
  .then(result =>{
    console.log(result)
    if(result.n>0){
      res.status(200).json({message:"comite supprimé"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  })
  .catch(error=>{
    res.status(401).json({message:"n'a pas pu supprimer comite"});
  });
}

exports.getComites=(req,res,next) => {
  const pageSize= +req.query.pagesize;
  const currentPage = +req.query.page;
  const comiteQuery= Comite.find();
  let fetchedComites;
  if(pageSize && currentPage) {
    comiteQuery
    .skip(pageSize * (currentPage-1)).limit(pageSize);
  }
  comiteQuery
  .then(documents=>{
    fetchedComites=documents;
    return Comite.collection.countDocuments();
  }).then(count=>{
    res.status(200).json({message:'Récupéré avec succès',comites:fetchedComites,maxComites:count});
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}

exports.getComite=(req,res,next)=>{
  Comite.findById(req.params.id).then(comite => {
    if(comite) {
      res.status(200).json(comite);
    } else {
      res.status(404).json({message:'Comite pas trouvé'});
    }
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}
