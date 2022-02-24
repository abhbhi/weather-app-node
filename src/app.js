const express= require("express")
const path =require("path")
const hbs=require('hbs')
const { query } = require("express")
const geocode=require('./utils/geocode')


const app= express()
//Setting Up paths for express config
const publicPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//setup hbs engine and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Avi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:"This is help text",
        title:'Help',
        name:'Avi'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{name, temp})=>{
        if(error)
            return res.send({error})
        else 
        return res.send({name,temp})
    })
//     res.send({
//         forecast:'It is dawn',
//         location:'Gharota',
//         address:req.query.address
//     })
 })

app.get('/one',(req,res)=>{
    res.send("hello one")
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000,()=>{
    console.log("server is at 3000")
})

