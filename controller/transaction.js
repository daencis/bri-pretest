const Transaction = require('../models').data_transaction;
const Models = require('../models');
const Sequelize = require('sequelize');

exports.getListTransaction =  async function (req, res, next) {
    try {
        const limit = (req.query.limit) ? Number(req.query.limit) : 10
        const page = (req.query.page) ? Number(req.query.page) : 1

        const {count, rows} = await Transaction.findAndCountAll({
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

exports.createTransaction =  async function (req, res, next) {
    try {
        const product = await Models.data_product.findByPk(req.body.product_id);
        req.body.total_order = (req.body.qty_order * product.premium)
        const newTransaction = await Transaction.create(req.body);
        res.status(201).json({
            ResponseCode: '00',
            message: "Creating data success",
            ResponseDesc: `Total order Rp.${newTransaction.total_order}`,
            data: newTransaction
        });
    } catch (err) {
        next(err); 
    }
}

exports.updateTransaction =  async function (req, res, next) {
    try {
        const trans = await Transaction.findByPk(req.body.trans_id);

        if(!trans){
            next({name: "NotFound"})
        }
      
        await trans.update(req.body)
        await trans.save()

        res.status(201).json({
            ResponseCode: '00',
            ResponseDesc: "Updating data success",
            data: trans
        });
    } catch (err) {
        next(err); 
    }
}

exports.deleteTransaction =  async function (req, res, next) {
    try {
        const trans = await Transaction.findByPk(req.body.trans_id);

        if(!trans){
            next({name: "NotFound"})
          }
      
        await trans.destroy()

        res.status(200).json({ResponseCode: '00', ResponseDesc: "Deleting data success"});
    } catch (err) {
        next(err); 
    }
}