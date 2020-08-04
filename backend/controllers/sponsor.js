
const Sponsor=require("../models/sponsor");

exports.createSponsor=(req,res,next)=>{
  const url = req.protocol+'://'+ req.get("host");
  const sponsor = new Sponsor({
    nom: req.body.nom,
    imagePath: url + "/images/"+req.file.filename,
    creator:req.userData.userId
  });
  sponsor.save().then(result=>{
    res.status(201).json({
      message:"Sponsor ajouté avec succès",
      sponsor: {
        ...result,
        id:result._id
      }
  });
}).catch(error=>{
  console.log(error);
  res.status(500).json({
    message:"La creation d'une sponsor a échoué"
  })
});
}

exports.updateSponsor=(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol+'://'+ req.get("host");
    imagePath = url+ "/images/"+req.file.filename;
  }
  const sponsor = new Sponsor({
    _id: req.body.id,
    nom: req.body.nom,
    imagePath: imagePath,
    creator:req.userData.userId
  });
  Sponsor.updateOne({_id:req.params.id,creator:req.userData.userId},sponsor).then(result=>{
    if(result.n>0){
      res.status(200).json({message:"mettre à jour avec succès"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  }).catch(error=>{
    message:"n'a pas pu mettre à jour sponsor"
  });
}

exports.deleteSponsor=(req,res,next)=>{
  Sponsor.deleteOne({_id: req.params.id,creator:req.userData.userId})
  .then(result =>{
    console.log(result)
    if(result.n>0){
      res.status(200).json({message:"sponsor supprimé"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  })
  .catch(error=>{
    res.status(401).json({message:"n'a pas pu supprimer sponsor"});
  });
}

exports.getSponsors=(req,res,next) => {
  const pageSize= +req.query.pagesize;
  const currentPage = +req.query.page;
  const sponsorQuery= Sponsor.find();
  let fetchedSponsors;
  if(pageSize && currentPage) {
    sponsorQuery
    .skip(pageSize * (currentPage-1)).limit(pageSize);
  }
  sponsorQuery
  .then(documents=>{
    fetchedSponsors=documents;
    return Sponsor.collection.countDocuments();
  }).then(count=>{
    res.status(200).json({message:'Récupéré avec succès',sponsors:fetchedSponsors,maxSponsors:count});
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}

exports.getSponsor=(req,res,next)=>{
  Sponsor.findById(req.params.id).then(sponsor => {
    if(sponsor) {
      res.status(200).json(sponsor);
    } else {
      res.status(404).json({message:'Sponsor pas trouvé'});
    }
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}
