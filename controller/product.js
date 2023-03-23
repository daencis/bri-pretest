const Product = require('../models').data_product;
const Sequelize = require('sequelize');

exports.getListProduct =  async function (req, res, next) {
    try {
        const limit = (req.query.limit) ? Number(req.query.limit) : 10
        const page = (req.query.page) ? Number(req.query.page) : 1

        const {count, rows} = await Product.findAndCountAll({
            offset: (page - 1) * limit,
            limit: limit
        });

        res.status(200).json({
            ResponseCode: '00',
            ResponseDesc: "Aquired data success",
            data: {
                total: count,
                page: page,
                pages: (count == 0) ? 1 : Math.ceil(count / limit),
                result: rows
            }
        });
    } catch (error) {
        next(error)
    }
}

exports.createProduct =  async function (req, res, next) {
    try {
        const newProduct = await Product.create(req.body);

        res.status(201).json({
            ResponseCode: '00',
            ResponseDesc: "Creating data success",
            data: newProduct
        });
    } catch (err) {
        next(err); 
    }
}

exports.updateProduct =  async function (req, res, next) {
    try {
        const product = await Product.findByPk(req.body.product_id);

        if(!product){
            next({name: "NotFound"})
        }
      
        await product.update(req.body)
        await product.save()

        res.status(201).json({
            ResponseCode: '00',
            ResponseDesc: "Updating data success",
            data: product
        });
    } catch (err) {
        next(err); 
    }
}

exports.deleteProduct =  async function (req, res, next) {
    try {
        const product = await Product.findByPk(req.body.product_id);

        if(!product){
            next({name: "NotFound"})
          }
      
        await product.destroy()

        res.status(200).json({ResponseCode: '00', ResponseDesc: "Deleting data success"});
    } catch (err) {
        next(err); 
    }
}