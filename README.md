# Server
**Team members:** Safae Merigh (smerigh) and Grace Wan (gwan1)

**Link to repo:** https://github.com/cs0320-s2023/sprint-4-gwan1-smerigh

**Total estimated time:** 

* Project started: Friday, March 10, 2023
* Project submitted: Friday, March 17, 2023
* Effort: about 5 hours per day

**Project structure:**

The source code includes:
* __./src/frontend: Includes code related to the rendering of the REPL
* __./src/java: A folder containing our server-side java files from previous Sprints. This is where we put all the files that handle Parsing, Searching and communication with the Server.
* __./src/main.tsx__: This is the main source file. This is the entry point that React uses to render the app. It renders the App function.
* __./src/App.tsx__: Renders the Header, HistoryBox, and InputBox components and handles registering + resolving commands.
* __./src/frontend/components__: A folder containing our components (elements rendered by React) Header, HistoryBox, and InputBox (respectively in __Header.tsx__, __HistoryBox.tsx__, and __InputBox.tsx__)
* __./src/frontend/REPL__: a folder that contains our command-processor functions for our REPL. Each file corresponds to a function that returns a Promise which resolves to a string, which is the value to print to history when the command is done executing.  __This is our implementation of User Story 6__.
* __./data__: A folder containing three mock CSV datasets 
* __./test/*.test.ts__: Files __mode.test.tsx__, __load_file.test.tsx__, __view.test_tsx__, * * __search.test.tsx__ are dedicated to testing each REPL command.  The __components.test.tsx__ performs some general tests.  Other files contain mock data (__mock_cvs_data.ts__) or helper functions (__helperSetupMock.ts__).  There is also a   __mockDataTests.tsx__ which, along with our files in the __mocking__ subfolder take a different approach to testing.

**Design choices:**

Our design choice for this Sprint mimics our design choice for previous Sprints. The main difference is that we React-ifiyed most of the functions/files. 
*  As part of this, our search command requires that the user indicate whether the CSV has headers or not. The format for a valid search command would be: search (column name/index?) (search term) (y | n, depending on whether there are headers)
* We tried to adhere to the following rules:
  * The server returns data but does not make decisions on how the data is visualized.
  * Each entry in the History window is considered an HTML entry: it can be a regular text or text that adheres to the HTML syntax.  This is what allows us to display _view_, _search_, and _help_ results, which are HTML tables.
  * Most of the screen layout is defined in css files (flexboxes)
  - We have a REPL class that is responsible for managing registered commands. App instantiates a REPL object.
  - As stated above, each file in the ./src/REPL/promises directory corresponds to a REPLFunction that handles part of the command-processor functionality.
  - We have implemented shortcuts for all commands mentioned in the assignment specs, as well as for clearing the history and displaying a table describing baseline commands.
  - If the content in the REPL history exceeds the size of the div, we automatically scroll down to the most recent entry.
  - We used Narrator on Windows to test screen reader functionality.

# User Story 1: (End user stakeholder)

* When the _mode_ command is invoked the display mode is toggled between __brief__ and __verbose__. One can invoke _mode verbose__ or __mode brief__ to switch to a specific mode.  Invoking _mode_ with any other argument generates an error and does not change the display mode.
* When the _mode_ command executes, a message is added to the REPL History window and indicates the current display mode.
* As stated in the specs, the initial display mode is _brief_.
* When the user changes the display mode and a response is outputted, the new mode applies to that output.


# User Story 2: (End user stakeholder)
* When handleCommand() handles the __load_file__ command, it first checks that the command was followed by the filepath.  An error is generated if no filepath was given.  This check is done at the client-level.  In other words, there is no need to do a fetch and let the server reject the command.
* The associated function does a fetch to the server which returns a message about the success/failure of the file loading. 
* The __load_file__ command does not render the CSV dataset.  One needs to call __view__ or __search__ command for that.

# User Story 3: (End user stakeholder)
* The __view__ command simply performs a fetch to the server to send the dataset that was loaded by a previous call to  __load_file__ command.
* Displaying the results of the the __view__ command uses the function __csv2Table__ to generate an HTML table from the dataset.

# User Story 4: (End user stakeholder)
* The __search__ command simply performs a fetch to the server to search for a text string within the dataset that was loaded by a previous call to  __load_file__ command.
* As the first argument, the user specifies the column to limit the search to (optional)
* As the second argument, the user specifies the text to search for
* As the third argument, the user specifies whether the file has headers (y for yes, n for no)
* The search text and search column must consist of one word each.  No spaces are allowed (this is a limitation of this version)
* Displaying the results of th __search__ command uses the function __csv2Table__ to generate an HTML table from the dataset.
# User Story 5: (End user stakeholder)
* We used css to configure the div classes in such a way that the flexbox functionally manages the screen layout as one resizes the screen or performs page zooms.
* The command input box, Submit button, and part of the REPL history always remain visible on the page.
* Our chosen screenreader (Narrator on Windows) is able to vocalize all outputs and recognize critical elements on the page (e.g. the header).
* A user of the webpage can execute the baseline commands (mode, view, load, search) through short-cuts. We defined the following shortcuts:
*  useKeyPress(['m'], doToggleViewMode); ctrl-m is the same as submitting mode command
*  useKeyPress(['v'], doView);  ctrl-v is the same as submitting view command
*  useKeyPress(['f'], doSearch); ctrl-f prefills the command input box with the search command syntax
*  useKeyPress(['l'], doLoad); ctrl-l prefills the command input box with the load_file command syntax
*  useKeyPress(['r'], doClear); ctrl-r empties the History box and refreshes the page
*  useKeyPress(['?'], doHelp); ctrl-h displays help


# User Story 6: (Game Developer stakeholder)
* If a developer wanted to add a new command, they could do so by creating a file in the REPL folder and defining the functionality of their command there.  The developer can use the existing files as a template to write/structure the code for the new function.  All of the **Promise.ts files follow the same general structure.
* Once the command's Promise.ts file is defined in the REPL folder, the developer can import it into __App.tsx__ and then add one line to register the new command. To add the command to the registry, the developer adds: `repl.registerCommand(<name command>, f)` in __App.tsx__.
* Some files such as __viewPromise.ts__ and __searchPromise.ts__ use the helper function __csv2Table.ts__ to format the response (the dataset received from the server) as HTML before _resolving_ the promise.


# User Story 7: (Developer stakeholder)
* We made every effort to name functions in an easily comprehensible way.
* Each function has a substantial number of comments.

**Bugs/Limitations:**

* The use of _dangerouslySetInnerHTML_ in __HistoryBox.tsx__ made it quite straightforward to format the CSV data returned by the __view__ and __search__ commands.  However, nothing was done to handle the case where CSV data contained strings that may be mistaken for HTML tags.  For instance if a column contained HTML-looking tags, visualization would have unexpected behavior.  One would need to do some text replacing/sanitization to ensure that the displayed HTML is always clean.
* The command line arguments are assumed to be exactly one word each.  We do not handle spaces within filepaths, search terms, or column names.
* Because we are reusing backend code, the limitations of that code still apply. For example, we require users to input their arguments in a specific order and to tell us whether their file has headers or not.
* Requiring the addition of a new file for each new command could lead to a very large codebase.
* Scrolling without the trackpad is difficult, but we hope that automatically scrolling to the bottom of the REPL history alleviates this.
* No known bugs.

**Tests:**

* We have a total of 37 tests spread over 6 files.
- We took two slightly different approaches to testing:
  - The first approach focuses on mocking the JSON responses sent from the API. It involves a collection of URLs mapped to expected JSON responses.
  - These tests can be found under __./src/tests/mockDataTests.tsx__
  - The second approach focuses on mocking the fetch() function as closely as possible, ensuring that it is, for example, called the correct number of times.
  - These tests have been separated into __./src/tests/components.test.tsx__, __./src/tests/load_file.test.tsx__, __./src/tests/mode.test.tsx__, __./src/tests/search.test.tsx__, __./src/tests/view.test.tsx__
* Both approaches test success and error cases of each command in the specs (load, view, search, and mode). __mockDataTests.tsx__ also contains tests for registering commands, the help command, and shortcuts.
* __./test/*.test.ts__: Files __mode.test.tsx__, __load_file.test.tsx__, __view.test_tsx__, * * __search.test.tsx__ are dedicated to testing each REPL command.  The __components.test.tsx__ performs some general tests.  Other files contain mock data (__mock_cvs_data.ts__) or helper functions (__helperSetupMock.ts__).
 * We tried to test every aspect of what could get displayed on the screen.
 * For functions that do not make any fetch calls, we check that what gets displayed matches the expected.  This applies to the __mode__ command as well as tests that check that the screen contains the required components (History box, command button, and input box).
 * In the second approach, for functions that make fetch calls, the use of "global.fetch = vi.fn()" allows mocking calls.  Our tests consist of issuing the command, asserting that fetch was called with the right url, and that the response was as expected.
 * We made a test for when an unexpected situation (such as an impossible connection due to lack of network connection to the server) occurs.  The error message for this can be different based on the OS/Client, etc... But we did test that there is a reject of the promise.

**How to:**
- Run tests: The __package.json__ contains a definition of "test" as __vitest__.  Therefore, to run tests, one issues the command __npm run test__.
  - Alternatively: 
    - Navigate to the `./src/tests` directory. In the Project Explorer panel, right click on the desired test, then click "Run"
    - Available tests:
      - components.test.tsx
      - load_file.test.tsx
      - mode.test.tsx
      - search.test.tsx
      - view.test.tsx
      - mockDataTests.tsx
- Run the program: The __package.json__ contains a definition of "dev" and "start" as __vite__.  Therefore, to build the solution, 1) navigate to the `./src/backend/java/Server` file and execute main(). 2) In a terminal, navigate to the root of this project, run `npm i`, then `npm run dev`
