
const Player=require("../models/player");

exports.createPlayer=(req,res,next)=>{
  const url = req.protocol+'://'+ req.get("host");
  const player = new Player({
    nom: req.body.nom,
    poste: req.body.poste,
    imagePath: url + "/images/"+req.file.filename,
    creator:req.userData.userId
  });
  player.save().then(result=>{
    res.status(201).json({
      message:"Player ajouté avec succès",
      player: {
        ...result,
        id:result._id
      }
  });
}).catch(error=>{
  console.log(error);
  res.status(500).json({
    message:"La creation d'un joueur a échoué"
  })
});
}

exports.updatePlayer=(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol+'://'+ req.get("host");
    imagePath = url+ "/images/"+req.file.filename;
  }
  const player = new Player({
    _id: req.body.id,
    nom: req.body.nom,
    poste: req.body.poste,
    imagePath: imagePath,
    creator:req.userData.userId
  });
  Player.updateOne({_id:req.params.id,creator:req.userData.userId},player).then(result=>{
    if(result.n>0){
      res.status(200).json({message:"mettre à jour avec succès"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  }).catch(error=>{
    message:"n'a pas pu mettre à jour player"
  });
}

exports.deletePlayer=(req,res,next)=>{
  Player.deleteOne({_id: req.params.id,creator:req.userData.userId})
  .then(result =>{
    console.log(result)
    if(result.n>0){
      res.status(200).json({message:"player supprimé"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  })
  .catch(error=>{
    res.status(401).json({message:"n'a pas pu supprimer player"});
  });
}

exports.getPlayers=(req,res,next) => {
  const pageSize= +req.query.pagesize;
  const currentPage = +req.query.page;
  const playerQuery= Player.find().sort({poste:-1});
  let fetchedPlayers;
  if(pageSize && currentPage) {
    playerQuery
    .skip(pageSize * (currentPage-1)).limit(pageSize);
  }
  playerQuery
  .then(documents=>{
    fetchedPlayers=documents;
    return Player.collection.countDocuments();
  }).then(count=>{
    res.status(200).json({message:'Récupéré avec succès',players:fetchedPlayers,maxPlayers:count});
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}

exports.getPlayer=(req,res,next)=>{
  Player.findById(req.params.id).then(player => {
    if(player) {
      res.status(200).json(player);
    } else {
      res.status(404).json({message:'Player pas trouvé'});
    }
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}
