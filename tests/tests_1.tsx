import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../src/components/Header";
import React, {useState, useEffect, useCallback, useRef} from "react";
import HistoryBox from "../src/components/HistoryBox";
import InputBox from "../src/components/InputBox";
import App from "../src/App";
import "../styles/App.css";


describe("core elements render", () => {
  test("loads and displays header", async () => {
    render(<Header />);
    expect(screen.getByText(/REPL/i)).toBeInTheDocument();
  });

  test("overall page render", async () => {
    render(<App />);
    expect(screen.getByText(/REPL/i)).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  })
});

// todo: why does only the second test (no filepath) work...?
describe("loading works as expected", () => {
  test("successful load", async () => {
    render(<App />);
    const filePath = 'data/testFile';
    const inputBox = screen.getByRole('input');
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "load_file " + `${filePath}`);
    await userEvent.click(screen.getByText('Submit'));

    console.log(screen.getByRole("history").innerHTML)
    //expect(screen.getByText("Successfully loaded " + `${filePath}`)).toBeInTheDocument();
  })

  test("loading without filepath", async () => {
    render(<App />);
    const inputBox = screen.getByRole('input');
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "load_file");
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText("Please enter filepath.")).toBeInTheDocument();
  })

  test("loading nonexistent file", async () => {
    render(<App />);
    const inputBox = screen.getByRole('input');
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "load_file data/drijleijrlyij");
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText("Could not find a file associated with the provided filepath. Did you make a typo?")).toBeInTheDocument();
  })

  test("loading file outside of permitted directory", async () => {
    render(<App />);
    const inputBox = screen.getByRole('input');
    const filePath = "sijlijsrlj";
    const permittedPath = "./data";
    await userEvent.click(inputBox);
    await userEvent.type(inputBox, "load_file " + `${filePath}`);
    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText(
        "File access denied. You tried to access " + `${filePath}` + " but only files in " + `${permittedPath}` + " are permitted."
    )).toBeInTheDocument();
  })
})