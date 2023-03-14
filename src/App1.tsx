import React, {useState, useEffect, useCallback, useRef} from "react";
import "../styles/App.css";
import Header from "./components/Header";
import HistoryBox from "./components/HistoryBox";
import InputBox from "./components/InputBox";
import CSVTable from "./components/CSVTable";
import {REPLFunction} from "./main/java/REPLFunction";
//import  CsvToHtmlTable from "react-csv-to-table";
//import MyComponent from 'table-react-component'
// import CsvToHtmlTable from 'react-csv-to-table';

function App1() {

  const [history, setHistory] = useState<(string | string[])[]>([]);
  const [mode, setMode] = useState("BRIEF");
  const [text, setText] = useState("");
  const [loadedCSV, setLoadedCSV] = useState("");
  const scrollRef = useRef<null | HTMLDivElement>(null);
  let mode_message = "";
  let isHeaderPresent = false;
  // todo: shortcuts are buggy

  // let baselineCommands = new Map();
  // baselineCommands.set("mode",modeCommand);
  // baselineCommands.set("load_file", load_fileCommand);
  // baselineCommands.set("view",viewCommand);
  // baselineCommands.set("help",helpCommand);
  // baselineCommands.set("search", searchCommand);

  //let [registry, seRegistery]  = useState(baselineCommands);

  const executeScroll = () => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      // scrollRef.current?.scroll({ top: scrollRef.current?.scrollHeight, behavior: 'smooth' })
    }
  }

  type Commands = {
    [key: string]: (args: string[], mode_message: string) => void;
  };

  let commands : Commands = {

    modeCommand(args: string[], mode_message: string) {
      // todo User specifies mode
      // if (args[1] !== undefined) {
      //   setMode(args[1]);
      // } else { //toggle between brief/verbose
        if (mode === "BRIEF") {
          setMode("VERBOSE"); //toggle between brief/verbose
          setHistory([...history, `${mode_message}`, `Output: Mode successfully set to VERBOSE`]);
        } else {
          setMode("BRIEF");
          setHistory([...history, `${mode_message}`, `Output: Mode successfully set to BRIEF`]);
        }
      //}
    },

    load_fileCommand(args: string[], mode_message: string) {
      console.log("In load_fileCommand")
      if (args[1] === undefined) {
        setHistory([...history, "Error: Please enter filepath"]);
      }
      else {
        const filePath = args[1];
        // if (args[2] == "-h") {isHeaderPresent = true}

        fetch('http://localhost:3232/loadcsv?filepath=' + `${filePath}`)
        .then(response => response.json())
        .then(responseObject => {
          if (responseObject.result.includes("error")) {
            // todo: be more specific?
            setHistory([...history,`${mode_message}`, responseObject.message]);
          } else {
            setLoadedCSV(filePath);
            setHistory([...history,`${mode_message}`, `Output: Successfully loaded ${filePath}`]);
          }
        })
        .catch((error) => {
          setHistory([...history, `${mode_message}`, `Output: Error ${error}`]);
          console.log("ERROR ERROR " + error); // todo - Change message?
        });
      }
    },

    viewCommand(args: string[], mode_message: string) {
      console.log("viewing");

      if (loadedCSV === "") {
        setHistory([...history, "No CSV file has been loaded yet"]);
      } else {
        fetch("http://localhost:3232/viewcsv")
        .then(response => response.json())
        .then(responseObject => {
          if (responseObject.result.includes("error")) {
            setHistory([...history,`${mode_message}`, responseObject.message]);
          } else {
            const csvData: string[] = responseObject.data;
            setHistory([...history, csvData]);
          }
        });
      }
    },

    searchCommand(args: string[], mode_message: string) {
      console.log("searching");
      // if(args.length < 2) {
      //   setHistory([...history, `${mode_message}`, "Invalid Input : Usage is search &lt;column_index | column_name&gt  &lt;value&gt]);"])
      // } else {
      //
      //   let searchText = "";
      //   let searchColumn = "";
      //
      //   if (args.length == 2) { //Just search value
      //     searchText = args[1];
      //     searchColumn = "";
      //   } else {
      //     searchColumn = args[1];
      //     searchText = args[2];
      //   }
      //   commandResponse = searchDataset(csvDataset, searchColumn, searchText);
      // }
      // console.log("args is " + args);
      //
      // const searchValue = args[1];
      // const searchIndexStr= args[2];
      // const searchColum= args[3];
      //
      // // Ensure all arguments are valid
      // console.log("searchValue is " + searchValue);
      // console.log("searchIndexStr is " + searchIndexStr);
      // console.log("searchColum is " + searchColum);
      //
      // //User gives both index & column
      // if (searchIndexStr !== undefined && searchColum !== undefined && searchColum !== "") {
      //   setHistory([...history, `${mode_message}`, "Invalid Input : Usage is search searchValue [column_index | column_name] "])
      // }
      //
      // //User searches with index
      // if (searchIndexStr !== undefined && searchIndexStr !== "") {
      //   const searchIndexInt = parseInt(searchIndexStr) //todo check out of bounderies
      //   if (isNaN(searchIndexInt) || searchIndexInt < 0) {
      //     setHistory([...history, `${mode_message}`, "Invalid Input : Index needs to be a positive integer"])
      //   } else {
      //     fetch('http://localhost:3232/searchcsv?searchterm=' + `${searchValue}`
      //         +"&col=" + `${searchIndexStr}`+"&hasheaders=" + `${isHeaderPresent}`)
      //     .then(response => response.json())
      //     .then(responseObject => {
      //       console.log(responseObject);
      //       const searchResult: string[] = responseObject.data;
      //       console.log("searchResult is " + searchResult);
      //       setCSVTable(searchResult);
      //       setHistory([...history, searchResult]);
      //     })
      //     .catch((error) => {
      //       setHistory([...history, `${mode_message}`, ` Output: Error ${error}`]);
      //       console.log("ERROR ERROR " + error); // todo - Change message?
      //     });
      //   }
      // }
      //
      // // User searches with column name
      // else if (searchColum !== undefined && searchColum !== "") {
      //   if (isHeaderPresent == false) {
      //     setHistory([...history, `${mode_message}`, `Output: Error - Data does not have headers`]);
      //   } else {
      //     fetch('http://localhost:3232/searchcsv?searchterm=' + `${searchValue}`
      //         +"&col=" + `${searchColum}`+"&hasheaders=" + `${isHeaderPresent}`)
      //     .then(response => response.json())
      //     .then(responseObject => {
      //       console.log(responseObject);
      //       const searchResult: string[] = responseObject.data;
      //       setCSVTable(searchResult);
      //       setHistory([...history, searchResult]);
      //     })
      //     .catch((error) => {
      //       setHistory([...history, `${mode_message}`, ` Output: Error ${error}`]);
      //       console.log("ERROR ERROR " + error); // todo - Change message?
      //     });
      //   }
      // }
      //
      // // User searches value
      // fetch('http://localhost:3232/searchcsv?searchterm=' + `${searchValue}`+ "&hasheaders=" + `${isHeaderPresent}`)
      // .then(response => response.json())
      // .then(responseObject => {
      //   console.log(responseObject);
      //   const searchResult: string[] = responseObject.data;
      //   console.log("searchResult " + searchResult);
      //   if (searchResult.length == 0) {
      //     setHistory([...history, `${mode_message}`, "Output: No results found"]);
      //   } else {
      //     setCSVTable(searchResult);
      //   }
      //   //setHistory([...history, searchResult]);
      // })
      // .catch((error) => {
      //   setHistory([...history, `${mode_message}`, ` Output: Error ${error}`]);
      //   console.log("ERROR ERROR " + error); // todo - Change message?
      // });
      if (args.length < 3) {
        setHistory([...history, "Incorrect number of parameters"]);
      } else {
        let searchTerm = args[1];
        let hasHeaders = args[2];
        fetch(args.length === 4
            ? "http://localhost:3232/searchcsv?searchterm=" + `${searchTerm}` + "&hasheaders=" + `${hasHeaders}` + "&col=" + `${args[3]}`
            : "http://localhost:3232/searchcsv?searchterm=" + `${searchTerm}` + "&hasheaders=" + `${hasHeaders}`
        )
        .then(response => response.json())
        .then(responseObject => { // todo: duplicated code?
          if (responseObject.result.includes("error")) {
            setHistory([...history, `${mode_message}`, responseObject.message]);
          } else {
            let csvData: string[] = responseObject.data;
            if (csvData.length === 0) {
              csvData = [`${mode_message}`, "Output: No results found"];
            }
            setHistory([...history, `${mode_message}`, csvData]);
          }
        })
      }

    },

    helpCommand(args: string[], mode_message: string) {
      setHistory([...history, "Available commands: mode,  load_file filename, view, search [searchValue] " +
      "[hasHeaders] [index | column]"]);
    }
  }

  function handleCommand() {
    let command_array = text.split(" "); // get command in form of array

    // get first word in command
    let actionCommand = command_array[0] ;
    actionCommand = actionCommand.toLowerCase() + "Command"

    console.log("actionCommand is "+ actionCommand);

    try {
      if (mode === "BRIEF") {
        mode_message = ""
      } else {
        mode_message = `Command: ${command_array[0]}`
      }

      //command_array.push(mode_message);

      let action = commands[actionCommand];
      //let action = commands.load_fileCommand;
      action(command_array, mode_message);

      //commands[commandName]();

    } catch(error) {
      console.log("error is "+ error);
      setHistory([...history, `Could not recognize command "${command_array[0]}". Type help for list of commands`]);
    }

  }

  const handleShortcut = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if ((event.ctrlKey || event.metaKey) && event.altKey && key === 'v') {
      commands['viewCommand'](["view"], mode_message);
    } else if ((event.ctrlKey || event.metaKey) && event.altKey && key === 'm') {
      commands['modeCommand'](["mode"], mode_message);
    } else if ((event.ctrlKey || event.metaKey) && event.altKey && key === 'h') {
      commands['helpCommand'](["help"], mode_message);
    }
  }, []);

  useEffect(() => {
    executeScroll();
  }, [history]);

  useEffect(() => {
    document.addEventListener('keydown', handleShortcut);
    return () => {
      document.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  return (
      <div>
        <Header />
        <div className="repl">
          <HistoryBox history={history} scrollRef={scrollRef}/>
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
export default App1;
