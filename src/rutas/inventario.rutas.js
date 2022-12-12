const express = require('express');
const router = express.Router();

const { selectInventary, selectOne, editEntradas, editSalidas, editInicial } = require('../controlador/inventario.controlador.js');

router.get('/selectInventary', selectInventary);   
router.post('/selectOne', selectOne);
router.post('/editEntradas', editEntradas);
router.post('/editSalidas', editSalidas);
router.post('/editInicial', editInicial);


module.exports = router;