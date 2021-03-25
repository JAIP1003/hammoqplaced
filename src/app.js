const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");



require("./db/conn");

const  Register = require("./models/registers");



const port = process.env.PORT  || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

 app.use(express.json());
 app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) =>{
    res.render("index")
});


app.get("/register", (req, res) =>{
    res.render("register")
});

app.get("/login", (req, res) =>{
    res.render("login")
});

app.post("/register", async(req, res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if( password === cpassword){
            const registernew = new Register({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword,
                phoneno : req.body.phoneno,
                DoB : req.body.DoB,
                photo : req.body.photo
            })
            const registered = await registernew.save();
            res.status(201).render("login");
        }
        else{
            res.send("password are not matching");
        }

    }catch(error) {
        res.status(400).send(error);
    }
})

//   Login check

app.post("/login", async (req, res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        
       const useremail = await Register.findOne({email:email});
       
       if( useremail.password === password && email === useremail.email){
        
        res.status(201).render("show",{
            firstname : useremail.firstname,
            lastname : useremail.lastname,
            email : useremail.email,
            DoB : useremail.DoB,
            photo : useremail.photo
        }); 
                
       }else{
           res.send("invalid details");
       }
    } catch(err){
        res.status(400).send("invalid email")
    }
});

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})