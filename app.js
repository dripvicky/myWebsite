const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const data = require('./default/defaultData')
const products = require('./model/model.js')
const users = require('./model/usermodel.js')

const port = process.env.PORT || 2000
const database = process.env.DATABASE
mongoose.connect(database)
.then(()=>console.log('connected'))
.catch(()=>console.log('failed'))

const app =  express()

app.use(express.json())
app.use(cors())

app.get('/',async (req,res)=>{
    const items = await products.find()
    res.json(items)
})

app.post('/signup', async (req,res)=>{
    const {name,email,password} = req.body
    await users.findOne({email:email})
    .then(async (user)=>{
        if(user){
            res.json('user existed')
        }else{
            const hashpass = await bcrypt.hash(password,10)
            await users.insertMany({name,email,password:hashpass})
            .then(()=>res.json('added'))
            .catch((e)=>res.json('failed'))
        }
    })
    .catch((e)=>res.json(e))
})

app.post('/signin',async (req,res)=>{
    const {email,password} = req.body
    await users.findOne({email:email})
    .then(async (user)=>{
        if(user){
            const match = await bcrypt.compare(password,user.password)
            if((email === user.email) && match ){
                res.json('signin')
            }else{
                res.json('wrong password')
            }
        }else{
            res.json('user not exist')
        }
    })
    .catch((e)=>res.json(e))
})

app.listen(port,()=>{
    console.log('server start')
})

data();