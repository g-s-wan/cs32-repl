import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../src/components/Header";
import React, {useState} from "react";
import HistoryBox from "../src/components/HistoryBox";

/*
 * This is an example test file.
 * It is meant to be a starting point for writing your own tests.
 * Feel free to research all the other functions that Jest and Testing Library provide!
 */

const [history, setHistory] = useState([]);
describe("core elements render", () => {
  test("loads and displays repl history", () => {
    render(<HistoryBox history={history} />);
    // expect...
  });

  test("loads and displays header", async () => {
    render(<Header />);
    expect(screen.getByText(/REPL/i)).toBeInTheDocument();
  });
});
