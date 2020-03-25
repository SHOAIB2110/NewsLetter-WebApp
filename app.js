const express=require("express");//including express in our site
const bodyParser=require("body-parser");//to connect our html file to server
const request=require("request");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));//to link css and imagees to uor srver

app.get("/",function(req,res){//linking of index.htmll and webserver
  res.sendFile(__dirname+"/signup.html" );
});

app.post("/",function(req,res){
  var fName=req.body.fName;
  var lName=req.body.lName;
  var email=req.body.eMail;
var data={
  members:[
    {email_address:email,
    status:"subscribed",
  merge_fields:{
    FNAME:fName,
    LNAME:lName
  }}
  ]
};
var jsonData=JSON.stringify(data);
  //console.log(fName,lName,email);

var options={
  url:"https://us19.api.mailchimp.com/3.0/lists/838c7d4688",
  method:"POST",
  headers:{
    "Authorization":"shoaib 4916c47e10c16a5a44d7786d9664c7cb-us19 "
  },
  body:jsonData
};

  request(options, function(error,response,body){

  if (error){
    res.sendFile(__dirname+"/failure.html" );
  }
  else{if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html" );}
       else{
         res.sendFile(__dirname+"/failure.html" );
       }
  }



});
});
app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT||3000,function(){//listen that our server is ready to host
  console.log("Server  is runing on port 3000");
});
//4916c47e10c16a5a44d7786d9664c7cb-us19
//838c7d4688
