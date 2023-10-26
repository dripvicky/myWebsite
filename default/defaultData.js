const products = require('../model/model.js')
const product = require('../productData.js')


const data = async() => {
    await products.deleteMany({})
    await products.insertMany(product)
}

module.exports = data