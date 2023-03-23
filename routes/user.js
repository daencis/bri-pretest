// const app = require('express').Router();
const controller = require('../controller/user');
module.exports = (app) => {
    app.get('/user/list', controller.getListUser)
    app.post('/user/create', controller.createUser)
    app.patch('/user/update', controller.updateUser)
    app.delete('/user/delete', controller.deleteUser)
}

// module.exports = app