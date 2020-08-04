
const Actualite=require("../models/actualite");

exports.createActualite=(req,res,next)=>{
  const url = req.protocol+'://'+ req.get("host");
  const actualite = new Actualite({
    titre: req.body.titre,
    contenu: req.body.contenu,
    imagePath: url + "/images/"+req.file.filename,
    date: Date.now(),
    creator:req.userData.userId
  });
  actualite.save().then(result=>{
    res.status(201).json({
      message:"Actualite ajouté avec succès",
      actualite: {
        ...result,
        id:result._id
      }
  });
}).catch(error=>{
  console.log(error);
  res.status(500).json({
    message:"La creation d'une actualite a échoué"
  })
});
}

exports.updateActualite=(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol+'://'+ req.get("host");
    imagePath = url+ "/images/"+req.file.filename;
  }
  const actualite = new Actualite({
    _id: req.body.id,
    titre: req.body.titre,
    contenu: req.body.contenu,
    imagePath: imagePath,
    creator:req.userData.userId
  });
  Actualite.updateOne({_id:req.params.id,creator:req.userData.userId},actualite).then(result=>{
    if(result.n>0){
      res.status(200).json({message:"mettre à jour avec succès"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  }).catch(error=>{
    message:"n'a pas pu mettre à jour actualite"
  });
}

exports.deleteActualite=(req,res,next)=>{
  Actualite.deleteOne({_id: req.params.id,creator:req.userData.userId})
  .then(result =>{
    console.log(result)
    if(result.n>0){
      res.status(200).json({message:"actualite supprimé"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  })
  .catch(error=>{
    res.status(401).json({message:"n'a pas pu supprimer actualite"});
  });
}

exports.getActualites=(req,res,next) => {
  const pageSize= +req.query.pagesize;
  const currentPage = +req.query.page;
  const actualiteQuery= Actualite.find().sort({date:-1});
  let fetchedActualites;
  if(pageSize && currentPage) {
    actualiteQuery
    .skip(pageSize * (currentPage-1)).limit(pageSize);
  }
  actualiteQuery
  .then(documents=>{
    fetchedActualites=documents;
    return Actualite.collection.countDocuments();
  }).then(count=>{
    res.status(200).json({message:'Récupéré avec succès',actualites:fetchedActualites,maxActualites:count});
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}

exports.getActualite=(req,res,next)=>{
  Actualite.findById(req.params.id).then(actualite => {
    if(actualite) {
      res.status(200).json(actualite);
    } else {
      res.status(404).json({message:'Actualite pas trouvé'});
    }
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}
