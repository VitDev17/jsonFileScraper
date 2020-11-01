import {useState, useEffect} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Form from 'react-bootstrap/Form'

function App() {
  const [filesList, setFilesList] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [readContent, setReadContent] = useState([]);

  useEffect(() => {
    getFileList();
  }, [])

  const getFileList = async() => {
    await axios.get('http://localhost:5000/files-list')
      .then(data => {
        console.log("PROVA PROVA",data.data.content);
        setFilesList(data.data.content)
      });
  }

  const readFileSelected = async (value) => {
    console.log("PROVA PROVA", value);

    setSelectedFile(value);
    await axios.post('http://localhost:5000//read-file',{data: value})
      .then(data => {
        console.log("PROVA PROVA", value);
        console.log("PROVA PROVA", data);
        //read file based on what was selected from the dropwdown
        setReadContent(data);
      });
  }

  return (
    <div className="App">
      <div className="main-container">
        <header className="App-header">
          <h1>Pro Synergy file scraper</h1>
          <p>
            Scegli una voce dalla select per ispezionare un file
          </p>
        </header>
          <Form className="file-scraping-container"> 
            <Form.Group className="file-scraping-container-group" controlId="exampleForm.SelectCustomSizeSm">
              <Form.Label>Seleziona il file</Form.Label>
            <Form.Control as="select" onChange={(value) => readFileSelected(value)} size="sm" custom>
                <option>Seleziona un file</option>
                {filesList.map((value,index)=>(
                  <option value={value} key={index}>{value}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        {readContent && 
            <div>
              {Object.entries(readContent).map(()=>{
                <p>CIAO</p>
              })}
            </div>
            }
      </div>
    </div>
  );
}

export default App;
