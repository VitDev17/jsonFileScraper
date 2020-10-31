import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form'

function App() {
  const [filesList, setFilesList] = useState([])

  const getFileList = async() => {
    await fetch('http://localhost:3000/file-list')
      .then(response => response.json())
      .then(data => {
        console.log("PROVA PROVA",data);
        setFilesList(data)
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
              <Form.Control as="select" size="sm" custom>
                {filesList.map((value,index)=>(
                  <option key={index}>{value}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
      </div>
    </div>
  );
}

export default App;
