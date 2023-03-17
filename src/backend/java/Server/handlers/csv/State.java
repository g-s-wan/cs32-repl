package Server.handlers.csv;

/**
 * Helper class that keeps track of the loaded CSV
 */
public class State {

  // Represents filepath of the currently loaded CSV
  private String loadedCSV;

  // Will change once the user loads a CSV
  public State() {
    this.loadedCSV = "";
  }

  public void setLoadedCSV(String csvName) {
    this.loadedCSV = csvName;
  }

  public String getLoadedCSV() {
    return this.loadedCSV;
  }
}
