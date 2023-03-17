import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import "../styles/App.css";

import {prepareFetchMock} from "./setupMock"
import {mock_csv_data } from "./mock_csv_data"

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
  
      expect(fetch).toHaveBeenCalledWith('http://localhost:3232/viewcsv');
      expect(screen.getByRole("history")).toContainHTML(`An error occurred while viewing the file: ${expectedResponse.message}`);
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

      mock_csv_data.forEach( row => {
        row.forEach(col => {
          expect(screen.getByRole("history")).toContainHTML(col);
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

      expect(screen.getByRole("history")).toContainHTML(expectedResponse.message);

     })

   })