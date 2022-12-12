
const conexion = require('../Database/conexion.mysql.js');

const selectInventary = (req, res) => {

    try {
        
        conexion.query('Select * from inventario', function (err, result, fields) {
            if (err){
    
              res.json('Actualmente la base de datos está presentando inconveniente, intente más tarde.');
    
            }else{
    
              res.status(200).json(result);
    
            }
    
          });

    } catch (error) {
        
        res.json('Actualmente la base de datos no se encuentra activa, intente más tarde.');

    }

}





const selectOne = (req, res) => {

  try {
      const { codigo_producto } = req.body;
      conexion.query('Select * from inventario where codigo_producto = ?',[codigo_producto], function (err, result, fields) {
          if (err){
  
            res.json('Actualmente la base de datos está presentando inconveniente, intente más tarde.');
  
          }else{
  
            res.status(200).json(result);
  
          }
  
        });

  } catch (error) {
      
      res.json('Actualmente la base de datos no se encuentra activa, intente más tarde.');

  }

}






const editEntradas = (req, res) => {

    try {
        
        const { codigo_producto, entradas } = req.body;

        conexion.query('select stock, entradas from inventario where codigo_producto = ?',[codigo_producto], function (err, result, fields) {
            if (err){
    
              res.json('Actualmente la base de datos está presentando inconveniente, intente más tarde.');
    
            }else{
    
                    var stock_old = result[0].stock;
                    var entradas_old = result[0].entradas;
                    
                    var stock = 0;

                    if(entradas == 0){

                      stock = parseInt(stock_old) - parseInt(entradas_old);
                      
                    }else if(entradas >= 1){

                        var tempo = parseInt(stock_old) - parseInt(entradas_old);
                        stock = parseInt(tempo) + parseInt(entradas);



                    }

                    

                    conexion.query('update inventario set entradas = ?, stock = ? where codigo_producto = ?',[entradas,stock,codigo_producto], function (err, result, fields) {
                        if (err){
                
                          res.json('Actualmente la base de datos está presentando inconveniente, intente más tarde.');
                
                        }else{
                
                          res.status(200).json('Registro actualizado con exito');
                
                        }
                
                      });
    
            }
    
          });

    } catch (error) {
        
        res.json('Actualmente la base de datos no se encuentra activa, intente más tarde.');

    }

}




const editSalidas = (req, res) => {

  try {
      
      const { codigo_producto, salidas } = req.body;

      conexion.query('select stock, salidas from inventario where codigo_producto = ?',[codigo_producto], function (err, result, fields) {
          if (err){
            
            res.json('Actualmente la base de datos está presentando inconveniente, intente más tarde.');
  
          }else{
  
                  var stock_old = result[0].stock;
                  var salidas_old = result[0].salidas;
                    
                  var stock = 0;

                  if(salidas == 0){

                    stock = parseInt(stock_old) + parseInt(salidas_old);
                    
                  }else if(salidas >= 1){

                    if(salidas > salidas_old){

                      var tempo = parseInt(stock_old) + (salidas_old)
                      stock = parseInt(tempo) - parseInt(salidas);

                    }else if(salidas < salidas_old ){

                      var tempo = parseInt(salidas_old) - parseInt(salidas);
                      stock = parseInt(stock_old) + parseInt(tempo);

                    }
                    

                  }

                  conexion.query('update inventario set salidas = ?, stock = ? where codigo_producto = ?',[salidas,stock,codigo_producto], function (err, result, fields) {
                      if (err){
                        
                        res.json('Actualmente la base de datos está presentando inconveniente, intente más tarde.');
              
                      }else{
              
                        res.status(200).json('Registro actualizado con exito');
              
                      }
              
                    });
  
          }
  
        });

  } catch (error) {
      
      res.json('Actualmente la base de datos no se encuentra activa, intente más tarde.');

  }

}



const editInicial = (req, res) => {

  try {
    
    const { codigo_producto, existencias_iniciales } = req.body;
    conexion.query('select entradas, salidas from inventario where codigo_producto = ?',[codigo_producto], function (err, result, fields) {
      if (err){
        
        res.json('Actualmente la base de datos está presentando inconveniente, intente más tarde.');

      }else{

        var entradas_old = result[0].entradas;
        var salidas_old = result[0].salidas;

        const stock = parseInt(existencias_iniciales) + parseInt(entradas_old) - parseInt(salidas_old);

        conexion.query('update inventario set existencias_iniciales = ?, stock = ? where codigo_producto = ?',[existencias_iniciales,stock,codigo_producto], function (err, result, fields) {
          if (err){
            
            res.json('Actualmente la base de datos está presentando inconveniente, intente más tarde.');
  
          }else{
  
            res.status(200).json('Registro actualizado con exito');
  
          }
  
        });




      }

    }); 

  } catch (error) {
    
    res.json('Actualmente la base de datos no se encuentra activa, intente más tarde.');


  }


}





module.exports = {

    selectInventary,
    selectOne,
    editEntradas,
    editSalidas,
    editInicial

}