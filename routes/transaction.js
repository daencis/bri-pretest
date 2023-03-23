const controller = require('../controller/transaction');
module.exports = (app) => {
    app.get('/transaction/list', controller.getListTransaction)
    app.post('/transaction/create', controller.createTransaction)
    app.patch('/transaction/update', controller.updateTransaction)
    app.delete('/transaction/delete', controller.deleteTransaction)
}