const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

require("./db/conn");
const Register = require("./models/reg");


const path1 = path.join(__dirname,"../public");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path1));
// app.set('view engine', 'ejs');
app.set("view engine",'hbs');
app.engine('hbs', require('hbs').__express);


app.get("/" , (req,res) => {
    res.render("index")
});



app.get("/signup" , (req,res) => {
    res.render("signup");
});

app.get("/login" , (req,res) => {
    res.render("login");
});

app.use(bodyParser.json());

app.post("/signup" , async (req,res)=>{
    try {
        const { firstName,lastName,gender,email,mobileNumber,username,password,confirmPassword } = req.body;
        const registeruser = new Register({
            firstname:req.body.firstName,
            lastname:req.body.lastName,
            gender:req.body.gender,
            email:req.body.email,
            phone:req.body.mobileNumber,
            username:req.body.username,
            password:req.body.password,
            confirmpassword:req.body.confirmPassword,
        })

        const data = await registeruser.save();
        res.json({message:'Data received successfully'});
            
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: `There is some error try again !!` });
    }
})

app.post("/login" , async(req,res) => {
    try{
        const {username,password} = req.body;
        const use =  await Register.findOne({username})
        if(use.password === password)
        {
            res.status(201).render("index1" , {use})
        }
        else{
            res.send("Invalid !!");
        }
    } catch(err){
        res.status(400).send("invalid")
    }
});


app.get("/index1" , (req,res) => {
    try {
        res.render("index1")
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () =>{
    console.log(`server is running at port no ${port}`);
});