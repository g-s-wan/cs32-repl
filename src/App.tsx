import { useState, useEffect } from "react";
import "./frontend/styles/App.css";
import Header from "./frontend/components/Header";
import HistoryBox from "./frontend/components/HistoryBox";
import InputBox from "./frontend/components/InputBox";

import {REPL} from "./frontend/REPL/REPL"
import {modePromise, modeBrief} from "./frontend/REPL/promises/modePromise"
import {loadPromise} from "./frontend/REPL/promises/loadPromise"
import {searchPromise} from "./frontend/REPL/promises/searchPromise"
import { helpPromise } from "./frontend/REPL/promises/helpPromise";
import {viewPromise} from "./frontend/REPL/promises/viewPromise";
import {clearPromise} from "./frontend/REPL/promises/clearPromise";
import {useKeyPress} from './frontend/REPL/useKeyPress';
import {mockLoadPromise} from "../tests/frontend/mocking/promises/mockLoadPromise";
import {mockViewPromise} from "../tests/frontend/mocking/promises/mockViewPromise";
import {mockSearchPromise} from "../tests/frontend/mocking/promises/mockSearchPromise";
import {mockClearPromise} from "../tests/frontend/mocking/promises/mockClearPromise";

function App() {
  // All state variables
  const [history, setHistory] = useState<(string | string[])[]>([]);
  const [text, setText] = useState("");
  const [fullCommand, setFullCommand] = useState("");
  const [outputStatus, setOutputStatus] = useState("");
  const [histEntry, setHistEntry] = useState("");

  const repl = new REPL();
  // "Baseline" commands - do not require additional registration
  // Developer can remove any of these lines to "unregister" a command
  repl.registerCommand("mode", modePromise);
  repl.registerCommand("load_file", loadPromise);
  repl.registerCommand("view", viewPromise);
  repl.registerCommand("search", searchPromise);
  repl.registerCommand("help", helpPromise);
  repl.registerCommand("clear", clearPromise);

  // For mocking purposes only
  repl.registerCommand("mock_load", mockLoadPromise);
  repl.registerCommand("mock_view", mockViewPromise);
  repl.registerCommand("mock_search", mockSearchPromise);
  repl.registerCommand("mock_clear", mockClearPromise);

  useEffect(() => {
    // Do not add anything to the History if the histEntry string changed because it was cleared.
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
   * Wrapper for executeCommand()
   */
  function handleCommand() {

    executeCommand(text.trim())
  }

  /**
   * Handles a command by accessing the REPL's Map of registered commands
   *
   * @param command - the command that will be processed
   * @returns
   */
  function executeCommand(command: string) {
        // Store the full command (user input) since it gets cleared somewhere else.
        setFullCommand(command);

        // Do nothing if the user did not provide a command
        if (command.length == 0)
          return;

        // Use the REPL's map of registered commands to execute the command's corresponding function
        try {
          repl.executeCommand(command)
            .then ( (response) => { setHistEntry(response);            setOutputStatus("Output: ");})
            .catch( (err)      => { setHistEntry(err.toString());      setOutputStatus("Output (Error):  "); })

        } catch(error) {
          setHistEntry(`Error executing command: ${error}`);
          setOutputStatus("Output (Error): ");
        }
  }

  /**
   * The following are helper functions that assist with shortcuts
   */
  const doToggleViewMode = () => {
    executeCommand("mode");
  }

  const doView = () => {
    executeCommand("view");
  }

  const doHelp = () => {
    executeCommand("help");
  }

  // Fill the command input box with a boilerplate for the search command
  const doSearch = () => {
    setText("search <search text> y <column index>")
  }

  // Fill the command input box with a boilerplate for the load command
  const doLoad = () => {
    setText("load_file ./data/<file name>")
  }

  const doClear = () => {
    setHistory([])
  }

  // Shortcuts involve holding the Ctrl/Command key and the indicated letter key at the same time
  useKeyPress(['m'], doToggleViewMode);
  useKeyPress(['v'], doView);
  useKeyPress(['f'], doSearch);
  useKeyPress(['l'], doLoad);
  useKeyPress(['r'], doClear);
  useKeyPress(['q'], doHelp);

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
