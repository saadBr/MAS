
const Coupe=require("../models/coupe");

exports.createCoupe=(req,res,next)=>{
  const url = req.protocol+'://'+ req.get("host");
  const coupe = new Coupe({
    titre: req.body.titre,
    nombre: req.body.nombre,
    imagePath: url + "/images/"+req.file.filename,
    creator:req.userData.userId
  });
  coupe.save().then(result=>{
    res.status(201).json({
      message:"Coupe ajouté avec succès",
      coupe: {
        ...result,
        id:result._id
      }
  });
}).catch(error=>{
  console.log(error);
  res.status(500).json({
    message:"La creation d'un coupe a échoué"
  })
});
}

exports.updateCoupe=(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol+'://'+ req.get("host");
    imagePath = url+ "/images/"+req.file.filename;
  }
  const coupe = new Coupe({
    _id: req.body.id,
    titre: req.body.titre,
    nombre: req.body.nombre,
    imagePath: imagePath,
    creator:req.userData.userId
  });
  Coupe.updateOne({_id:req.params.id,creator:req.userData.userId},coupe).then(result=>{
    if(result.n>0){
      res.status(200).json({message:"mettre à jour avec succès"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  }).catch(error=>{
    message:"n'a pas pu mettre à jour coupe"
  });
}

exports.deleteCoupe=(req,res,next)=>{
  Coupe.deleteOne({_id: req.params.id,creator:req.userData.userId})
  .then(result =>{
    console.log(result)
    if(result.n>0){
      res.status(200).json({message:"coupe supprimé"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  })
  .catch(error=>{
    res.status(401).json({message:"n'a pas pu supprimer coupe"});
  });
}

exports.getCoupes=(req,res,next) => {
  const pageSize= +req.query.pagesize;
  const currentPage = +req.query.page;
  const coupeQuery= Coupe.find();
  let fetchedCoupes;
  if(pageSize && currentPage) {
    coupeQuery
    .skip(pageSize * (currentPage-1)).limit(pageSize);
  }
  coupeQuery
  .then(documents=>{
    fetchedCoupes=documents;
    return Coupe.collection.countDocuments();
  }).then(count=>{
    res.status(200).json({message:'Récupéré avec succès',coupes:fetchedCoupes,maxCoupes:count});
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}

exports.getCoupe=(req,res,next)=>{
  Coupe.findById(req.params.id).then(coupe => {
    if(coupe) {
      res.status(200).json(coupe);
    } else {
      res.status(404).json({message:'Coupe pas trouvé'});
    }
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}
