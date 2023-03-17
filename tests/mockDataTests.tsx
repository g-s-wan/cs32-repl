import "@testing-library/jest-dom";
import {getByText, render, screen} from "@testing-library/react";
import jest from "jest-mock";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../src/App";
import "../styles/App.css";
import { REPL } from "../src/REPL/REPL";
import {hugPromise} from "./mocking/promises/hugPromise"
import {sleepPromise} from "./mocking/promises/sleepPromise";

/*
 * This is an example test file.
 * It is meant to be a starting point for writing your own tests.
 * Feel free to research all the other functions that Jest and Testing Library provide!
 */

const genericLoadError = "An error occurred while loading the file: ";
const genericSearchError = "An error occurred while searching the file: ";
const genericViewError = "An error occurred while viewing the file: ";

Element.prototype.scrollIntoView = jest.fn();

async function prepareLoad(filePath: string) {
  const inputBox = screen.getByRole('input');
  await userEvent.click(inputBox);
  await userEvent.type(inputBox, "mock_load " + `${filePath}`);
  await userEvent.click(screen.getByRole('button'));
}

// todo: update when aria-labels are in
describe("core elements render", () => {
  test("overall page render", async () => {
    render(<App />)
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

    expect(screen.getByText(`${genericViewError}` + "No CSV file has been loaded yet.")).toBeInTheDocument();
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

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("FirstName")).toBeInTheDocument();
    expect(screen.getByText("Merigh")).toBeInTheDocument();
    expect(screen.getByText("257")).toBeInTheDocument();

  })

  test("load view load view", async () => {
    render(<App />)
    let filePath = 'data/testFile';
    const inputBox = screen.getByRole('input');
    await prepareLoad(filePath)

    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_view");
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("FirstName")).toBeInTheDocument();
    expect(screen.getByText("Merigh")).toBeInTheDocument();
    expect(screen.getByText("257")).toBeInTheDocument();

    filePath = 'data/testFile2'
    await prepareLoad(filePath);
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_view 2");
    await userEvent.click(screen.getByRole('button'));

    // todo: get tables by accessibiltiy label?
    // Expect old table to still be in the DOM
    expect(screen.getAllByText("LastName")[0]).toBeInTheDocument();
    expect(screen.getByText("Li")).toBeInTheDocument();
    expect(screen.getByText("Safae")).toBeInTheDocument();

    // Expect new table to be in the DOM
    expect(screen.getByText("Tom")).toBeInTheDocument();
    expect(screen.getByText("Fisler")).toBeInTheDocument();
    expect(screen.getByText("RhodeIsland")).toBeInTheDocument();
    expect(screen.getByText("Nowhere")).toBeInTheDocument();
  })
})

describe("loading works as expected", () => {
  test("successful load", async () => {
    render(<App />);
    const filePath = "data/testFile";
    await prepareLoad("data/testFile")

    expect(screen.getByText("Successfully loaded " + `${filePath}`)).toBeInTheDocument();
  })

  test("loading without filepath", async () => {
    render(<App />);
    await prepareLoad("")

    expect(screen.getByText("Please include a filepath when using the load_file command.")).toBeInTheDocument();
  })

  test("loading nonexistent file", async () => {
    render(<App />);
    const filePath = "data/drijleijrlyij";
    await prepareLoad(filePath);

    expect(screen.getByText(`${genericLoadError}` + "Could not find a file associated with the provided filepath. Did you make a typo?")).toBeInTheDocument();
  })

  test("loading file outside of permitted directory", async () => {
    render(<App />);
    const filePath = "sijlijsrlj";
    const permittedPath = "./data";
    await prepareLoad(filePath);

    expect(screen.getByText(`${genericLoadError}` +
        "File access denied. You tried to access " + `${filePath}` + " but only files in " + `${permittedPath}` + " are permitted."
    )).toBeInTheDocument();
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
    const col = "0";
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_search " + `${col}` + ` ${searchTerm}` + ` ${hasHeaders}`);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText("Showing search results")).toBeInTheDocument();
    expect(screen.getByRole("cell")).toBeInTheDocument();
    expect(screen.getByRole("cell").innerHTML).toEqual("Row 3: Cindy,Li,257");
    expect(screen.getByRole("table")).toBeInTheDocument();

    searchTerm = "Merigh";
    hasHeaders = "n";
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_search " + `${searchTerm}` + ` ${hasHeaders}`);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getAllByRole("cell")[1]).toBeInTheDocument();
    expect(screen.getAllByRole("cell")[1].innerHTML).toEqual("Row 1: Safae,Merigh,Marcy");
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

    expect(screen.getByText(`${genericSearchError}` + "No CSV file has been loaded yet.")).toBeInTheDocument();
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

    expect(screen.getByText(`${genericSearchError}` + "Invalid header name or column index. Did you make a typo?")).toBeInTheDocument();

  })

  // todo: improve this test?
  test("search incorrect number of parameters", async() => {
    render(<App/>);
    const searchTerm = "Merigh";
    const col = "0";
    const inputBox = screen.getByRole('input');

    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_search " + `${col} ` + `${searchTerm}`);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText("Please double check your parameters. The last argument should be either 'y' or 'n' depending on whether your file has headers.")).toBeInTheDocument();
  })

  test("search no results", async() => {
    render(<App/>);
    const searchTerm = "noresults";
    const hasHeaders = "y";
    const col = "2";
    const inputBox = screen.getByRole('input');

    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_search " + `${col} ` + `${searchTerm} ` + `${hasHeaders}`);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText("No results found")).toBeInTheDocument();

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

    expect(screen.getByText("Please double check your parameters. The last argument should be either 'y' or 'n' depending on whether your file has headers.")).toBeInTheDocument();
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

    expect(screen.getByText("Command: mode" + "Output: Mode successfully set to VERBOSE")).toBeInTheDocument();

  })

  test("verbose to brief", async () => {
    render(<App />);
    const inputBox = screen.getByRole('input');
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mode");
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mode");
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText("Mode successfully set to BRIEF")).toBeInTheDocument();
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
    expect(screen.getByText("Loaded CSV has been cleared.")).toBeInTheDocument();
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