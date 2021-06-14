const express=require("express");
const path=require("path");
const app=express();
// const fs=require("fs");
const port=8015;
const mongoose = require('mongoose');
const { stringify } = require("querystring");
const bodyParser=require("body-parser");

//mongo
mongoose.connect('mongodb://localhost/record', {useNewUrlParser: true,useUnifiedTopology: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!');
});



const kittySchema = new mongoose.Schema({
    name: String,
    fn:String,
    aa:Number,
    ac:Number,
    dob:{type:Date},
    gender: {
    type: String,
    enum: ["male", "female","other"]
    },
    adress:String,
    about:String
  });


var student = mongoose.model('student', kittySchema);

//mongo

app.engine('pug', require('pug').__express);
app.use('/static',express.static('static'));
// app.use(express.urlencoded())


app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    const param={ title: 'Hey', message: 'Hello there!' }
    res.render('home.pug',param);
})
app.get('/facility',(req,res)=>{
    res.render('facility.pug');
})
app.get('/student',(req,res)=>{
    res.render('student.pug');
})
app.get('/faculty',(req,res)=>{
    res.render('faculty.pug');
})
app.get('/holiday',(req,res)=>{
    res.render('holiday.pug');
})  

app.post('/student',(req,res)=>{
    var data=new student(req.body);
    data.save().then(()=>{
        res.send("Your form has been successfully submitted");
    }).catch(()=>{
        res.status.send("Error in submitting the form");
    })
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

