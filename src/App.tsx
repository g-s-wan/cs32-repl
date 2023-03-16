import { useState, useEffect, KeyboardEvent  } from "react";
import "../styles/App.css";
import Header from "./components/Header";
import HistoryBox from "./components/HistoryBox";
import InputBox from "./components/InputBox";

import {REPL} from "./REPL/REPL"
import {modePromise, modeBrief} from "./REPL/promises/modePromise"
import {loadPromise} from "./REPL/promises/loadPromise"
import {searchPromise} from "./REPL/promises/searchPromise"
import { helpPromise } from "./REPL/promises/helpPromise";
import {viewPromise} from "./REPL/promises/viewPromise";
import {clearPromise} from "./REPL/promises/clearPromise";
import {useKeyPress} from './useKeyPress';
import {mockLoadPromise} from "../tests/mocking/promises/mockLoadPromise";
import {mockViewPromise} from "../tests/mocking/promises/mockViewPromise";
import {mockSearchPromise} from "../tests/mocking/promises/mockSearchPromise";
import {mockClearPromise} from "../tests/mocking/promises/mockClearPromise";

function App() {

  const [history, setHistory] = useState<(string | string[])[]>([]);
  const [text, setText] = useState("");
  const [fullCommand, setFullCommand] = useState("");
  const [outputStatus, setOutputStatus] = useState("");
  const [histEntry, setHistEntry] = useState("");
  
  const repl = new REPL();
  repl.registerCommand("mode", modePromise);
  repl.registerCommand("load_file", loadPromise);
  repl.registerCommand("view", viewPromise);
  repl.registerCommand("search", searchPromise);
  repl.registerCommand("help", helpPromise);
  repl.registerCommand("clear", clearPromise);

  // For mocking
  repl.registerCommand("mock_load", mockLoadPromise);
  repl.registerCommand("mock_view", mockViewPromise);
  repl.registerCommand("mock_search", mockSearchPromise);
  repl.registerCommand("mock_clear", mockClearPromise);

  useEffect(() => {
    // Do not add anything to the History if the histEntry string changed because it was cleared.
    //
    if (histEntry.length > 0) {

      if (!modeBrief) {
        setHistory([...history, "Command: " + fullCommand + "<br>" + outputStatus + histEntry])
      } else {
        setHistory([...history, histEntry])
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

    executeCommand(text.trim())
  }

  /**
   * 
   * @param command 
   * @returns 
   */
  function executeCommand(command: string) {
        // Store the full command (user input) since it gets cleared somewhere else.
        setFullCommand(command);

        // Do nothing if the user did not provide a command
        if (command.length == 0)
          return;
    
        try {
          repl.executeCommand(command)
            .then ( (response) => { setHistEntry(response);            setOutputStatus("Output: ");})
            .catch( (err)      => { setHistEntry(err.toString());      setOutputStatus("Output (Error):  "); })
    
        } catch(error) {
          setHistEntry(`Error executing command: ${error}`);
          setOutputStatus("Output (Error): ");
        }
  }

  const doToggleViewMode = () => {
    executeCommand("mode");
  }

  const doView = () => {
    executeCommand("view");
  }

  const doHelp = () => {
    executeCommand("help");
  }

  const doSearch = () => {
    setText("search <search text> y <column index>")
  }

  const doLoad = () => {
    setText("load_file ./data/<file name>")
  }

  const doClear = () => {
    setHistory([])
  }

  useKeyPress(['m'], doToggleViewMode);
  useKeyPress(['v'], doView);
  useKeyPress(['f'], doSearch);
  useKeyPress(['l'], doLoad);
  useKeyPress(['r'], doClear);
  useKeyPress(['?'], doHelp);

  /**
   * TSX for the component
   */
  return (
    <div className="repl-main">
      <Header />
      <div className="repl">
        <HistoryBox history={history}/>
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
