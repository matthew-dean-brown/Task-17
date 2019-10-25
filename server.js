const express = require('express')
const app = express()
const fs = require('fs');
const helmet = require('helmet')
let web_projects = require('./web_projects.json')
const path = require('path')
const cors = require("cors")
app.use(cors())
app.use(helmet())

// this returns the array
app.get('/api', function(req,res){
    res.send(web_projects)
})

// this posts and adds the web project to the json file
app.post('/api',function(req,res){
    let s = {
        "id": parseInt(req.query.id),
        "title": `${req.query.title}` ,
        "description": `${req.query.description}`,
        "URL": `${req.query.URL}`
    };
    web_projects.push(s);
    fs.writeFile("./web_projects.json", JSON.stringify(web_projects), err =>{
        if (err){
            res.send('File not created')
        }
        res.send('File created')
        
    });
});

app.put('/api',(req,res)=>{
    web_projects.forEach( p => {
        // checking to see if data was being passed
        console.log(p)
        // checks for corresponding id and if there is a value of a string(this makes sure that data isn't overwritten)
        if (p.id == req.query.id && "string" === typeof(req.query.title)){
            if(req.query.title === ""){
                p.title = p.title
            } else {
                p.title = req.query.title
            }
        }
        if (p.id == req.query.id && "string" === typeof(req.query.description)){
            if (req.query.description === ""){
                p.description = p.description
            } else{
                p.description = req.query.description
            }
        }
    });
    fs.writeFile('web_projects.json', JSON.stringify(web_projects), err => {
        if (err){
            res.send('File not updated')
        }
        res.send('File updated')
    })
    
})

app.delete('/api', (req,res) => {
    // checks through array fpor appropriate id
    web_projects = web_projects.filter( objects =>{
        return objects.id !== parseInt(req.query.id)
    })
    fs.writeFile('web_projects.json', JSON.stringify(web_projects), err =>{
        if (err){
            res.send('File not deleted')
        }
        res.send('File deleted')
    })
})

const Port = process.env.Port || 8080;
app.listen(Port)

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static('frontend/build'));
    // Handle React routing, return all requests to React app
    app.get('/', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}