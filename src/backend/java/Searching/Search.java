package Searching;

import java.io.BufferedReader;
import java.io.EOFException;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/** The Search class handles search-related functionality */
public class Search {

  public Search() {}

  /**
   * A helper that specifically handles the case where the user wants to narrow their search by
   * column index
   *
   * @return int representing the column index
   * @param col representing the column index provided by the user
   */
  private int parseIntHeaders(String col, int colNum) {
    // Run only if the user actually wants to filter by column
    if (col != null) {
      int parsedCol = Integer.parseInt(col);
      if (parsedCol >= colNum) {
        throw new NumberFormatException();
      }
      return parsedCol;
    }

    // If the user didn't pass in a column name or index, return -1
    return -1;
  }

  /**
   * A helper that processes the headers if the user wants to narrow their search by column name or
   * index
   *
   * @return int representing the corresponding column index of the column name, or the column index
   *     as an int, depending on the user's input
   * @param filePath representing the filepath to the CSV
   * @param col representing the column index or name provided by the user
   * @throws IOException if reading the CSV fails
   */
  private int parseHeaders(String filePath, String col, int colNum) throws IOException {
    BufferedReader reader = new BufferedReader(new FileReader(filePath));

    // If there are headers, they will be in the very first row of the CSV
    String[] headers = reader.readLine().split(",");
    // Loops through the headers and sees if there's a match, returns the column index if there is
    for (int i = 0; i < headers.length; i++) {
      if (headers[i].equals(col)) {
        return i;
      }
    }

    // If there wasn't a match, it's possible that the user passed in a column index instead of name
    return parseIntHeaders(col, colNum);
  }

  /**
   * Reads the CSV line by line, searching for rows that include a user-provided search term
   *
   * @return List<String> representing all the matching rows that were found
   * @param filePath representing the filepath to the CSV
   * @param searchValue representing the term the user wants to search by
   * @param hasHeaders representing whether the CSV has headers or not
   * @param col representing either a column name or index the user wants to narrow their search by
   * @throws IOException if reading the CSV fails
   */
  public List<List<String>> searchCSV(String filePath, String searchValue, String hasHeaders, String col)
      throws IOException {

//    if (!(hasHeaders.toLowerCase() == "y") && !(hasHeaders.toLowerCase() == "n") ) {
//      throw new Exception();
//    }

    BufferedReader reader = null;
    reader = new BufferedReader(new FileReader(filePath));

    // This will eventually be returned
    List<List<String>> stringList = new ArrayList<>(0);

    String line = "";

    line = reader.readLine();
    int colNum = line.split(",").length;

    // If we've reached this point, we were able to read the line, and if there is nothing in the
    // CSV, line will be null instead of an empty string
    if (line == null) {
      throw new EOFException();
    }

    // Keeps track of which row reader is currently reading
    int rowIndex = 0;

    // While there is still content to parse...
    while (line != null) {
      // If there isn't the same number of columns in EVERY row, the CSV is malformed
      String[] line_arr = line.split(",");
      if (line_arr.length != colNum) {
        throw new ArrayIndexOutOfBoundsException();
      }

      if (hasHeaders.toLowerCase().equals("y") && (col != null)) {
        // If this passes, then headers should be valid - will throw a NumberFormatException if not
        parseHeaders(filePath, col, colNum);
      }
      
      // If the row contains the search term provided by the user...
      if (line.contains(searchValue)) {

        int index = -1;
        // If there are headers and the user wants to filter by column, we can parse the headers
        // If there are headers but the user doesn't want to filter by column, we don't need to
        // process them in this implementation because headers are returned
        if (hasHeaders.toLowerCase().equals("y") && (col != null)) {
          index = parseHeaders(filePath, col, colNum);
          // Even if there are no headers, the user might want to search by column index
        } else if (hasHeaders.toLowerCase().equals("n")) {
          index = parseIntHeaders(col, colNum);
        }

        List<String> ret = new ArrayList<>(0);
        // If index has been overwritten by our header parsing, the user wants to filter by column
        if (index != -1) {

          line_arr[index].contains(searchValue);

          // Obtain only the rows with values matching the search term in the specified column
          if (line_arr[index].contains(searchValue)) {
            String toAdd = line;
            ret.add(toAdd);
            // We only want to print and add ret if we found a match
            stringList.add(ret);
          }
        } else {
          // If index equals -1, the user did not need to filter by column, so we can return the
          // whole row
          String toAdd = line;
          ret.add(toAdd);
          stringList.add(ret);
        }
      }

      line = reader.readLine();
      rowIndex++;
    }

    return stringList;
  }
}
