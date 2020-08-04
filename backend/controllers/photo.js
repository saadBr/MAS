
const Photo=require("../models/photo");

exports.createPhoto=(req,res,next)=>{
  const url = req.protocol+'://'+ req.get("host");
  const photo = new Photo({
    description: req.body.description,
    imagePath: url + "/images/"+req.file.filename,
    creator:req.userData.userId
  });
  photo.save().then(result=>{
    res.status(201).json({
      message:"Photo ajouté avec succès",
      photo: {
        ...result,
        id:result._id
      }
  });
}).catch(error=>{
  console.log(error);
  res.status(500).json({
    message:"La creation d'une photo a échoué"
  })
});
}

exports.updatePhoto=(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol+'://'+ req.get("host");
    imagePath = url+ "/images/"+req.file.filename;
  }
  const photo = new Photo({
    _id: req.body.id,
    description: req.body.description,
    imagePath: imagePath,
    creator:req.userData.userId
  });
  Photo.updateOne({_id:req.params.id,creator:req.userData.userId},photo).then(result=>{
    if(result.n>0){
      res.status(200).json({message:"mettre à jour avec succès"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  }).catch(error=>{
    message:"n'a pas pu mettre à jour photo"
  });
}

exports.deletePhoto=(req,res,next)=>{
  Photo.deleteOne({_id: req.params.id,creator:req.userData.userId})
  .then(result =>{
    console.log(result)
    if(result.n>0){
      res.status(200).json({message:"photo supprimé"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  })
  .catch(error=>{
    res.status(401).json({message:"n'a pas pu supprimer photo"});
  });
}

exports.getPhotos=(req,res,next) => {
  const pageSize= +req.query.pagesize;
  const currentPage = +req.query.page;
  const photoQuery= Photo.find().sort({_id:-1});
  let fetchedPhotos;
  if(pageSize && currentPage) {
    photoQuery
    .skip(pageSize * (currentPage-1)).limit(pageSize);
  }
  photoQuery
  .then(documents=>{
    fetchedPhotos=documents;
    return Photo.collection.countDocuments();
  }).then(count=>{
    res.status(200).json({message:'Récupéré avec succès',photos:fetchedPhotos,maxPhotos:count});
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}

exports.getPhoto=(req,res,next)=>{
  Photo.findById(req.params.id).then(photo => {
    if(photo) {
      res.status(200).json(photo);
    } else {
      res.status(404).json({message:'Photo pas trouvé'});
    }
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}
