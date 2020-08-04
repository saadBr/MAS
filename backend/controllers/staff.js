
const Staff=require("../models/staff");

exports.createStaff=(req,res,next)=>{
  const url = req.protocol+'://'+ req.get("host");
  const staff = new Staff({
    nom: req.body.nom,
    role: req.body.role,
    imagePath: url + "/images/"+req.file.filename,
    creator:req.userData.userId
  });
  staff.save().then(result=>{
    res.status(201).json({
      message:"Staff ajouté avec succès",
      staff: {
        ...result,
        id:result._id
      }
  });
}).catch(error=>{
  console.log(error);
  res.status(500).json({
    message:"La creation d'un staff a échoué"
  })
});
}

exports.updateStaff=(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol+'://'+ req.get("host");
    imagePath = url+ "/images/"+req.file.filename;
  }
  const staff = new Staff({
    _id: req.body.id,
    nom: req.body.nom,
    role: req.body.role,
    imagePath: imagePath,
    creator:req.userData.userId
  });
  Staff.updateOne({_id:req.params.id,creator:req.userData.userId},staff).then(result=>{
    if(result.n>0){
      res.status(200).json({message:"mettre à jour avec succès"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  }).catch(error=>{
    message:"n'a pas pu mettre à jour staff"
  });
}

exports.deleteStaff=(req,res,next)=>{
  Staff.deleteOne({_id: req.params.id,creator:req.userData.userId})
  .then(result =>{
    console.log(result)
    if(result.n>0){
      res.status(200).json({message:"staff supprimé"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  })
  .catch(error=>{
    res.status(401).json({message:"n'a pas pu supprimer staff"});
  });
}

exports.getStaffs=(req,res,next) => {
  const pageSize= +req.query.pagesize;
  const currentPage = +req.query.page;
  const staffQuery= Staff.find();
  let fetchedStaffs;
  if(pageSize && currentPage) {
    staffQuery
    .skip(pageSize * (currentPage-1)).limit(pageSize);
  }
  staffQuery
  .then(documents=>{
    fetchedStaffs=documents;
    return Staff.collection.countDocuments();
  }).then(count=>{
    res.status(200).json({message:'Récupéré avec succès',staffs:fetchedStaffs,maxStaffs:count});
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}

exports.getStaff=(req,res,next)=>{
  Staff.findById(req.params.id).then(staff => {
    if(staff) {
      res.status(200).json(staff);
    } else {
      res.status(404).json({message:'Staff pas trouvé'});
    }
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}
