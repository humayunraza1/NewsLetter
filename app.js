const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();


app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const email = req.body.email;
    const firstName = req.body.Fname;
    const lastName = req.body.Lname;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }              
            }
        ]
    }

    const jsonData  = JSON.stringify(data);    
    const url = "https://us11.api.mailchimp.com/3.0/lists/c3755aad20";
    const options = {
        method: "POST",
        auth: "humayun:a8c52b00ad50923ec4edafb5f4993695-us11"
    }

    const request = https.request(url,options,function(response){
       if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
       }

        response.on("data",function(data){
            console.log(JSON.parse(data));
            })
    })

    request.write(jsonData);
    request.end();
})

app.listen(process.env.PORT || 3000, function(req,res){
    console.log("server started on port 3000");
})

//a8c52b00ad50923ec4edafb5f4993695-us11
//c3755aad20