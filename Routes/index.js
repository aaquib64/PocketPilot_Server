const express = require ('express');

const router = express.Router();

const controller = require('../Controller/index')

router.get("/Expenses", controller.getListofExpense);


module.exports = router;