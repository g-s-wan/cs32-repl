import "@testing-library/jest-dom";
import { render, screen, waitFor} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import jest from "jest-mock";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../src/App";
import "../src/frontend/styles/App.css";
import { REPL } from "../src/frontend/REPL/REPL";
import {hugPromise} from "./mocking/promises/hugPromise"
import {sleepPromise} from "./mocking/promises/sleepPromise";

/**
 * Test suite for the command-processor
 */

// General errors
const genericLoadError = "An error occurred while loading the file: ";
const genericSearchError = "An error occurred while searching the file: ";
const genericViewError = "An error occurred while viewing the file: ";

// Tests will fail if we don't mock automatic scrolling
Element.prototype.scrollIntoView = jest.fn();

// Helper function that (mock) loads a file
async function prepareLoad(filePath: string) {
  const inputBox = screen.getByRole('input');
  await userEvent.click(inputBox);
  await userEvent.type(inputBox, "mock_load " + `${filePath}`);
  await userEvent.click(screen.getByRole('button'));
}

describe("core elements render", () => {
  test("overall page render", async () => {
    render(<App />)
    // Core elements are on the page
    expect(screen.getByRole("header")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("input")).toBeInTheDocument();
  })
});

describe("viewing works as expected", () => {
  test("view before load", async () => {
    render(<App />)
    const inputBox = screen.getByRole('input');

    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_view beforeload");
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole("main")).toContainHTML(`${genericViewError}` + "No CSV file has been loaded yet.");
  })

  test("successful view", async () => {
    // Load existing file
    render(<App />)
    const filePath = 'data/testFile';
    const inputBox = screen.getByRole('input');
    await prepareLoad(filePath)

    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_view");
    await userEvent.click(screen.getByRole('button'));

    // Test at least one value from each row and column
    // Calling expect() on EVERY cell could be expensive for large CSVs
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("table")).toContainHTML("FirstName");
    expect(screen.getByRole("table")).toContainHTML("Merigh");
    expect(screen.getByRole("table")).toContainHTML("257");
    expect(screen.getByRole("table")).toContainHTML("Offcampus");
  })

  test("load view load view", async () => {
    render(<App />)
    let filePath = 'data/testFile';
    const inputBox = screen.getByRole('input');
    await prepareLoad(filePath)

    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_view");
    await userEvent.click(screen.getByRole('button'));
    
    // Test at least one value from each row and column
    // Calling expect() on EVERY cell could be expensive for large CSVs
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("table")).toContainHTML("FirstName");
    expect(screen.getByRole("table")).toContainHTML("Merigh");
    expect(screen.getByRole("table")).toContainHTML("257");

    filePath = 'data/testFile2'
    await prepareLoad(filePath);
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_view 2");
    await userEvent.click(screen.getByRole('button'));

    // Expect old table to still be in the DOM
    expect(screen.getAllByRole("table")[0]).toBeInTheDocument();
    expect(screen.getAllByRole("table")[0]).toContainHTML("Li");
    expect(screen.getAllByRole("table")[0]).toContainHTML("Safae");

    // Expect new table to be in the DOM
    expect(screen.getAllByRole("table")[1]).toBeInTheDocument();
    expect(screen.getAllByRole("table")[1]).toContainHTML("Tom");
    expect(screen.getAllByRole("table")[1]).toContainHTML("Fisler");
    expect(screen.getAllByRole("table")[1]).toContainHTML("RhodeIsland");
    expect(screen.getAllByRole("table")[1]).toContainHTML("Nowhere");
  })
})

describe("loading works as expected", () => {
  test("successful load", async () => {
    render(<App />);
    const filePath = "data/testFile";
    await prepareLoad("data/testFile")

    expect(screen.getByRole("main")).toContainHTML("Successfully loaded " + `${filePath}`);     
  })

  test("loading without filepath", async () => {
    render(<App />);
    await prepareLoad("")

    expect(screen.getByRole("main")).toContainHTML("Please include a filepath when using the load_file command.");
  })

  test("loading nonexistent file", async () => {
    render(<App />);
    const filePath = "data/drijleijrlyij";
    await prepareLoad(filePath);

    expect(screen.getByRole("main")).toContainHTML(`${genericLoadError}` + "Could not find a file associated with the provided filepath. Did you make a typo?");
  })

  test("loading file outside of permitted directory", async () => {
    render(<App />);
    const filePath = "sijlijsrlj";
    const permittedPath = "./data";
    await prepareLoad(filePath);

    expect(screen.getByRole("main")).toContainHTML(`${genericLoadError}` +
        "File access denied. You tried to access " + `${filePath}` + " but only files in " + `${permittedPath}` + " are permitted."
    )
  })
})

describe("searching works as expected", () => {
  test("successful search", async () => {
    render(<App />)
    // Need to load a file first
    const inputBox = screen.getByRole('input');
    const filePath = 'data/testFile';
    await prepareLoad(filePath);

    let searchTerm = "Cindy";
    let hasHeaders = "y";
    const col = "FirstName";
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_search " + `${col}` + ` ${searchTerm}` + ` ${hasHeaders}`);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole("main")).toContainHTML("Showing search results");
    expect(screen.getByRole("cell")).toBeInTheDocument();
    expect(screen.getByRole("cell").innerHTML).toEqual("Cindy,Li,257");
    expect(screen.getByRole("table")).toBeInTheDocument();

    // Second search just to be safe
    searchTerm = "Merigh";
    hasHeaders = "n";
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_search " + `${searchTerm}` + ` ${hasHeaders}`);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getAllByRole("cell")[1]).toBeInTheDocument();
    expect(screen.getAllByRole("cell")[1].innerHTML).toEqual("Safae,Merigh,Marcy");
    expect(screen.getAllByRole("table")[1]).toBeInTheDocument();
  })

  test("search before load", async () => {
    render(<App/>);
    let searchTerm = "beforeload";
    let hasHeaders = "y";
    const inputBox = screen.getByRole('input');

    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_search " + `${searchTerm}` + ` ${hasHeaders}`);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole("main")).toContainHTML(`${genericSearchError}` + "No CSV file has been loaded yet.");
  })

  test("search nonexistent column index/name", async() => {
    render(<App/>);
    const searchTerm = "Merigh";
    const hasHeaders = "y";
    const col = "eu49ueriyli";
    const inputBox = screen.getByRole('input');

    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_search " + `${col} ` + `${searchTerm}` + ` ${hasHeaders}`);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole("main")).toContainHTML(`${genericSearchError}` + "Invalid header name or column index. Did you make a typo?");

  })

  test("search incorrect number of parameters", async() => {
    render(<App/>);
    const searchTerm = "Merigh";
    const col = "0";
    const inputBox = screen.getByRole('input');

    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_search " + `${col} ` + `${searchTerm}`);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole("main")).toContainHTML("Please double check your parameters. The last argument should be either 'y' or 'n' depending on whether your file has headers.");
  })

  test("search no results", async() => {
    render(<App/>);
    const searchTerm = "noresults";
    const hasHeaders = "y";
    const inputBox = screen.getByRole('input');

    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_search " + `${searchTerm} ` + `${hasHeaders}`);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole("main")).toContainHTML("No results found");
  })

  test("search hasHeaders is not y or n", async() => {
    render(<App/>);
    const searchTerm = "257";
    const hasHeaders = "epoerptok";
    const col = "2";
    const inputBox = screen.getByRole('input');

    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_search " + `${col} ` + `${searchTerm} ` + `${hasHeaders}`);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole("main")).toContainHTML("Please double check your parameters. The last argument should be either 'y' or 'n' depending on whether your file has headers.");  
  })
}
)

describe("mode works as expected", () => {
  test("brief to verbose", async () => {
    render(<App />);
    const inputBox = screen.getByRole('input');
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mode");
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole("main")).toContainHTML("Command: mode");
    expect(screen.getByRole("main")).toContainHTML("Output: Mode successfully set to VERBOSE");
  })

  test("verbose to brief", async () => {
    render(<App />);
    const inputBox = screen.getByRole('input');
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mode VERBOSE");
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mode");
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole("main")).toContainHTML("Mode successfully set to BRIEF");
  })
})

describe("clearing works as expected", () => {
  test("successful clear", async () => {
    render(<App />)
    const inputBox = screen.getByRole('input');
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mode BRIEF");
    await userEvent.click(screen.getByRole('button'));

    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_clear");
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole("main")).toContainHTML("Loaded CSV has been cleared.");
  })
})

describe("registering is functional", () => {
  test("successful register", async () => {
    const repl = new REPL();
    repl.registerCommand("hug", hugPromise);

    expect(repl.registeredCommands.size).toEqual(1);
    const noHug = await repl.executeCommand("hug");
    expect(noHug).toEqual("No hug for you. :(");
    const hug = await repl.executeCommand("hug you");
    expect(hug).toEqual("Giving you a big hug!");

    repl.registerCommand("sleep", sleepPromise);

    expect(repl.registeredCommands.size).toEqual(2);
    const noTime = await repl.executeCommand("sleep");
    expect(noTime).toEqual("Please provide either AM or PM");

    const notSleeping = await repl.executeCommand("sleep AM");
    expect(notSleeping).toEqual("Wide awake!");

    const sleeping = await repl.executeCommand("sleep PM");
    expect(sleeping).toEqual("Snoring sounds");

    const fakeTime = await repl.executeCommand("sleep allthetime");
    expect(fakeTime).toEqual("Did you provide a real time?");
  })
})

describe("unregistered command", () => {
  test("unregistered command displays error message", async () => {
    render(<App/>)
    const inputBox = screen.getByRole('input');
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "ertiljleijryil");
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole("main")).toContainHTML('Could not recognize that command. Submit "help" to view a list of registered commands.');
  })
})

describe("help works as expected", () => {
  test("help displays table", async() => {
    render(<App/>)
    const inputBox = screen.getByRole('input');
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "help");
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByLabelText("help")).toBeInTheDocument();
  })
})

describe("shortcuts work as expected", () => {
  test("ctrl q - help", async () => {
    render(<App/>)
    const inputBox = screen.getByRole('input');
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_load data/testFile");
    await userEvent.click(screen.getByRole('button'));

    // Mock the Ctrl + Q
    act(() => { document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "q",
          ctrlKey: true,
        })
    )});

    await waitFor(() => expect(screen.getByRole("main")).toContainHTML("Command"));
    await waitFor(() => expect(screen.getByRole("main")).toContainHTML("Description"));
    await waitFor(() => expect(screen.getByLabelText("help")).toBeInTheDocument());
  })

  test("ctrl m - mode", async () => {
    render(<App/>)

    // Ensure that our test doesn't fail because we were in an unexpected mode
    const inputBox = screen.getByRole('input');
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mode BRIEF");
    await userEvent.click(screen.getByRole('button'));

    // Mock the Ctrl + M
    act(() => { document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "m",
          ctrlKey: true,
        })
    )});

    await waitFor(() => expect(screen.getByRole("main")).toContainHTML("Mode successfully set to VERBOSE"));
  })

  test("ctrl l - load", async () => {
    render(<App/>)

    // Mock the Ctrl + L
    act(() => { document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "l",
          ctrlKey: true,
        })
    )});

    await waitFor(() => expect(screen.getByRole("input")).toContainHTML("load_file ./data/"));
  })
})