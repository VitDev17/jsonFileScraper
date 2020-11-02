import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import "./App.css";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { FlashOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 10,
    minWidth: 200,
  },
  selectEmpty: {},
}));

function App() {
  const classes = useStyles();
  const [filesList, setFilesList] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [readContent, setReadContent] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    getFileList();
  }, []);

  const getFileList = async () => {
    await axios.get("http://localhost:5000/files-list").then((data) => {
      setFilesList(data.data.content);
    });
  };

  const readFileSelected = async (value) => {
    setSelectedFile(value.target.value);
    axios
      .post("http://localhost:5000/read-file", {
        filename: value.target.value,
      })
      .then((response) => {
        setRawData(response.data.data.elements.edges);
        //read file based on what was selected from the dropwdown
        let edgesRead = [];
        edgesRead = response.data.data.elements.edges.reduce((r, a) => {
          r[a.data.source] = r[a.data.source] ? r[a.data.source] : [];
          r[a.data.source].push(a.data);
          return r;
        }, []);

        setReadContent(edgesRead);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionDetails = (node) => {
    console.log(node);
    
  };

  return (
    <div className="App">
      <div className="main-container">
        <header className="App-header">
          <h1>Pro Synergy file scraper</h1>
          <p>Scegli una voce dalla select per ispezionare un file</p>
        </header>
        <div className="file-scraping-container-group">
          <FormControl style={{ backgroundColor: "#FFF" }} className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Seleziona un file</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedFile} style={{ minWidth: "60%" }} onChange={(value) => readFileSelected(value)}>
              {filesList.map((value, index) => (
                <MenuItem value={value} key={index}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="file-scraping-container">
            {readContent &&
              readContent.map((value, index) => {
                let nameOfNode = rawData.find((elem) => elem.data.id == value[0].id);
                nameOfNode = nameOfNode.data.name.toString();
                return (
                  <Accordion style={{ width: "80%" }} onChange={handleChange("panel1")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                      <Typography className={classes.heading}><b>{nameOfNode && nameOfNode.substring(0,nameOfNode.indexOf('('))}</b></Typography>
                    </AccordionSummary>
                      <AccordionDetails style={{flexDirection:'column'}}><ul>{value.map((nodes, index) => (<li><Typography key={index}>{nodes.name.substring(nodes.name.indexOf(')')+2, nameOfNode.length)}</Typography></li>))}</ul></AccordionDetails>
                  </Accordion>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
