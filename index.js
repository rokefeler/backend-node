const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const { logError, errorHandler, boomErrorHandler } = require('./middlewares/error.handles');

const app = express();
const port = 3000;
app.use(express.json());
const whiteList = ['http://localhost:8080','https://myapp-com','http://localhost:3000'];
const options = {
  origin: (origin, callback)=>{
    if(whiteList.includes(origin) || !origin){
      callback(null,true);
    }
    else{
      callback(new Error('origin is not permit'));
    }
  }
}
app.use(cors(options)); /* cualquier origen */

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

/* los middlawares de tipo error deben ir despues de las rutas y es importante el orden */
app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port' + port);
});
