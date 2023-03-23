// const app = require('express').Router();
const controller = require('../controller/product');
module.exports = (app) => {
    app.get('/product/list', controller.getListProduct)
    app.post('/product/create', controller.createProduct)
    app.patch('/product/update', controller.updateProduct)
    app.delete('/product/delete', controller.deleteProduct)
}

// module.exports = app