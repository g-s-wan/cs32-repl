import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Header from "./components/Header";
import HistoryBox from "./components/HistoryBox";
import InputBox from "./components/InputBox";
import CSVTable from "./components/CSVTable";

function App() {
  // The data state is an array of strings, which is passed to our components
  // You may want to make this a more complex object, but for now it's just a string
  const [history, setHistory] = useState<(string|string[])[]>([]);
  const [mode, setMode] = useState("BRIEF");
  const [text, setText] = useState("");
  const [isBrief, setBrief] = useState(true);
  const [loadedCSV, setLoadedCSV] = useState("");
  // const [csvTable, setCSVTable] = useState<string[]>([]);

  // Custom type that represents a command and its output
  type command = { [key: string]: Object };

  // List of commands shown in the repl-history todo use?
  let commandList = new Array();

  // Currently loaded CSV

  // For last user story
  let registeredCommands = new Map<string, string>();

  // useEffect(() => {
  //   console.log("EFFECT");
  //   setHistory([...history, output]);
  // }, [output]);

  /*
  Reset the page to its default: mode brief & empty command list & no loaded CSV
   */
  function clearHistory() {
    setMode("BRIEF");
    commandList = [];
    setLoadedCSV("");
  }

  /*
  Handles what happens when the user inputs and submits something
   */
  function handleCommand() {
    let command_array = text.split(" ");
    let mode_message = "";
    let error_message;

    /*if (isBrief === false) {
        console.log("HERE");
        setHistory([...history, `${verbose_message} \n Command: ${text_lowercase}`]);
        console.log("HEREEEE");
      }*/

    console.log("text_lowercase : " + command_array)
    // User story #1

    if (command_array[0].toLowerCase() === "mode") {
      if (mode === "BRIEF") {
        setMode("VERBOSE"); //toggle between brief/verbose
        mode_message = ""
        setHistory([...history, `${mode_message} Output: Mode successfully set to VERBOSE`]);

      } else {
        mode_message = "Command: " + command_array[0]
        setHistory([...history, `${mode_message}`, `Output: Mode successfully set to BRIEF`]);
        setMode("BRIEF");
      }
    }

    // User story #2

    else if (command_array[0].toLowerCase() === "load_file") {

      if (command_array[1] === undefined) {
         setHistory([...history, "Error: Please enter filepath"]);
      }
      else {
        const filePath = command_array[1];
        console.log("filePath is " + filePath);

        fetch('http://localhost:3232/loadcsv?filepath=' + `${filePath}`)
        .then(response => response.json())
        .then(responseObject => {
          if (responseObject.result.includes("error")) {
            setHistory([...history, `An error occurred while loading the file`]);
          } else {
            setLoadedCSV(responseObject.filepath);
            setHistory([...history, `${mode_message} Output: Successfully loaded ${filePath}`]);
          }
        })
        .catch((error) => {
          console.log("ERROR ERROR " + error); // todo - Change message?
        });
     }
    }

  // User story #3
   else if (command_array[0] === "view") {
      console.log("viewing"); // todo - needed?
      const toDisplay = "";

      if (loadedCSV === null) {
        setHistory([...history, "No CSV file has been loaded yet"]);
      } else {
        fetch("http://localhost:3232/viewcsv")
        .then(response => response.json())
        .then(responseObject => {
          console.log("RESPONSE OBJECT");
          console.log(responseObject);
          const csvData: string[] = responseObject.data;

          setHistory([...history, csvData]);
          // csvData.forEach((row) => {
          //   setHistory([...history, row]); // todo: find a better way to display this data
          // })
        });
        // const loadedCSVAsArray = loadedCSV.split(",");
        // // Construct a table based on the values in the mocked data
        // output += "<table>";
        // loadedCSVAsArray.forEach((row) => {
        //   const rowAsArray = row.split(",");
        //   output += "<tr>";
        //   rowAsArray.forEach((col) => {
        //     output += `<td>${col}</td>`;
        //   });
        //   output += "</tr>";
        // });
        // output += "</table>";
      }
    }
        // User story #4

      else if (command_array[0].includes("search")) {
        if (command_array.length < 3) {
          setHistory([...history, "Incorrect number of parameters"]);
        } else {
          let searchTerm = command_array[1];
          let hasHeaders = command_array[2];
          fetch(command_array.length === 4
              ? "http://localhost:3232/searchcsv?searchterm=" + `${searchTerm}` + "&hasheaders=" + `${hasHeaders}` + "&col=" + `${command_array[3]}`
              : "http://localhost:3232/searchcsv?searchterm=" + `${searchTerm}` + "&hasheaders=" + `${hasHeaders}`
          )
          .then(response => response.json())
          .then(responseObject => {
              if (responseObject.result.includes("error")) {
                setHistory([...history, responseObject.message]);
              } else {
                let csvData: string[] = responseObject.data;
                if (csvData.length === 0) {
                  csvData = [`${mode_message}`, "Output: No results found"];
                }
                console.log("CSV DATA " + csvData);
                setHistory([...history, csvData]);
              }
            })
          }
        }
          // call the back-end searching method using column and value.
          // mock the back-end for this sprint
          // console.log("running");
          // let sd = new SearchData();

        //   replHistory.innerHTML += `<p>Searching Result:</p>`;
        //   output += "<table>";
        //   sd.searchResult(loadedCSV, column, value).forEach((row) => {
        //     output += "<tr>";
        //     row.forEach((col) => {
        //       output += `<td>${col}</td>`;
        //     });
        //     output += "</tr>";
        //   });
        //   output += "</table>";
        // }
      //}
      // Invalid/unrecognized command

      else if (command_array[0] === "help") {
        setHistory([...history, "Available commands: mode,  load_file filename, view, search searchvalue " +
        "[index | column] [header]"]);
      }
      else {
        setHistory([...history, `Could not recognize command "${command_array[0]}". Type help for list of commands`]);
      }
    }

  return (
    <div>
      <Header />
      <div className="repl">
        <HistoryBox history={history}/>
        <hr />
        <InputBox
          history={history}
          handle={handleCommand}
          text={text}
          setText={setText}
        />
      </div>
    </div>
  );
}

export default App;
