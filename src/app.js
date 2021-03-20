const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");



require("./db/conn");
const SignUp = require("./models/signUps");

const port = process.env.PORT  || 3000;

const static_path = path.join(__dirname,"../public");

const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");
//console.log(path.join(__dirname))

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) =>{
    res.render("index")
});


app.get("/signUp", (req, res) =>{
    res.render("signUp")
});

app.get("/login", (req, res) =>{
    res.render("login")
});

app.post("/signUp", async(req, res) =>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if( password === cpassword){
            const resgisternew = new SignUp({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword,
                phoneno : req.body.phoneno,
                DoB : req.body.DoB,
                photo : req.body.DoB
            })

            const registerd = await resgisternew.save();
            res.status(201).render("index");
        }
        else{
            res.send("password are not matching");
        }

    }catch(error) {
        res.status(400).send(error);
    }
})

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})