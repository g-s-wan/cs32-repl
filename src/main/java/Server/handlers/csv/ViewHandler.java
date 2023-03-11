package Server.handlers.csv;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import Parsing.Creators.ArrayCreator;
import Parsing.Parser;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Handler class for requests to the /viewcsv endpoint
 *
 * Returns the contents of the CSV if the file was displayed successfully, or an appropriate error message
 * depending on what went wrong
 */
public class ViewHandler implements Route {
  // Keeps track of the loaded CSV file
  private State state;

  // Constructor takes in shared state
  public ViewHandler(State state) {
    this.state = state;
  }

  /**
   * Handles requests to the server to view CSVs
   *
   * @param request  the request to handle
   * @param response use to modify properties of the response
   * @return ViewResponse - JSON response that returns the contents of the CSV or an error message,
   * depending on whether searching was successful
   * @throws FileNotFoundException if the user tries to access a file that does not exist - accounts
   * for situations in which the CSV is moved or deleted
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    // Will keep track of mappings between fields and content that will be returned
    Map<String, Object> jsonMap = new LinkedHashMap<>();

    // Can't view a CSV that hasn't been loaded
    if (this.state.getLoadedCSV() == "") {
      jsonMap.put("result", "error_bad_request");
      jsonMap.put("message", "No CSV file has been loaded yet.");
      return new ViewResponse(jsonMap).serialize();
    }

    try {
      // ArrayCreator() is being passed in but is not doing anything - in my implementation of
      // the parser in Sprint 1, I already had a helper method that returned the contents of the
      // whole CSV. Leveraging this seemed like the simplest approach
      Parser parser = new Parser(new BufferedReader(new FileReader(this.state.getLoadedCSV())),
          new ArrayCreator());
      List<List<String>> csvData = parser.getCSVData();

      jsonMap.put("result", "success");
      jsonMap.put("data", csvData);
      return new ViewResponse(jsonMap).serialize();

      // If the user provides a file that doesn't exist
    } catch (FileNotFoundException e) {
      jsonMap.put("filepath", this.state.getLoadedCSV());
      jsonMap.put("result", "error_bad_request");
      jsonMap.put("message", "The loaded CSV no longer exists.");

      return new ViewResponse(jsonMap).serialize();
    }
  }

  /**
   * A JSON response that returns the contents of the CSV if the search was successful, or an error message
   * if something went wrong
   *
   * @param jsonMap - the map that will be serialized into a JSON
   * @return this response, serialized as Json
   *
   */
  public record ViewResponse(Map<String, Object> jsonMap) {
      String serialize () {
        try {
          Moshi moshi = new Moshi.Builder().build();
          JsonAdapter<Map<String, Object>> jsonAdapter = moshi.adapter(
              Types.newParameterizedType(Map.class, String.class, Object.class));
          return jsonAdapter.indent("  ").toJson(jsonMap);
        } catch (Exception e) {
          e.printStackTrace();
          throw e;
        }
      }
    }
}
