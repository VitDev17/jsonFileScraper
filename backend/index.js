let express = require('express');
let config = require('./config');
let app = express();
let fs = require('fs'); //file reader
const { response } = require('express');

//Ricevere la lista dei file conteuti nella cartella indicata
app.get('/files-list', function (req, res) {
  let filePath = './JSONfiles/'
  fs.readdir(filePath, (error,content) => {
    console.log('Richiesta dal frontend: ',req);
    if(error){
      res.status(500).send({
        status: 'error',
        message: 'Errore nella lettura del file',
        error
      }).end()
    }else{
      //let data = JSON.parse(content);
      //console.log('Lista files: '+content)
      let response = [];
      response = [content];
      res.status(200).send({
          status: 'success',
          message: 'Lista files nella cartella JSONfiles',
          content
      }).end()
    }
  }) 
});

//Leggere file passato in req
app.post('/read-file', function (req, res) {
  res.send('Richiesta dal frontend: ',req);
  let filePath = './JSONfiles/';
  let filename = req.body.filename;
  fs.readFile(filePath+filename, function (error, content) {
    if(error){
      res.status(500).send({
        status: 'error',
        message: 'Errore nella lettura del file',
        error
      }).end()
    }else{
      //let data = JSON.parse(content).collection;
      //console.log(data);
      res.status(200).send({
          status: 'success',
          message: 'Lettura file',
          content
      }).end()
    }
  })
});

app.listen(config.PORT, () => {
  console.log('Example app listening on port '+config.PORT+'!');
});
