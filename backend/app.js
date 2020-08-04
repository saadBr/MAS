const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const playerRoutes = require("./routes/player");
const userRoutes = require("./routes/user");
const staffRoutes = require("./routes/staff");
const comiteRoutes = require("./routes/comite");
const actualiteRoutes = require("./routes/actualite");
const academieRoutes = require("./routes/academie");
const coupeRoutes = require("./routes/coupe");
const sponsorRoutes = require("./routes/sponsor");
const sliderRoutes = require("./routes/slider");
const photoRoutes = require("./routes/photo");
const articleRoutes = require("./routes/article");
const palmaresRoutes = require("./routes/palmares");
const motDePresidentRoutes = require("./routes/motDePresident");
const presentationRoutes = require("./routes/presentation");
mongoose.connect(
  "mongodb+srv://saadelmabrouk:"
  + process.env.MONGO_ATLAS_PW +
  "@players-em7dg.mongodb.net/Dima-Mas?w=majority",{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
  console.log('Connected to database');
})
.catch((error)=>{
  console.log(Error,error.message);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept,Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATH, DELETE, PUT, OPTIONS")
  next();
});

app.use("/players",playerRoutes);
app.use("/user",userRoutes)
app.use("/staffs",staffRoutes);
app.use("/comites",comiteRoutes);
app.use("/actualites",actualiteRoutes);
app.use("/academies",academieRoutes);
app.use("/coupes",coupeRoutes);
app.use("/sponsors",sponsorRoutes);
app.use("/sliders",sliderRoutes);
app.use("/photos",photoRoutes);
app.use("/articles",articleRoutes);
app.use("/palmaress",palmaresRoutes);
app.use("/motDePresidents",motDePresidentRoutes);
app.use("/presentations",presentationRoutes);

module.exports = app;
