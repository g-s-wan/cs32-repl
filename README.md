# Server
**Team members:** Safae Merigh (smerigh) and Grace Wan (gwan1)

**Link to repo:** https://github.com/cs0320-s2023/sprint-4-gwan1-smerigh

**Total estimated time:** 

* Project started: Friday, March 10, 2023
* Project submitted: Friday, March 17, 2023
* Effort: about 5 hours per day

**Project structure:**

The source code includes:

./src/main.tsx: This is the main source file. This is the entry point that React uses to render our app. It calls the App function.
./src/App.tsx: Renders the Header, HistoryBox, and InputBox components and handles registering + resolving commands.
./src/components: A folder containing our components (elements rendered by React) Header, HistoryBox, and InputBox (respectively in Header.tsx, HistoryBox.tsx, and InputBox.tsx)
./src/java: A folder containing our java files from previous Sprints. This is where we put all the files that handle Parsing, Searching and communication with the Server.
./src/REPL: a folder that contains our command-processor functions for our REPL. Each file corresponds to a function that returns a Promise which resolves to a string, which is the value to print to history when the command is done executing.

./data: A folder containing two mock CSV datasets 
./test/test.main.ts: A Jest test file that calls all of the functions in ./src/main.ts.

**Design choices:**
- Our design choice for this Sprint mimics our design choice for previous Sprints. The main difference is that we React-ifiyed most of the functions/files.
  - As part of this, our search command requires that the user indicate whether the CSV has headers or not. The format for a valid search command would be:
    - search <column name/index?> <searchTerm> <y | n, depending on whether there are headers>
- We have REPL class that is responsible for managing registered commands. App instantiates a REPL object.
- As stated above, each file in the ./src/REPL/promises directory corresponds to a REPLFunction that handles part of the command-processor functionality.
- We have implemented shortcuts for all commands mentioned in the assignment specs, as well as for clearing the history and displaying a table describing baseline commands.
- If the content in the REPL history exceeds the size of the div, we automatically scroll down to the most recent entry.
- We used Narrator on Windows to test screen reader functionality.

# User Story 1: (End user stakeholder)

* When the _mode_ command is invoked the display mode is toggled between __brief__ and __verbose__. Invoking _mode_ with any other argument generates an error and does not change the display mode.
* As stated in the specs, the initial display mode is _brief_.

# User Story 2: (End user stakeholder)
* When the _handleCommand_ handles the __load_file__ command, it first checks that the command was followed by the filepath.  An error is generated if no filepath was given.
* The _handleCommand_ command then calls _loadCSVFile_ function.  
* _loadCSVFile_ returns a CSV dataset, which consists of a row header and data rows. 
* The __load_file__ command does not render the CSV dataset.  One needs to call __view__ command for that.  In _verbose_ mode, the __load_file__ command gives a message on whether the loading of the file was successful.  In all cases, a message is added to the REPL display window if an error was encountered during the reading of the CSV data.

# User Story 3: (End user stakeholder)
* When the _handleCommand_ handles the __view__ command, it simply uses the _csvDataset_ loaded by a previous call to  __load_file__ command.
* Displaying the results of the __view__ command uses the function _buildHtmlTable_ to generate an HTML table from the dataset.

# User Story 4: (End user stakeholder)
* When the _executeCommand_ handles the __search__ command, it simply uses the _csvDataset_ loaded by a previous call to  __load_file__ command.
* Like the __view__ command, displaying the results of __search__ command uses the function _buildHtmlTable_ to generate an HTML table from the dataset.

# User Story 5: (End user stakeholder)
* A user of the webpage can execute the baseline commands (mode, view, load, search) through short-cuts. For example: useKeyPress(['m'], doToggleViewMode); allows the user to switch the mode without having to type in mode.
* The command input box, Submit button, and part of the REPL history always remain visible on the page.
* Our chosen screenreader (Narrator on Windows) is able to vocalize all outputs and recognize critical elements on the page (e.g. the header).

# User Story 6: (Game Developer stakeholder)
* If a developer wanted to add a new command, they could do so by creating a file in the REPL folder and defining the functionality of the desired command there.
* To add the command to the registry of commands, the developer should call `repl.registerCommand(<name command>, f)` in __App.tsx__.

# User Story 6: (Developer stakeholder)
* We made every effort to name functions in an easy-to-understand way.
* Each function has a substantial number of comments.
* As show by the _Jest_ report, the testing module covered all functions.  It also covers all but 4 statements.  The 4 statements that were not covered are _null_ tests which stop the linter from saying that we are using a variable that is possibly a _null_.

**Bugs/Limitations:**
* Because we are reusing backend code, the limitations of that code still apply. 
  * For example, we require users to input their arguments in a specific order and require them to tell us whether their file has headers or not.
* Requiring the addition of a new file for each new command could lead to a very large codebase.
* Scrolling without the trackpad is difficult, but we hope that automatically scrolling to the bottom of the REPL history alleviates this.
* No known bugs.

**Tests:**
- We took two slightly different approaches to testing:
  - The first approach focuses on mocking the JSON responses sent from the API. It involves a collection of URLs mapped to expected JSON responses.
    - These tests can be found under `./src/tests/mockDataTests.tsx`
  - The second approach focuses on mocking the fetch() function as closely as possible, ensuring that it is, for example, called the correct number of times.
    - These tests have been separated into `./src/tests/components.test.tsx`, `./src/tests/load_file.test.tsx`, `./src/tests/mode.test.tsx`, `./src/tests/search.test.tsx`, `./src/tests/view.test.tsx`
Both approaches test success and error cases of each command in the specs (load, view, search, and mode). `mockDataTests.tsx` also contains tests for registering commands, the help command, and shortcuts.

**How to:**
- Run tests: Navigate to the `./src/tests` directory. In the Project Explorer panel, right click on the desired test, then click "Run"
  - Available tests: 
    - components.test.tsx
    - load_file.test.tsx
    - mode.test.tsx
    - search.test.tsx
    - view.test.tsx
    - mockDataTests.tsx
- Build and run the program: 1) Navigate to the ./src/backend/java/Server file and execute main(). 2) In a terminal, navgiate to the root of this project, run `npm i`, then `npm run dev`