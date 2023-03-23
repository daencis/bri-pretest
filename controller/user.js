const User = require('../models').data_user;
const Sequelize = require('sequelize');

exports.getListUser =  async function (req, res, next) {
    try {
        const limit = (req.query.limit) ? Number(req.query.limit) : 10
        const page = (req.query.page) ? Number(req.query.page) : 1

        const {count, rows} = await User.findAndCountAll({
            offset: (page - 1) * limit,
            limit: limit
        });

        res.status(200).json({
            ResponseCode: '00',
            message: "Aquired data success",
            data: {
                total: count,
                page: page,
                pages: (count == 0) ? 1 : Math.ceil(count / limit),
                result: rows
            }
        });
    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.createUser =  async function (req, res, next) {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            ResponseCode: '00',
            message: "Creating data success",
            data: newUser
        });
    } catch (err) {
        next(err); 
    }
}

exports.updateUser =  async function (req, res, next) {
    try {
        const user = await User.findByPk(req.body.user_id);

        if(!user){
            next({name: "NotFound"})
        }
      
        await user.update(req.body)
        await user.save()

        res.status(201).json({
            ResponseCode: '00',
            message: "Updating data success",
            data: user
        });
    } catch (err) {
        next(err); 
    }
}

exports.deleteUser =  async function (req, res, next) {
    try {
        const user = await User.findByPk(req.body.user_id);

        if(!user){
            next({name: "NotFound"})
          }
      
        await user.destroy()

        res.status(200).json({ResponseCode: '00', message: "Deleting data success"});
    } catch (err) {
        next(err); 
    }
}