
const Academie=require("../models/academie");

exports.createAcademie=(req,res,next)=>{
  const url = req.protocol+'://'+ req.get("host");
  const academie = new Academie({
    titre: req.body.titre,
    contenu: req.body.contenu,
    imagePath: url + "/images/"+req.file.filename,
    date: Date.now(),
    creator:req.userData.userId
  });
  academie.save().then(result=>{
    res.status(201).json({
      message:"Academie ajouté avec succès",
      academie: {
        ...result,
        id:result._id
      }
  });
}).catch(error=>{
  console.log(error);
  res.status(500).json({
    message:"La creation d'une academie a échoué"
  })
});
}

exports.updateAcademie=(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol+'://'+ req.get("host");
    imagePath = url+ "/images/"+req.file.filename;
  }
  const academie = new Academie({
    _id: req.body.id,
    titre: req.body.titre,
    contenu: req.body.contenu,
    imagePath: imagePath,
    creator:req.userData.userId
  });
  Academie.updateOne({_id:req.params.id,creator:req.userData.userId},academie).then(result=>{
    if(result.n>0){
      res.status(200).json({message:"mettre à jour avec succès"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  }).catch(error=>{
    message:"n'a pas pu mettre à jour academie"
  });
}

exports.deleteAcademie=(req,res,next)=>{
  Academie.deleteOne({_id: req.params.id,creator:req.userData.userId})
  .then(result =>{
    console.log(result)
    if(result.n>0){
      res.status(200).json({message:"academie supprimé"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  })
  .catch(error=>{
    res.status(401).json({message:"n'a pas pu supprimer academie"});
  });
}

exports.getAcademies=(req,res,next) => {
  const pageSize= +req.query.pagesize;
  const currentPage = +req.query.page;
  const academieQuery= Academie.find().sort({date:-1});
  let fetchedAcademies;
  if(pageSize && currentPage) {
    academieQuery
    .skip(pageSize * (currentPage-1)).limit(pageSize);
  }
  academieQuery
  .then(documents=>{
    fetchedAcademies=documents;
    return Academie.collection.countDocuments();
  }).then(count=>{
    res.status(200).json({message:'Récupéré avec succès',academies:fetchedAcademies,maxAcademies:count});
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}

exports.getAcademie=(req,res,next)=>{
  Academie.findById(req.params.id).then(academie => {
    if(academie) {
      res.status(200).json(academie);
    } else {
      res.status(404).json({message:'Academie pas trouvé'});
    }
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}
