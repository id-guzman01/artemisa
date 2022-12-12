
const conexion = require('../Database/conexion.mysql.js');

const login = (req, res) => {

    try {

            const {correo, password} = req.body;

            conexion.query('Select * from usuarios where correo = ?',[correo], function (err, result, fields) {
              if (err){

                res.json('El correo se encuentra erroneo');

              }else{

                if(result == ''){
                    
                    res.json('El correo se encuentra erroneo');

                }else{
                    
                        conexion.query('Select * from usuarios where password = ?',[password], function (err, result, fields) {
                        if (err){
          
                          res.json('La contraseña es erronea');
          
                        }else{

                                if(result == ''){

                                    res.json('La contraseña es erronea');

                                }else{

                                    res.status(200).json(result);

                                }

                        }
          
                      });

                }

              }

            });

    } catch (error) {
        
        res.status(401).json('La base de datos no se encuentra funcionando actualmente');

    }

}



const registerUser = (req, res) => {


    try {

        const { nombre, correo, password } = req.body;
        
        conexion.query('insert into usuarios (nombre, correo, password) values (?,?,?)',[nombre, correo, password], function (err, result, fields) {
    
            if (err){

                res.json('Actualmente no es posible registrar al usuario');

              }else{

                res.status(200).json("usuario registrado con exito");

              }
                    

          });

    } catch (error) {
        
    }


}


module.exports = { login, registerUser }