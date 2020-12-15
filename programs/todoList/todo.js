const express = require("express");
const bodyParser = require ("body-parser");

const app = express();

app.set('view engine', 'ejs' );

app.get('/', function (req, res){
    // sends the code to browser
    let today = new Date();

    let options = {
        weekday: "long";
        day: "numeric";
        month: "long";
    };
    let day = today.toLocaleDateString("en-US", options);

    res.render ("List", 
    {kindOfDay: day
    });


});

app.listen(8000, function(){
    console.log("Server started on port 8000") // browser listening 
})