import { useState, useEffect } from "react";
import "../styles/App.css";
import Header from "./components/Header";
import HistoryBox from "./components/HistoryBox";
import InputBox from "./components/InputBox";

import {REPL} from "./REPL/REPL"
import {modePromise, modeBrief} from "./REPL/modePromise"
import {loadPromise} from "./REPL/loadPromise"
import {searchPromise} from "./REPL/searchPromise"
import {viewPromise} from "./REPL/viewPromise"
import { history } from "./REPL/History";

function App() {

//  const [history, setHistory] = useState<(string | string[])[]>([]);
  const [text, setText] = useState("");
  const [fullCommand, setFullCommand] = useState("");
  const [outputStatus, setOutputStatus] = useState("");
  const [histEntry, setHistEntry] = useState("");
  
 // const [loadedCSV, setLoadedCSV] = useState("");
 // const [csvTable, setCSVTable] = useState<string[]>([]);

  const repl = new REPL();
  repl.registerCommand("mode", modePromise);
  repl.registerCommand("load_file", loadPromise);
  repl.registerCommand("view", viewPromise);
  repl.registerCommand("search", searchPromise);


  useEffect(() => {
    // Do not add anything to the History if the histEntry string changed because it was cleared.
    //
    if (histEntry.length > 0) {

      if (!modeBrief) {
        history.addString("Command " + fullCommand);
        history.addString(outputStatus + histEntry);
      } else {
         history.addString(histEntry);
      }
    }

    // Clear the histEntry text so that we can add the same message to the history
    // in case the user issues the same command again and gets the same histEntry.
    //
    setHistEntry("");

  }, [histEntry]);

  /**
   * 
   */
  function handleCommand() {

    // Store the full command (user input) since it gets cleared somewhere else.
    setFullCommand(text.trim());

    // Do nothing if the user did not provide a command
    if (text.trim().length == 0)
      return;

    try {
      repl.executeCommand(text.trim())
        .then ( (response) => { setHistEntry(response);            setOutputStatus("Output: ");})
        .catch( (err)      => { setHistEntry(err.toString());      setOutputStatus("Output (Error):  "); })

    } catch(error) {
      setHistEntry(`Error executing command: ${error}`);
      setOutputStatus("Output (Error): ");
    }
  }

  /**
   * TSX for the component
   */
  return (
    <div>
      <Header />
      <div className="repl">
        <HistoryBox history={history}/>
        <hr />
        <InputBox
            handle={handleCommand}
            text={text}
            setText={setText}
        />
      </div>
    </div>
);

}
export default App;
