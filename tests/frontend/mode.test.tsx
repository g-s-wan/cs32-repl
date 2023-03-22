import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../src/App";
import "../../src/frontend/styles/App.css";
import jest from "jest-mock";

Element.prototype.scrollIntoView = jest.fn();

describe("Display mode logic", () => {
    test("Initial mode is 'brief'", async () => {
      render(<App />);
  
      const inputBox = screen.getByRole('input');
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "invalid_command");
      await userEvent.click(screen.getByRole('button'));
  
      // Check that output corresponds to brief mode
      expect(screen.getByRole("main")).toContainHTML('Could not recognize that command. Submit "help" to view a list of registered commands');
      expect(screen.getByRole("main")).not.toContainHTML("Command: invalid_command");
      expect(screen.getByRole("main")).not.toContainHTML("Output:");
    })
  
     test("Toggle mode to verbose", async () => {
      render(<App />);
  
      const inputBox = screen.getByRole('input');
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "mode");
      await userEvent.click(screen.getByRole('button'));
  
      // Check that mode is changed to verbose
      expect(screen.getByRole("main")).toContainHTML("Mode successfully set to VERBOSE");
      
      // Change the display mode and check acknowledgement
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "invalid_command");
      await userEvent.click(screen.getByRole('button'));
  
      expect(screen.getByRole("main")).toContainHTML("Command: invalid_command");
      expect(screen.getByRole("main")).toContainHTML('Output (Error):  Could not recognize that command. Submit "help" to view a list of registered commands.');
  
     })
  
     test("Changing mode to explicitly specified values", async () => {
      render(<App />);
  
      const inputBox = screen.getByRole('input');
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "mode verbose");
      await userEvent.click(screen.getByRole('button'));
  
      // Check that mode is changed to verbose
      expect(screen.getByRole("main")).toContainHTML("Mode successfully set to VERBOSE");
  
      // Change the display mode and check aknowledgement
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "clear");
      await userEvent.click(screen.getByRole('button'));
      
      // Change the display mode and check aknowledgement
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "mode verbose");
      await userEvent.click(screen.getByRole('button'));
  
      // Check that mode is changed to verbose
      expect(screen.getByRole("main")).toContainHTML("Mode successfully set to VERBOSE");
  
      // Change the display mode and check aknowledgement
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "clear");
      await userEvent.click(screen.getByRole('button'));
      
      // Change the display mode and check aknowledgement
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "mode brief");
      await userEvent.click(screen.getByRole('button'));
  
      // Check that mode is changed to verbose
      expect(screen.getByRole("main")).toContainHTML("Mode successfully set to BRIEF");
  
      // Change the display mode and check aknowledgement
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "clear");
      await userEvent.click(screen.getByRole('button'));
      
      // Change the display mode and check aknowledgement
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "mode brief");
      await userEvent.click(screen.getByRole('button'));
  
      // Check that mode is changed to verbose
      expect(screen.getByRole("main")).toContainHTML("Mode successfully set to BRIEF");
  
      // Change the display mode and check aknowledgement
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "clear");
      await userEvent.click(screen.getByRole('button'));
      
      // Change the display mode and check aknowledgement
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "mode invalid");
      await userEvent.click(screen.getByRole('button'));
  
      // Check that mode is changed to verbose
      expect(screen.getByRole("main")).toContainHTML("Invalid mode option.");
     })
  }) 
  