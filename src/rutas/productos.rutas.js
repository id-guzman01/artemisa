const express = require('express');
const router = express.Router();

const multer = require('multer');

const conexion = require('../Database/conexion.mysql.js');

const { selectProducts, selectProductWith, selectOneProduct, selectCategory, deleteProduct, updateProductNoImg } = require('../controlador/productos.controlador');

router.get('/selectProducts', selectProducts);
router.get('/selectProductWith', selectProductWith);
router.post('/selectOneProduct', selectOneProduct);
router.get('/selectCategory', selectCategory);
router.post('/deleteProduct', deleteProduct);
router.post('/updateProductNoImg', updateProductNoImg);


var storage = multer.diskStorage({
    /*destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },*/
    filename: (req, file, callBack) => {
        callBack(null, file.fileRaw + '-' + Date.now() + ".jpg");
    }
})
 
var upload = multer({
    storage: storage
});

router.post('/createProduct', upload.single('file'),  async (req, res) => {

   try {
    
    const fs = require('fs');
    var imagen = fs.readFileSync(req.file.path);

    const {id_producto, nombre, precio, categoria, existencias_iniciales } = req.body;
        
    conexion.query('insert into producto (id_producto, nombre, precio, imagen, categoria) values (?,?,?,?,?)',[id_producto,nombre, precio,imagen, categoria], function (err, result, fields) {

        if (err){

            res.json('Actualmente la base de datos no se encuentra funcionando, intente más tarde.');

          }else{


                    const codigo_producto = id_producto;
                    const descripcion = nombre;
                    const entradas = 0;
                    const salidas = 0;
                    const stock = existencias_iniciales;

                    conexion.query('insert into inventario (codigo_producto, descripcion, existencias_iniciales, entradas, salidas, stock) values (?,?,?,?,?,?)',[codigo_producto, descripcion, existencias_iniciales, entradas, salidas, stock], function (err, result, fields) {

                        if (err){

                            res.json('Actualmente la base de datos no se encuentra funcionando, intente más tarde.');

                        }else{

                            res.status(200).json('El producto se registro con exito');

                        }

                    });

                


          }

      });


   } catch (error) {
        res.json('La base de datos no se encuentra disponible actualmente, intente más tarde.'); 
   } 


});


router.post('/updateProduct', upload.single('file'),  async (req, res) => {

     try {
        
        const fs = require('fs');
        var imagen = fs.readFileSync(req.file.path);
    
        const {id_producto} = req.body;
            
        conexion.query('update producto set imagen = ? where id_producto = ?',[imagen, id_producto], function (err, result, fields) {
    
            if (err){

                res.json('Actualmente la base de datos no se encuentra funcionando, intente más tarde.');

            }else{

                res.status(200).json('El producto se actualizó con éxito');

            }

        });

     } catch (error) {
        
        res.json('La base de datos no se encuentra disponible actualmente, intente más tarde.'); 

     }

    });


module.exports = router;