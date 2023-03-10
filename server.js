const express = require('express')
const mongoose = require('mongoose')
const Article =require('./models/article')
const articleRouter=require('./routes/articles')
const methodOverride=require('method-override')
const dotenv= require('dotenv')
const app = express()

require('dotenv').config()
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true})

app.set('view engine','ejs')

app.use(express.urlencoded({extended : false}))
app.use(methodOverride('_method'))

app.get('/',async (req,res)=>{
    const articles= await Article.find().sort({createdAt:'desc'})
    res.render('articles/index',{articles: articles})
})

app.use('/articles',articleRouter)


app.listen(5000)