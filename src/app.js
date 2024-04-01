const dotenv = require("dotenv");
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
const hbs = require("hbs");
dotenv.config({path:'../.env'});

const app = express();
const port = process.env.PORT;

require("./db/conn");
const Register = require("./models/reg");


const path1 = path.join(__dirname,"../public");
const path2 = path.join(__dirname,"/views");
const path3 = path.join(__dirname,"/partials");
console.log(__dirname);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path1));
app.set("view engine", "hbs"); 
app.set("views", path2); 

hbs.registerPartials(path3);

app.use(session({
    secret: 'hello',
    resave: false,
    saveUninitialized: true
  }));

var x=0;

const middlware1 = (req,res,next) =>{
    if(x==1) next();
    else {
        res.render("login");
    }
}

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
        const { firstName,lastName,gender,email,mobileNumber,username,password,confirmPassword,country,upiId,accountType } = req.body;
        console.log(upiId);
        if (!upiId) {
            return res.json({ txt: "upiId cannot be null" });
        }
        const collections = await Register.find({}).lean();
        for (const collection of collections) {
            if (collection.email === email) {
                return res.json({ txt: 'This email is already taken, try with another!' });
            }
            if (collection.phone === mobileNumber) {
                return res.json({ txt: 'This mobile number is already taken, try with another!' });
            }
            if (collection.username === username) {
                return res.json({ txt: 'This username is already taken, try with another!' });
            }
        }
        var t1='15',t2;
        if(accountType=="saving"){
            t2='1';
        } else{
            t2='2';
        }
        t3 = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
        const registeruser = new Register({
            firstname:req.body.firstName,
            lastname:req.body.lastName,
            gender,
            email,
            phone:req.body.mobileNumber,
            account_type:req.body.accountType,
            account_num: t1 + t2 + t3,
            upiId,
            balance:Math.floor(Math.random() * (100000 - 1000)) + 1000,
            country,
            username,
            password,
            confirmpassword:req.body.confirmPassword,
        })
        const data = await registeruser.save();
        res.json({txt:'Sign up succesfull, Try to log in now'});
    } catch (error) {
        console.log(error);
        res.json({txt:"Internal server error"})
    }
})

app.post("/login" , async(req,res) => {
    try {
        const { username, password } = req.body;
        const user = await Register.findOne({username});
        const collections = await Register.find({}).lean();
        var fname,lname;
        for (const collection of collections) {
            if (collection.username === username) {
                fname = collection.firstname;
                lname = collection.lastname;
            }
        }
        for(var i=0;i<1;i++)
        {
            if (!user) {
                return res.json({ txt: "Username not found" });
            }
            if (user.password !== password) {
                return res.json({ txt: "Invalid password" });
            } 
            
        }
        req.session.user = user;
        req.session.fname = fname;
        req.session.lname = lname;
        res.json({txt:"sucess"})
    } catch (err) {
        console.error(err);
        res.json({ txt: "Internal server error" });
    }
});


app.get("/index1" , (req,res) => {
    try {
        const user = req.session.user;
        const fname = req.session.fname;
        const lname = req.session.lname;
        res.render("index1", { user,fname,lname });
        x=1;
    } catch (error) {
        console.log(error);
    }
});

app.get("/transfermoney" ,middlware1, (req,res) => {
    try {
        const user = req.session.user;
        res.render("transfermoney",{user});
    } catch (error) {
        console.log(error);
    }
});

app.post("/transfermoney" , (req,res) => {
    try {
        const {accnum,amount,ifsc} = req.body;
        const user = req.session.user;

        res.json({txt:"sucess"})
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () =>{
    console.log(`server is running at port no ${port}`);
});