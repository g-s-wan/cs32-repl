import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Header from "./components/Header";
import HistoryBox from "./components/HistoryBox";
import InputBox from "./components/InputBox";

function App() {
  // The data state is an array of strings, which is passed to our components
  // You may want to make this a more complex object, but for now it's just a string
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("BRIEF");

  // Custom type that represents a command and its output
  type command = { [key: string]: Object };
  // List of commands shown in the repl-history
  let commandList = new Array();
  // Currently loaded CSV
  let [loadedCSV, setLoadedCSV] = useState("");

  useEffect(() => {
    console.log("EFFECT");
  }, [output]);

  // For last user story
  let registeredCommands = new Map<string, string>();

  // Reset the page to its default
  function clearHistory() {
    setMode("BRIEF");
    commandList = [];
    loadedCSV = "";
  }

  // Handles what happens when the user inputs and submits something
  function handleCommand() {
    // Gets user input
    const replHistory = document.getElementsByClassName("repl-history")[0];
    if (replHistory === null) {
      console.log("REPL history could not be found.");
    }
    const newCommand = document.getElementsByClassName("repl-command-box")[0];

    if (newCommand === null) {
      console.log("Command could not be found");
    } else if (!(newCommand instanceof HTMLInputElement)) {
      console.log("Found command, but wasn't an input element");
    } else {
      // Get the text of the command the user inputted
      const commandValue = newCommand.value;
      // Will be added to commandList once populated
      const commandObj: command = {};
      // User story #1
      if (commandValue === "mode") {
        setMode(mode === "BRIEF" ? "VERBOSE" : "BRIEF");
        // Alert the user that the mode was changed
        setOutput(`Mode was changed to ${mode}`);

        // User story #2
      } else if (commandValue.includes("load_file")) {
          console.log("loading");
        const filePath = commandValue.split(" ")[1];
        fetch('http://localhost:3232/loadcsv?filepath=' + `${filePath}`)
        .then(response => response.json())
        .then(responseObject => {
          if (responseObject.result.includes("error")) {
            setOutput(`An error occurred while loading the file`);
          } else {
            setLoadedCSV(responseObject.filepath);
            setOutput(`Successfully loaded ${filePath}`);
          }
        })
        .catch((error) => {
          console.log("ERROR ERROR " + error);
        });

        // User story #3
      } else if (commandValue === "view") {
        console.log("viewing");
        if (loadedCSV === null) {
          setOutput(`<p>No CSV file has been loaded yet.</p>`);
        } else {
          fetch("http://localhost:3232/viewcsv")
          .then(response => response.json())
          .then(responseObject => {
            // get responseObject['data'] and split the strings, displaying each one as a table cell
            setOutput(`<p>${responseObject}</p>`);
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
        setOutput("<p>Could not recognize that command</p>");
        console.log(output);
      }

      console.log("HUH");
      updateHTML(commandValue, output, commandObj, replHistory);
    }
  }

  // Updates the page to reflect the newly inputted command
  function updateHTML(
    commandValue: string,
    output: string,
    commandObj: command,
    replHistory: Element
  ) {
    commandObj[commandValue] = output;
    // Add the command to the history even if it was unsuccessful
    commandList.push(commandObj);
    // Update the UI based on the mode
    if (mode === "BRIEF") {
      replHistory.innerHTML += `<p>${commandObj[commandValue]}</p>`;
    } else {
      replHistory.innerHTML += `<p>Command: ${commandValue}</p>`;
      replHistory.innerHTML += `<p>Output: ${commandObj[commandValue]}</p>`;
    }
    // Add a horizontal line for visiblity between commands
    replHistory.innerHTML += "<hr/>";
  }

  function getMode() {
    return mode;
  }

  function getLoadedCSV() {
    return loadedCSV;
  }

  return (
    <div>
      <Header />
      <div className="repl">
        <HistoryBox history={history} />
        <hr />
        <InputBox
          history={history}
          handle={handleCommand}
        />
      </div>
    </div>
  );
}

export default App;
