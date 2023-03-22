import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../src/App";
import "../../src/frontend/styles/App.css";
import jest from "jest-mock";
import { keyboard } from "@testing-library/user-event";

Element.prototype.scrollIntoView = jest.fn();

import {prepareFetchMock} from "./helperSetupMock"
import {mock_csv_data } from "./mock_csv_data"

describe("Keybard shotcuts logic", () => {
    test("ctrl-m toggle mode'", async () => {
      render(<App />);
  
      await keyboard('[ControlLeft>][KeyM]')
  
      // Check that mode is changed to verbose
      expect(screen.getByRole("main")).toContainHTML("Mode successfully set to VERBOSE");

      await keyboard('[ControlLeft>][KeyM]')
  
      // Check that mode is changed to verbose
      expect(screen.getByRole("main")).toContainHTML("Mode successfully set to BRIEF");

      
     })


     test("ctrl-h HELP'", async () => {
      render(<App />);
  
      await keyboard('[ControlLeft>][KeyQ]')
  
      // Search for some words in the Help
      expect(screen.getByRole("main")).toContainHTML("Toggles modes between 'verbose' and 'brief'");  
      expect(screen.getByRole("main")).toContainHTML("Displays the last CSV dataset that has been loaded."); 
     })

     
     test("ctrl-r CLEAR HISTORY'", async () => {
      render(<App />);
  
      // Put something in the History window
      await keyboard('[ControlLeft>][KeyQ]')
      expect(screen.getByRole("main")).toContainHTML("Toggles modes between 'verbose' and 'brief'");  
      expect(screen.getByRole("main")).toContainHTML("Displays the last CSV dataset that has been loaded."); 

      // Clear it
      await keyboard('[ControlLeft>][KeyR]')
      expect(screen.getByRole("main")).not.toContainHTML("Toggles modes between 'verbose' and 'brief'");  
      expect(screen.getByRole("main")).not.toContainHTML("Displays the last CSV dataset that has been loaded."); 


     })

     test("ctrl-l LOAD_FILE'", async () => {
      render(<App />);
  
      // Check that the input box is empty
       expect(screen.getByRole("input")).toBeEmptyDOMElement();

      await keyboard('[ControlLeft>][KeyL]')
      expect(screen.getByRole("input")).toHaveValue("load_file ./data/<file name>");  

     })

     
     test("ctrl-F SEARCH'", async () => {
      render(<App />);
  
      // Check that the input box is empty
       expect(screen.getByRole("input")).toBeEmptyDOMElement();
      await keyboard('[ControlLeft>][KeyF]')
      expect(screen.getByRole("input")).toHaveValue("search <search text> y <column index>");  

     })

          
     test("ctrl-V VIEW'", async () => {
      render(<App />);
  
      // Check that the input box is empty
       expect(screen.getByRole("input")).toBeEmptyDOMElement();

      const expectedResponse = {
        result: "success",
        data: mock_csv_data
      };

      prepareFetchMock(expectedResponse);
      
      // Put something in the History window
      await keyboard('[ControlLeft>][KeyV]')
 
      expect(fetch).toHaveBeenCalledWith('http://localhost:3232/viewcsv');

      // Check every cell in the mock data to make sure it is present
      mock_csv_data.forEach( row => {
        row.forEach(col => {
          expect(screen.getByRole("main")).toContainHTML(col);
        })
      })


     })



  }) 
  