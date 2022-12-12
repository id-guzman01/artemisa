const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


const usuarios = require('./src/rutas/usuarios.rutas.js');
const productos = require('./src/rutas/productos.rutas.js');
const inventario = require('./src/rutas/inventario.rutas.js');

app.use('/api/usuarios', usuarios);
app.use('/api/productos', productos);
app.use('/api/inventario', inventario);


var port = 3000; 
app.set('port', port);

app.listen(app.get('port'), ()=>{ 
    console.log('Active web service on the port', app.get('port'));
});

