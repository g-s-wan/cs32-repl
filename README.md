# Server
**Team members:** Safae Merigh (smerigh) and Grace Wan (gwan1)

**Link to repo:** https://github.com/cs0320-s2023/sprint-4-gwan1-smerigh

**Total estimated time:** 

* Project started: Friday, March 7, 2023
* Project submitted: Friday, March 17, 2023
* Effort: about 5 hours per day

**Project structure:**

The source code includes:

* __./src/main.tsx__: This is the main source file. This is the entry point that React uses to render the app. It renders the App function.
* __./src/App.tsx__: Main application component (parent of other components)
* __./src/components__: A folder containing our components (elements rendered by React) Header, HistoryBox, and InputBox (respectively in __Header.tsx__, __HistoryBox.tsx__, and __InputBox.tsx__)
* __./src/java__: A folder containing our server-side java files from previous Sprints. This is were we put all the files that handle Parsing, Searching and communication with the Server.
* __./src/REPL__: a folder that contains our command-processor functions for our REPL. Each file corresponds to a function that returns a Promise which resolves to a string, which is the value to print to history when the command is done executing.  __This is our implementation of User Story 6__.

* __./data__: A folder containing two mock CSV datasets 
* __./test/*.test.ts__: Files __mode.test.tsx__, __load_file.test.tsx__, __view.test_tsx__, * * __search.test.tsx__ are dedicated to testing each REPL command.  The __components.test.tsx__ performs some general tests.  Other files contain mock data (__mock_cvs_data.ts__) or helper functions (__helperSetupMock.ts__).  There is also a   __mockDataTests.tsx__ which, along with for files in the __mocking__ subfolder take a different approach to testing.

**Design choices:**

Our design choice for this Sprint mimics our design choice for previous Sprints. The main difference is that we React-ifiyed most of the functions/files.  We tried to adhere to the following rules:
* The server returns data but does not make decisions on how the data is visualized.
* Each entry in the History window is considered an HTML entry: it can be a regular text or text that adheres to the HTML syntax.  This is what allows us to display _view_, _search_, and _help_ results are HTML tables.
* Of the HTML formatting is done in css files.
* Most of the screen layout is defined in css files (flexboxes)
* 

# User Story 1: (End user stakeholder)

* When the _mode_ command is invoked the display mode is toggled between __brief__ and __verbose__. One can invoke _mode verbose__ or __mode brief__ to switch to a specific mode.  Invoking _mode_ with any other argument generates an error and does not change the display mode.
* When the _mode_ command executes, a message is added to the REPL History window and indicates the current display mode.
* As stated in the specs, the initial display mode is _brief_.
* When the user changes the display _mode_, the new display mode applies even to feedback itself that the _mode_ changed.


# User Story 2: (End user stakeholder)
* When the _handleCommand_ handles the __load_file__ command, it first checks that the command was followed by the filepath.  An error is generated if no filepath was given.  This check is done at the client-level.  In other words, there is no need to do a fetch and let the server reject the command.
* The associated function does a fetch to the server which returns a message about the success/failure of the file loading. 
* The __load_file__ command does not render the CSV dataset.  One needs to call __view__ or __search__ command for that.

# User Story 3: (End user stakeholder)
* The __view__ command simply performs a fetch to the server to send the dataset that was loaded by a previous call to  __load_file__ command.
* Displaying the results of the the __view__ command uses the function __csv2Table__ to generate an HTML table from the dataset.

# User Story 4: (End user stakeholder)
* The __search__ command simply performs a fetch to the server to search for a text string within the dataset that was loaded by a previous call to  __load_file__ command.
* As the first argument, the user specifies the column to limit the search to
* As the second argument, the user specifies the text to search for
* The search text and search column must consist of one word each.  No spaces are allowed (this is a limitation of this version)
* Displaying the results of the the __search__ command uses the function __csv2Table__ to generate an HTML table from the dataset.
# User Story 5: (End user stakeholder)
* We used css to configure the div classes in such a way that the flexbox functionaly manages the screen layout as one resizes the screen or performs page zooms.
* A user of the webpage can excute the baseline commands (mode, view, load, search) through short-cuts. For example: useKeyPress(['m'], doToggleViewMode); allows the user to switch the mode without having to type in mode.  We are defined the following shortcuts:
*  useKeyPress(['m'], doToggleViewMode); ctrl-m is the same as submitting mode command
*  useKeyPress(['v'], doView);  ctrl-v is the same as submitting view command
*  useKeyPress(['f'], doSearch); ctrl-f prefills the command input box with the search command syntax
*  useKeyPress(['l'], doLoad); ctrl-l prefills the command input box with the load_file command syntax
*  useKeyPress(['r'], doClear); ctrl-r empties the History box
*  useKeyPress(['?'], doHelp); ctrl-h displays help


# User Story 6: (Game Developer stakeholder)
* If a developer wanted to add a new command, it can do so by creating a file in the REPL folder and defining the functionnality of its command there.  The developer can use the existing files are as a template to write/structure the code for the new function.  All of the **Promise.ts files are similar to each other.
* Once the command's nnnPromise.ts file is defined in the REPL folder, one imports it into __App.tsx__ and then adds one line to register the new command.  To add the command to the registery of command, the developper add it by doing repl.registerCommand(<name command>, f) in __App.tsx__.
* Some files such as __viewPromise.ts__ and __searchPromise.ts__ used the helper function __csv2Table.ts__ to format the response (the dataset received from the server) as HTML before _resolving_ the promise.


# User Story 7: (Developer stakeholder)
* We made every effort to name functions in a easy to understand way.
* Each function has a substancial amount of comments.

**Bugs/Limitations:**

* The use of _dangerouslySetInnerHTML_ in __HistoryBox.tsx__ made it quite straightforward to format the CSV data returned by the __view__ and __search__ commands.  However, nothing was done to handle the case where CSV data contains strings that may be mistaken for HTML tags.  For instance if a column contains HTML-looking tags, visualization would have off behavior.  One would need to do some text replacing to ensure that the displayed HTML is always clean.
* The command line arguments are assumed to be exactly one word each.  We do not handle spaces within filepaths, search terms, or column names.

**Tests:**

* We have a total of 37 tests spread over 6 files.
* __./test/*.test.ts__: Files __mode.test.tsx__, __load_file.test.tsx__, __view.test_tsx__, * * __search.test.tsx__ are dedicated to testing each REPL command.  The __components.test.tsx__ performs some general tests.  Other files contain mock data (__mock_cvs_data.ts__) or helper functions (__helperSetupMock.ts__).  There is also a   __mockDataTests.tsx__ which, along with for files in the __mocking__ subfolder take a different approach to testing.
 * We tried to test every aspect of what could get displayed on the screen.
 * For functions that do not make any fetch calls, check that what gets displayed matches the expected.  This applies to the __mode__ command as well as tests that check that the screen contains the required components (History box, command button, and input box).
 * For functions that make fetch calls, the use of "global.fetch = vi.fn()" allows mocking calls.  Our tests consist of issuing the command, asserting that fetch was called with the right url, and that the response was as expected.
 * We made a test when unexpected situation such as an impossible connection due to lack of network connection to the server.  The error message for this can be different based on the OS/Client, etc... But we did test that there a reject of the promise.

**How to:**
- Run tests: The __package.json__ contains a definition of "test" as __vitest__.  Therefore, to run tests, one issues the command __npm run test__.
- Run the program in dev mode: The __package.json__ contains a definition of "dev" and "start" as __vite__.  Therefore, to build the solution, one issues the command __npm run dev__ or __npm run start__.
Build and run the program: The __package.json__ contains a definition of "build" as __tsc && vite build__.  Therefore, to build the solution, one issues the command __npm run test__.