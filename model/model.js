const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    id:String,
    name:String,
    price:String,
    rating:String,
    review:String,
    desc:String,
    img:String,
    category:String
})

const products = mongoose.model('product',schema)

module.exports = products;