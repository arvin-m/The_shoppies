const express=require('express');
const path = require('path');
const env=require('dotenv');
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
  
  // All other routes respond with the index.html file
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

  
app.listen( process.env.PORT || 5000 ,()=>{
    console.log("Server is running ...")
})

