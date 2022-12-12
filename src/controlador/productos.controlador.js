
const conexion = require('../Database/conexion.mysql.js');

const selectProducts = (req, res) => {

    conexion.query('Select * from producto', function (err, result, fields) {
        if (err){

          res.json('Actualmente la base de datos está presentando inconveniente, intente más tarde.');

        }else{

                res.status(200).json(result);

        }

      });

}

const selectProductWith = (req,res) => {

    try {
        
        conexion.query('select id_producto, nombre, precio, imagen, categoria, id_categoria, nombre_categoria from producto, categoria where categoria = id_categoria', function (err, result, fields) {
    
                    res.status(200).json(result);

          });

    } catch (error) {
        
        res.json('Actualmente la base de datos no se encuentra funcionando, intente más tarde.');

    }

}

const selectOneProduct = (req,res) => {

    try {

        const { id_producto } = req.body;
        
        conexion.query('select id_producto, nombre, precio, imagen, categoria, id_categoria, nombre_categoria from producto, categoria where categoria = id_categoria and id_producto = ?',[id_producto], function (err, result, fields) {
    
                    res.status(200).json(result);

          });

    } catch (error) {
        
        res.json('Actualmente la base de datos no se encuentra funcionando, intente más tarde.');

    }

}


const selectCategory = (req, res) => {

    try {
        
        conexion.query('select * from categoria', function (err, result, fields) {
    
            if (err){

                res.json('Actualmente la base de datos está presentando inconveniente, intente más tarde.');
      
              }else{
                        
                      res.status(200).json(result);
      
              }

        });

    } catch (error) {
     
        res.json('Actualmente la base de datos no se encuentra funcionando, intente más tarde.');

    }

}

const deleteProduct = (req, res) => {

    try {
        
        const { id_producto } = req.body;
        const codigo_producto = id_producto;
        conexion.query('delete from inventario where codigo_producto = ?',[codigo_producto], function (err, result, fields) {
    
            if (err){

                res.json('Actualmente la base de datos está presentando inconveniente, intente más tarde.');
      
              }else{
      
                    conexion.query('delete from producto where id_producto = ?',[id_producto], function (err, result, fields) {
        
                        if (err){
            
                            res.json('Actualmente la base de datos está presentando inconveniente, intente más tarde.');
                
                        }else{
                
                                res.status(200).json("Producto eliminado con exito");
                
                        }
            
                    });
      
              }

        });


    } catch (error) {
        
        res.json('Actualmente la base de datos no se encuentra funcionando, intente más tarde.');

    }

}


const updateProductNoImg = (req, res) => {

    try {
        const { id_producto, nombre, precio, categoria } = req.body;
        conexion.query('update producto set nombre = ?, precio = ?, categoria = ? where id_producto = ?',[nombre, precio, categoria, id_producto], function (err, result, fields) {

            if (err){
            
                res.json('Actualmente la base de datos está presentando inconveniente, intente más tarde.');
    
            }else{

                res.status(200).json("Producto actualizado con exito");

            }

        });

    } catch (error) {
        
        res.json('Actualmente la base de datos no se encuentra funcionando, intente más tarde.');

    }

}



module.exports = {

    selectProducts,
    selectProductWith,
    selectOneProduct,
    selectCategory,
    deleteProduct,
    updateProductNoImg

}