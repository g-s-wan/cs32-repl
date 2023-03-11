import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Header from "./components/Header";
import HistoryBox from "./components/HistoryBox";
import InputBox from "./components/InputBox";
import {
  getFiveColumnCSV,
  getOneColumnCSV,
  getThreeColumnCSV,
} from "../mockData/mockedJson.js";

function App() {
  // The data state is an array of strings, which is passed to our components
  // You may want to make this a more complex object, but for now it's just a string
  const [history, setHistory] = useState<string[]>([]);

  // This is temporary
  useEffect(() => {
    // prepareButtonPress();
    // prepareEnterFeature();
    prepareCSVList();
  });

  // Custom type that represents a command and its output
  type command = { [key: string]: Object };
  let mode = "BRIEF";
  // List of commands shown in the repl-history
  let commandList = new Array();
  // Currently loaded CSV
  let loadedCSV = new Array<Array<string>>();
  // Stores mocked CSV data
  const csvList = new Map<string, Array<Array<string>>>();

  // Reset the page to its default
  function clearHistory() {
    mode = "BRIEF";
    commandList = [];
    loadedCSV = new Array<Array<string>>();
  }

  // Set up the mocked CSV data
  // Note: the filenames do not represent actual file names
  // function prepareCSVList() {
  //   csvList.set("mockedData/csv1", getFiveColumnCSV());

  //   csvList.set("mockedData/csv2", getThreeColumnCSV());

  //   csvList.set("mockedData/csv3", getOneColumnCSV());
  // }

  // Allows the user to submit their input using the Enter key
  function handleEnter(event: KeyboardEvent) {
    // const inputs = document.getElementsByClassName("repl-command-box");
    // const input = inputs.item(0);
    // if (input == null) {
    //   console.log("Couldn't find the button");
    // } else if (!(input instanceof HTMLInputElement)) {
    //   console.log("Found element, but wasn't button element");
    // } else {
    //   input.addEventListener("keydown", (e) => {
    //     if (e.key == "Enter") {
    //       handleCommand();
    //     }
    //   });
    // }
    if (event.key === "Enter") {
      handleCommand();
    }
  }

  // Allows the user to submit their input using the Submit button
  function prepareButtonPress() {
    // At this point, we're not sure whether the button actually exists
    // const maybeButtons = document.getElementsByClassName("submit-button");
    // const maybeButton = maybeButtons.item(0);
    // if (maybeButton == null) {
    //   console.log("Couldn't find the button");
    // } else if (!(maybeButton instanceof HTMLButtonElement)) {
    //   console.log("Found element, but wasn't button element");
    // } else {
    //   maybeButton.addEventListener("click", handleButtonPress);
    // }
  }

  // If something went wrong with the button press, an error is logged
  // Otherwise, the user's submission contines to be processed
  // function handleButtonPress(event: MouseEvent) {
  //   if (event === null) {
  //     console.log("Button press was not registered");
  //   } else if (commandList === null) {
  //     console.log("Unable to process list of commands");
  //   } else {
  //     handleCommand();
  //   }
  // }

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
      let output = "";
      console.log(commandValue);
      // User story #1
      if (commandValue === "mode") {
        mode = mode === "BRIEF" ? "VERBOSE" : "BRIEF";
        // Alert the user that the mode was changed
        output = `Mode was changed to ${mode}`;

        // User story #2
      } else if (commandValue.includes("load_file")) {
        const filePath = commandValue.split(" ")[1];
        // Extract the CSV from the mocked data
        const csvFile = csvList.get(`${filePath}`);
        if (csvFile != undefined) {
          // Update the currently loaded file and alert the user
          loadedCSV = csvFile;
          output = `Successfully loaded ${filePath}`;
          // Filepath provided was not in the mocked data
        } else {
          replHistory.innerHTML += "<p>CSV file could not be found</p>";
        }

        // User story #3
      } else if (commandValue === "view") {
        if (loadedCSV.length === 0) {
          output = `<p>No CSV file has been loaded yet.</p>`;
        } else {
          // Construct a table based on the values in the mocked data
          output += "<table>";
          loadedCSV.forEach((row) => {
            output += "<tr>";
            row.forEach((col) => {
              output += `<td>${col}</td>`;
            });
            output += "</tr>";
          });
          output += "</table>";
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
        output = `<p>Could not recognize that command</p>`;
      }

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
          onKeyPress={handleEnter}
        />
      </div>
    </div>
  );
}

export default App;
