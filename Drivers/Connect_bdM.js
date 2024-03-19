const mongoose = require('mongoose')

//Conexión local
//const URI = "mongodb://127.0.0.1:27017/taller001"
//mongodb://localhost:27017

//conexión remota (MongoDB Atlas)
const URI ="mongodb+srv://ingrithrodriguez01:fc2Xd7UgZdcrBNoD@club.zhrjnq2.mongodb.net/ClubDeportivo?retryWrites=true&w=majority&appName=Club"

mongoose.set('strictQuery', false)

/*const options = {
    useNewUrlParser:true, useUnifiedTopology:true
}*/
mongoose.connect(URI)
   .then(() => console.log('Conexión a la base de datos exitosa'))
   .catch((err) => {
      console.error('Error al conectar a la base de datos:', err);
      process.exit(1); // Terminar la aplicación en caso de error de conexión
   });
/*mongoose.connect(URI)
    .then(()=>console.log('Connect DB Success'))
    .catch( e => console.log(e))*/

module.exports = mongoose