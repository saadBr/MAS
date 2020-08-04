
const Article=require("../models/article");

exports.createArticle=(req,res,next)=>{
  const url = req.protocol+'://'+ req.get("host");
  const article = new Article({
    designation: req.body.designation,
    prix: req.body.prix,
    imagePath: url + "/images/"+req.file.filename,
    creator:req.userData.userId
  });
  article.save().then(result=>{
    res.status(201).json({
      message:"Article ajouté avec succès",
      article: {
        ...result,
        id:result._id
      }
  });
}).catch(error=>{
  console.log(error);
  res.status(500).json({
    message:"La creation d'un article a échoué"
  })
});
}

exports.updateArticle=(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol+'://'+ req.get("host");
    imagePath = url+ "/images/"+req.file.filename;
  }
  const article = new Article({
    _id: req.body.id,
    designation: req.body.designation,
    prix: req.body.prix,
    imagePath: imagePath,
    creator:req.userData.userId
  });
  Article.updateOne({_id:req.params.id,creator:req.userData.userId},article).then(result=>{
    if(result.n>0){
      res.status(200).json({message:"mettre à jour avec succès"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  }).catch(error=>{
    message:"n'a pas pu mettre à jour article"
  });
}

exports.deleteArticle=(req,res,next)=>{
  Article.deleteOne({_id: req.params.id,creator:req.userData.userId})
  .then(result =>{
    console.log(result)
    if(result.n>0){
      res.status(200).json({message:"article supprimé"});
    }
    else{
      res.status(401).json({message:"Pas autorisé"});
    }
  })
  .catch(error=>{
    res.status(401).json({message:"n'a pas pu supprimer article"});
  });
}

exports.getArticles=(req,res,next) => {
  const pageSize= +req.query.pagesize;
  const currentPage = +req.query.page;
  const articleQuery= Article.find();
  let fetchedArticles;
  if(pageSize && currentPage) {
    articleQuery
    .skip(pageSize * (currentPage-1)).limit(pageSize);
  }
  articleQuery
  .then(documents=>{
    fetchedArticles=documents;
    return Article.collection.countDocuments();
  }).then(count=>{
    res.status(200).json({message:'Récupéré avec succès',articles:fetchedArticles,maxArticles:count});
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}

exports.getArticle=(req,res,next)=>{
  Article.findById(req.params.id).then(article => {
    if(article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({message:'Article pas trouvé'});
    }
  }).catch(error=>{
    message:"échec de la récupération!"
  });
}
