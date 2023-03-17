import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import "../styles/App.css";

import {prepareFetchMock} from "./setupMock"
import {mock_csv_data } from "./mock_csv_data"

describe("search command", () => {
  
    test("search before load_file", async () => {
      render(<App />);
  
      const expectedResponse = {
        result: "error_bad_request",
        message: "No CSV file has been loaded yet."
      };

      prepareFetchMock(expectedResponse);
      
      const searchTerm = "anything";
      const col = "FirstName"
      const hasHeaders = "y";

      const url = "http://localhost:3232/searchcsv?searchterm=" + `${searchTerm}`  + "&col=" + `${col}` + "&hasheaders="+ `${hasHeaders}`

      const inputBox = screen.getByRole('input');
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "search " + col + " " + searchTerm);
      await userEvent.click(screen.getByRole('button'));
  
      expect(fetch).toHaveBeenCalledWith(url);
      expect(screen.getByRole("history")).toContainHTML(`An error occurred while searching the file: ${expectedResponse.message}`);
    })
  
    test("search with too few arguments", async () => {
      render(<App />);
  
      const expectedResponse = {
        result: "error_bad_request",
        message: "Incorrect number of parameters."
      };

      prepareFetchMock(expectedResponse);
      
      const searchTerm = "anything";
      const col = "FirstName"
      const hasHeaders = ""

      const url = "http://localhost:3232/searchcsv?searchterm=" + `${searchTerm}`  + "&col=" + `${col}` + "&hasheaders="+ `${hasHeaders}`

      const inputBox = screen.getByRole('input');
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "search "+ searchTerm);
      await userEvent.click(screen.getByRole('button'));
  
      expect(fetch).not.toHaveBeenCalledWith(url);
      expect(screen.getByRole("history")).toContainHTML(expectedResponse.message);
    })

    test("search for existing through mock data", async () => {
      render(<App />);
  
      const header = mock_csv_data[0];

      for (let rowIndex = 1; rowIndex < mock_csv_data.length; rowIndex++) {
        
        const row = mock_csv_data [rowIndex];

        for (let colIndex = 0; colIndex < row.length; colIndex++) {

          const column = row[colIndex];

          const expectedResponse = {
            result: "success",
            data: [[column]]
          };

          prepareFetchMock(expectedResponse);

          const searchTerm = column;
          const col = header[colIndex]
          const hasHeaders = "y"
    
          const url = "http://localhost:3232/searchcsv?searchterm=" + `${searchTerm}`  + "&col=" + `${col}` + "&hasheaders="+ `${hasHeaders}`
    
          const inputBox = screen.getByRole('input');
          await userEvent.click(inputBox);
          await userEvent.type(inputBox, "search " + col + " " + searchTerm);
          await userEvent.click(screen.getByRole('button'));
      
          expect(fetch).toHaveBeenCalledWith(url);
          expect(screen.getByRole("history")).toContainHTML("Showing search results");
          expect(screen.getByRole("history")).toContainHTML(column);

        }}

      })

    test("search for non existing through mock data", async () => {
        render(<App />);
    
        const header = mock_csv_data[0];
  
        for (let rowIndex = 1; rowIndex < mock_csv_data.length; rowIndex++) {
          
          const row = mock_csv_data [rowIndex];
  
          for (let colIndex = 0; colIndex < row.length; colIndex++) {
  
            const column = row[colIndex];
  
            const expectedResponse = {
              result: "success",
              data: []
            };
  
            prepareFetchMock(expectedResponse);
  
            const searchTerm = "doesnotexist";
            const col = header[colIndex]
            const hasHeaders = "y"
      
            const url = "http://localhost:3232/searchcsv?searchterm=" + `${searchTerm}`  + "&col=" + `${col}` + "&hasheaders="+ `${hasHeaders}`
      
            const inputBox = screen.getByRole('input');
            await userEvent.click(inputBox);
            await userEvent.type(inputBox, "search " + col + " " + searchTerm);
            await userEvent.click(screen.getByRole('button'));
        
            expect(fetch).toHaveBeenCalledWith(url);
            expect(screen.getByRole("history")).toContainHTML("No results found");
  
          }}
  
        })

    test("search with error status from API", async () => {
          render(<App />);
    
          const expectedResponse = {
            result: "error_bad_request",
            message: "An error occurred while searching the file:"
          };
    
          const searchTerm = "anything";
          const col = "FirstName"
          const hasHeaders = "y";
    
          const url = "http://localhost:3232/searchcsv?searchterm=" + `${searchTerm}`  + "&col=" + `${col}` + "&hasheaders="+ `${hasHeaders}`
    
          prepareFetchMock(expectedResponse);
          
          const inputBox = screen.getByRole('input');
          await userEvent.click(inputBox);
          await userEvent.type(inputBox, "search " + col + " " + searchTerm);
          await userEvent.click(screen.getByRole('button'));
      
          expect(fetch).toHaveBeenCalledWith(url);
    
          expect(screen.getByRole("history")).toContainHTML(expectedResponse.message);
         })
    })