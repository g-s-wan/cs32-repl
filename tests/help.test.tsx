import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import "../src/frontend/styles/App.css";
import jest from "jest-mock";

Element.prototype.scrollIntoView = jest.fn();

describe("Test Help logic", () => {
    test("Display Help", async () => {
      render(<App />);
  
      const inputBox = screen.getByRole('input');
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "help");
      await userEvent.click(screen.getByRole('button'));
  
      // Check that output corresponds to brief mode
      expect(screen.getByRole("main")).toContainHTML('searches for text item.  Use y or n to indicate if the dataset includes a header.  Optionally, specify a column index to limit the search to.');

    })

  }) 
  