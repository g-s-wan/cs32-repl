package Server.handlers.csv;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import java.util.LinkedHashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Handler class for requests to the /clear endpoint
 *
 * Returns the contents of the CSV if the file was displayed successfully, or an appropriate error message
 * depending on what went wrong
 */
public class ClearHandler implements Route {
  // Keeps track of the loaded CSV file
  private State state;

  // Constructor takes in shared state
  public ClearHandler(State state) {
    this.state = state;
  }

  /**
   * Handles requests to the server to clear loaded CSVs
   *
   * @param request  the request to handle
   * @param response use to modify properties of the response
   * @return ClearResponse - JSON response that returns a success or error message, depending on whether
   * the clearing was successful
   * @throws Exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    // Will keep track of mappings between fields and content that will be returned
    Map<String, Object> jsonMap = new LinkedHashMap<>();

    try {
      this.state.setLoadedCSV("");
      jsonMap.put("result", "success");
      jsonMap.put("message", "Loaded file has been cleared.");
      return new ClearResponse(jsonMap).serialize();
    } catch (Exception e) {
      jsonMap.put("result", "error_bad_request");
      jsonMap.put("message", "Something went wrong while trying to clear the loaded CSV.");
      return new ClearResponse(jsonMap).serialize();
    }

  }

  /**
   * A JSON response that returns a success or error message, depending if the clearing was successful
   *
   * @param jsonMap - the map that will be serialized into a JSON
   * @return this response, serialized as Json
   *
   */
  public record ClearResponse(Map<String, Object> jsonMap) {
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
