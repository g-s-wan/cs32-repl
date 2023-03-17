package Parsing;

import Parsing.Exceptions.FactoryFailureException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/** The Parser class handles parsing-related functionality */
public class Parser<T> {

  private BufferedReader reader;
  private CreatorFromRow<T> cfr;

  public Parser(Reader reader, CreatorFromRow<T> cfr) {
    this.reader = new BufferedReader(reader);
    this.cfr = cfr;
  }

  /**
   * Reads each line/row of the CSV and returns them
   *
   * @return List<List<String>> representing data extracted from the CSV
   * @throws IOException if an error occurs while reading each row of CSV data
   */
  public List<List<String>> getCSVData() throws IOException {
    List<List<String>> csvData = new ArrayList<List<String>>();
    String line = this.reader.readLine();

    // Read until the last row in the CSV
    while (line != null) {
      List<String> stringList = Arrays.asList(line.split(","));
      csvData.add(stringList);
      line = this.reader.readLine();
    }

    return csvData;
  }

  /**
   * A helper that fetches a specific row within the CSV data
   *
   * @return List<String> representing a single row from the CSV data
   * @param csvData represents the entirety of the CSV data
   * @param rowIndex represents the index of the row to be extracted from the CSV data
   */
  public List<String> getRow(List<List<String>> csvData, int rowIndex) {
    return csvData.get(rowIndex);
  }

  /**
   * Using a CreatorFromRow object, this converts a row from the CSV data to the user's desired type
   *
   * @return T represents a generic that the user wants to convert to
   * @param row represents a single row from the CSV Data
   * @throws FactoryFailureException if conversion fails
   */
  public T parseCSV(List<String> row) throws FactoryFailureException {
    T retRow = null;
    try {
      retRow = this.cfr.create(row);
    } catch (FactoryFailureException e) {
      throw new FactoryFailureException(
          "Something went wrong while converting the input to your desired class.", row);
    }
    return retRow;
  }
}
