const express = require('express');
const hbs = require('hbs');
const fs = require('fs'); 

const app=express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = now+" "+req.method+" "+req.path;
    fs.appendFile('server.log',log+'\n',err=>{
        if(err) console.log(err);
    })
    next();
})

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'Welcome to my Website',
    })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:"About page", 
    });
})

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle:"Projects"
    })
})

app.get('/bad',(req,res)=>{
    res.send({
        errormessage:"Unable to send message"
    })
})

app.listen(process.env.PORT || 3100,()=>{
    console.log("Server started");
});