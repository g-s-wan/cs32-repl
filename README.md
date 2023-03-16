# Server
**Team members:** Safae Merigh (smerigh) and Grace Wan (gwan1)

**Link to repo:** https://github.com/cs0320-s2023/sprint-4-gwan1-smerigh

**Total estimated time:** 

* Project started: Friday
* Project submitted: Friday, March 17, 2023
* Effort: about 5 hours per day
**Project structure:**

The source code includes:

./src/main.tsx: This is the main source file. This is the entry point that React uses to render your app. It calls the App function.
./src/App.tsx: 
./src/components: A folder containing our components (elementds rendered by React) Header, HistoryBox, and InputBox (respectively in Header.tsx, HistoryBox.tsx, and InputBox.tsx)
./src/java: A folder containing our java files from previous Sprints. This is were we put all the files that handle Parsing, Searching and communication with the Server.
./src/REPL: a folder that contains our command-processor functions for our REPL. Each file corresponds to a function that returns a Promise which resolves to a string, which is the value to print to history when the command is done executing.

./data: A folder containing two mock CSV datasets 
./test/test.main.ts: A Jest test file that calls all of the functions in ./src/main.ts.

**Design choices:**
Our design choice for this Sprint mimics our design choice for previous Sprints. The main difference is that we React-ifiyed most of the functions/files.

# User Story 1: (End user stakeholder)

* When the _mode_ command is invoked the display mode is toggled between __brief__ and __verbose__. Invoking _mode_ with any other argument generates an error and does not change the display mode.
* When the _mode_ command executes, a message is added to the REPL History window and indicates the current display mode.  The message has a different color from other messages. This points out visually to the user the point where in the history the display mode changed.
* As stated in the specs, the initial display mode is _brief_.


# User Story 2: (End user stakeholder)
* When the _handleCommand_ handles the __load_file__ command, it first checks that the command was followed by the filepath.  An error is generated if no filepath was given.
* The _handleCommand_ command then calls _loadCSVFile_ function.  
* _loadCSVFile_ returns a CSV dataset, which consists of a row header and data rows. 
* The __load_file__ command does not render the CSV dataset.  One needs to call __view__ command for that.  In _verbose_ mode, the __load_file__ command gives a message on whether the loading of the file was successful.  In all cases, a message is added to the REPL display window if an error was encounted duing the reading of the CSV data.

# User Story 3: (End user stakeholder)
* When the _handleCommand_ handles the __view__ command, it simply uses the _csvDataset_ loaded by a previous call to  __load_file__ command.
* Displaying the results of the the __view__ command uses the function _buildHtmlTable_ to generate an HTML table from the dataset.

# User Story 4: (End user stakeholder)
* When the _executeCommand_ handles the __search__ command, it simply uses the _csvDataset_ loaded by a previous call to  __load_file__ command.
* Like the  the __view__ command, displaying the results of the the __search__ command uses the function _buildHtmlTable_ to generate an HTML table from the dataset.
* In the current version, __search__ function invokes a _searchDataset_ function which would do the search and return another dataset.  However, since we were not supposed to reimplement the search function, we just returns the same dataset.

# User Story 4: (End user stakeholder)
* A user of the webpage can excute the baseline commands (mode, view, load, search) through short-cuts. For example: useKeyPress(['m'], doToggleViewMode); allows the user to switch the mode without having to type in mode.


# User Story 6: (Game Developer stakeholder)
* If a developer wanted to add a new command, it can do so by creating a file in the REPL folder and defining the functionnality of its command there.
* To add the command to the registery of command, the developper add it by doing repl.registerCommand(<name command>, f) in __App.tsx__.


# User Story 6: (Developer stakeholder)
* We made every effort to name functions in a easy to understand way.
* Each function has a substancial amount of comments.
* As show by the _Jest_ report, the testing module covered all functions.  It also covers all but 4 statements.  The 4 statements that were not covered are _null_ tests which stop the linter from saying that we are using a variable that is possibly a _null_.

**Bugs/Limitations:**

**Tests:**

**How to:**
- Run tests:
- Build and run the program: 