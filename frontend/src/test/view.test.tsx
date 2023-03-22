import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../main/App";
import "../main/styles/App.css";

import {prepareFetchMock} from "./helperSetupMock"
import {mock_csv_data } from "./mock_csv_data"
import jest from "jest-mock";

Element.prototype.scrollIntoView = jest.fn();

describe("view command", () => {
  
    test("view before load_file", async () => {
      render(<App />);
  
      const expectedResponse = {
        result: "error_bad_request",
        message: "No CSV file has been loaded yet."
      };

      prepareFetchMock(expectedResponse);
      
      const inputBox = screen.getByRole('input');
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "view");
      await userEvent.click(screen.getByRole('button'));

      // Check that correct error message is displayed
      expect(fetch).toHaveBeenCalledWith('http://localhost:3232/viewcsv');
      expect(screen.getByRole("main")).toContainHTML(`An error occurred while viewing the file: ${expectedResponse.message}`);
    })
  
    test("view after csv file loaded", async () => {
      render(<App />);

      const expectedResponse = {
        result: "success",
        data: mock_csv_data
      };

      prepareFetchMock(expectedResponse);
      
      const inputBox = screen.getByRole('input');
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "view");
      await userEvent.click(screen.getByRole('button'));
  
      expect(fetch).toHaveBeenCalledWith('http://localhost:3232/viewcsv');

      // Check every cell in the mock data to make sure it is present
      mock_csv_data.forEach( row => {
        row.forEach(col => {
          expect(screen.getByRole("main")).toContainHTML(col);
        })
      })
     })

     test("view with error status from API", async () => {
      render(<App />);

      const expectedResponse = {
        result: "error_bad_request",
        message: "An error occurred while viewing the file:"
      };

      prepareFetchMock(expectedResponse);
      
      const inputBox = screen.getByRole('input');
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "view");
      await userEvent.click(screen.getByRole('button'));
  
      expect(fetch).toHaveBeenCalledWith('http://localhost:3232/viewcsv');

      // Check that the appropriate error message is displayed
      expect(screen.getByRole("main")).toContainHTML(expectedResponse.message);

     })

   })