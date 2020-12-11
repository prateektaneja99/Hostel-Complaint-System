const express = require('express');
var app = express();  //  used to define the routes
const bodyParser = require('body-parser');   // for parsing the json from the response
const port 	     = process.env.PORT || 8080;  // either any port or 8080 for localhost 
const register = require('./signup');       // including all the schemas and handlebars
const user = require('./userSchema');
const resume = require('./resumeData');
const details = require('./details');
// const request = require('./reqSchema');
// const admin = require('./admin');
// const apply = require('./complaint');
const exphbs = require('express-handlebars');
app.use(express.static('public'));  // fetch all the static files/images fromm public folder
app.use( bodyParser.json() );  // we;ll use body parser to have json files
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({     // setting the extension to be handlebars 
}));
app.set('view engine','handlebars');

app.get('/signup', function (req, res) {
    res.render('signup');
})

app.get('/', function(req,res){
    res.render('home');
});

app.get('/login', function(req,res){
    res.render('login');
});

app.get('/template1',function(req,res){
    res.render('template1');
});

app.get('/template2',function(req,res){
    res.render('template2');
});

app.get('/template3', function(req,res){
    res.render('template3');
});

app.get('/summary', function(req,res){
    res.render('summary');
});

app.get('/skills', function(req,res){
    res.render('skills');
});

app.get('/projects', function(req,res){
    res.render('projects');
});

app.get('/personal', function(req,res){
    res.render('personal');
});

app.get('/experience', function(req,res){
    res.render('experience');
});

app.get('/education', function(req,res){
    res.render('education');
});

app.get('/home', function(req,res){
    res.render('home');
});

app.get('/download', function(req,res){
    res.render('download');
});

app.post('/view1',function(req,res){
    const email = req.body.email1;
    resume.find({email:email})
    .then(requests=>{
        res.render('template1',{
            requests: requests
        });
    });
});

app.post('/view2',function(req,res){
    const email = req.body.email2;
    resume.find({email:email})
    .then(requests=>{
        res.render('template2',{
            requests:requests
        });
    });
});

app.post('/view3', function(req,res){
    const email = req.body.email3;
    resume.find({email:email})
    .then(requests=>{
        res.render('template3',{
            requests:requests
        });
    });
});

app.post('/signup', (req, res) => {
    const regno = req.body.regno;
    const name = req.body.name;
    const pwd = req.body.pwd;
    const gender = req.body.gender;
    const phone = req.body.pno;
    const email = req.body.email;
    register.registerUser(regno, name, pwd, gender, phone, email)
        .then(result => {
            res.setHeader('Location', '/userSchema'+regno);
            res.status(result.status).json({ message: result.message })
           })
        .catch(err => res.status(err.status).json({ message: err.message }));
        res.redirect('/login');
});

//Authenticating the User
app.post('/login', (req, res) => {
        async function checking(){
            const credentials = req.body.email;
            console.log(credentials);
            cred = await user.findOne({email:credentials},{email: 1 , _id:0});
            console.log(cred);
            if(cred==null){
                res.status(401).send("Email id not FOUND !");
            }
            else if (cred.email == credentials) {
                const pwd = req.body.pw;
                veri = await user.findOne({email: credentials, password: pwd },{password:1 , _id:0});
                if(veri==null){
                    res.status(401).send("The Password entered is incorrect!")
                }
                else if(veri.password == pwd){
                    res.send('Hello World !');
                }
            }
        }
        checking();
});

app.post('/resume',(req,res)=>{
    async function check(){
        const summary = req.body.littleSummary;
        const name = req.body.username;
        const email=req.body.email;
        const phone = req.body.number;
        const website = req.body.website;
        const company_name = req.body.company;
        const time = req.body.time;
        const role = req.body.role;
        const company_summary = req.body.summary;
        const project_name = req.body.title;
        const project_website = req.body.web;
        const project_description = req.body.desc;
        const college = req.body.college;
        const degree = req.body.degree;
        const duration = req.body.duration;
        const skills = req.body.skill;
        const vari = await resume.findOne({email:email},{email:1});
        if(vari == null){
            details.register(summary,name,email,phone,website,company_name,time,role,company_summary,project_name,project_website, project_description, college, degree, duration, skills)
            .then(result => {
                res.setHeader('Location', '/userSchema'+email);
                res.status(result.status).json({ message: result.message })
            })
            .catch(err => res.status(err.status).json({ message: err.message }));
            res.redirect('download');
        }else{
            res.send("A resume with this email ID already exists.");
        }
    }
    check();
});

app.listen(port);

console.log(`App Runs on ${port}`);