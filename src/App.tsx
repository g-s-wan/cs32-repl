import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Header from "./components/Header";
import HistoryBox from "./components/HistoryBox";
import InputBox from "./components/InputBox";

function App() {
  // The data state is an array of strings, which is passed to our components
  // You may want to make this a more complex object, but for now it's just a string
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState("BRIEF");
  const [text, setText] = useState("");

  // Custom type that represents a command and its output
  type command = { [key: string]: Object };
  // List of commands shown in the repl-history
  let commandList = new Array();
  // Currently loaded CSV
  let [loadedCSV, setLoadedCSV] = useState("");

  // For last user story
  let registeredCommands = new Map<string, string>();

  // useEffect(() => {
  //   console.log("EFFECT");
  //   setHistory([...history, output]);
  // }, [output]);

  // Reset the page to its default
  function clearHistory() {
    setMode("BRIEF");
    commandList = [];
    loadedCSV = "";
  }

  // Handles what happens when the user inputs and submits something
  function handleCommand() {

      // User story #1
      if (text === "mode") {
        setMode(mode === "BRIEF" ? "VERBOSE" : "BRIEF");
        // Alert the user that the mode was changed
        setHistory([...history, `Mode was changed to ${mode}`]);

        // User story #2
      } else if (text.includes("load_file")) {
          console.log("loading");
        const filePath = text.split(" ")[1];
        fetch('http://localhost:3232/loadcsv?filepath=' + `${filePath}`)
        .then(response => response.json())
        .then(responseObject => {
          if (responseObject.result.includes("error")) {
            setHistory([...history, `An error occurred while loading the file`]);
          } else {
            setLoadedCSV(responseObject.filepath);
            setHistory([...history, `Successfully loaded ${filePath}`]);
          }
        })
        .catch((error) => {
          console.log("ERROR ERROR " + error);
        });

        // User story #3
      } else if (text === "view") {
        console.log("viewing");
        if (loadedCSV === null) {
          setHistory([...history, "No CSV file has been loaded yet"]);
        } else {
          fetch("http://localhost:3232/viewcsv")
          .then(response => response.json())
          .then(responseObject => {
            // get responseObject['data'] and split the strings, displaying each one as a table cell
            setHistory([...history, responseObject]);
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

        // User story #4
      }
      // else if (commandValue.includes("search")) {
      //   let parsed = commandValue.split(" ");
      //   if (parsed.length != 3) {
      //     output += `<p>Wrong number of parameters.</p>`;
      //     console.log("Wrong number of parameters.");
      //   } else {
      //     let column = parsed[1];
      //     let value = parsed[2];
      //     // call the back-end searching method using column and value.
      //     // mock the back-end for this sprint
      //     console.log("running");
      //     let sd = new SearchData();

      //     replHistory.innerHTML += `<p>Searching Result:</p>`;
      //     output += "<table>";
      //     sd.searchResult(loadedCSV, column, value).forEach((row) => {
      //       output += "<tr>";
      //       row.forEach((col) => {
      //         output += `<td>${col}</td>`;
      //       });
      //       output += "</tr>";
      //     });
      //     output += "</table>";
      //   }
      //}
      // Invalid/unrecognized command
      else {
        setHistory([...history, "Could not recognize that command"]);
      }
    }

  // Updates the page to reflect the newly inputted command
  function updateHTML(
    commandValue: string,
    output: string,
    replHistory: Element
  ) {
    // Update the UI based on the mode
    if (mode === "BRIEF") {
      replHistory.innerHTML += `<p>${output}</p>`;
    } else {
      replHistory.innerHTML += `<p>Command: ${commandValue}</p>`;
      replHistory.innerHTML += `<p>Output: ${output}</p>`;
    }
    // Add a horizontal line for visiblity between commands
    replHistory.innerHTML += "<hr/>";
  }

  // function getMode() {
  //   return mode;
  // }
  //
  // function getLoadedCSV() {
  //   return loadedCSV;
  // }

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
