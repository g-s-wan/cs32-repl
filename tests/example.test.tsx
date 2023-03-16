import "@testing-library/jest-dom";
import jest from "jest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../src/components/Header";
import React, {useState, useEffect, useCallback, useRef} from "react";
import HistoryBox from "../src/components/HistoryBox";
import InputBox from "../src/components/InputBox";
import App from "../src/App";
import "../styles/App.css";

/*
 * This is an example test file.
 * It is meant to be a starting point for writing your own tests.
 * Feel free to research all the other functions that Jest and Testing Library provide!
 */

const genericLoadError = "An error occurred while loading the file: ";
const genericSearchError = "An error occurred while searching the file: ";
const genericViewError = "An error occurred while viewing the file: ";

async function prepareLoad(filePath: string) {
  const inputBox = screen.getByRole('input');
  await userEvent.click(inputBox);
  await userEvent.type(inputBox, "mock_load " + `${filePath}`);
  await userEvent.click(screen.getByText('Submit'));
}

// todo: update when aria-labels are in
describe("core elements render", () => {
  test("overall page render", async () => {
    render(<App />)
    expect(screen.getByText(/REPL/i)).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();

    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  })
});

describe("viewing works as expected", () => {
  test("view before load", async () => {
    render(<App />)
    const inputBox = screen.getByRole('input');

    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_view beforeload");
    await userEvent.click(screen.getByText('Submit'));

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
    await userEvent.click(screen.getByText('Submit'));

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
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("FirstName")).toBeInTheDocument();
    expect(screen.getByText("Merigh")).toBeInTheDocument();
    expect(screen.getByText("257")).toBeInTheDocument();

    // unhandled request?
    filePath = 'data/testFile2'
    await prepareLoad(filePath);
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_view");
    await userEvent.click(screen.getByText('Submit'));

    // todo: get tables by accessibiltiy label?
    // Expect old table to still be in the DOM
    expect(screen.getByText("FirstName")).toBeInTheDocument();
    expect(screen.getByText("Merigh")).toBeInTheDocument();
    expect(screen.getByText("257")).toBeInTheDocument();

    // Expect new table to be in the DOM
    expect(screen.getByText("Tom")).toBeInTheDocument();
    expect(screen.getByText("Wan")).toBeInTheDocument();
    expect(screen.getByText("Cindy")).toBeInTheDocument();
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
    const hasHeaders = "y";
    const col = "0";
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_search " + `${col}` + ` ${searchTerm}` + ` ${hasHeaders}`);
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText("Showing search results")).toBeInTheDocument();
    // todo: HTML makes it difficult to get by text, but the output of the test shows this is present
    expect(screen.getByText("Row 3: Cindy,Li,257")).toBeInTheDocument();
    expect(screen.getByRole("view-result-table")).toBeInTheDocument();

    searchTerm = "Merigh";
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_search " + `${searchTerm}` + ` ${hasHeaders}`);
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText("Row 1: Safae,Merigh,Marcy")).toBeInTheDocument();
  })

  test("search before load", async () => {

  })

  test("search nonexistent column index/name", async() => {

  })

  test("search incorrect number of parameters", async() => {

  })

  test("search no results", async() => {

  })

  test("search hasHeaders is not y or n", async() => {

  })
}
)

describe("mode works as expected", () => {
  test("brief to verbose", async () => {
    render(<App />);
    const inputBox = screen.getByRole('input');
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mode");
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText("Command: mode" + "Output: Mode successfully set to VERBOSE")).toBeInTheDocument();

  })

  test("verbose to brief", async () => {
    render(<App />);
    const inputBox = screen.getByRole('input');
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mode");
    await userEvent.click(screen.getByText('Submit'));
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mode");
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText("Mode successfully set to BRIEF")).toBeInTheDocument();
  })
})

describe("clearing works as expected", () => {
  test("successful clear", async () => {
    render(<App />)
    const inputBox = screen.getByRole('input');
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "mock_clear");
    await userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText("Loaded CSV has been cleared.")).toBeInTheDocument();
  })
})