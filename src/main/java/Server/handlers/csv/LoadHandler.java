package Server.handlers.csv;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import Parsing.Creators.ArrayCreator;
import Parsing.Parser;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Handler class for requests to the /loadcsv endpoint
 *
 * Returns a success response if the file was loaded by the server, or an appropriate error message
 * depending on what went wrong
 */
public class LoadHandler implements Route {

  // Handler will only be allowed to access files in this directly
  private String allowedPath = "./data";

  // Keeps track of the loaded CSV file
  private State state;

  // Constructor takes in shared state
  public LoadHandler(State state) {
    this.state = state;
  }

  /**
   * Checks to make sure that the file provided is within the allowed directory
   **/
  private void checkFileAccess(String filePath) throws IOException {
    File allowed = new File(allowedPath);
    // Get the absolute path from the root directory
    String path = new File(filePath).getCanonicalPath();
    String allowedPath = allowed.getCanonicalPath();

    // Throw an exception if the file the user is trying to access lies outside the allowed directory
    if (!(path.contains(allowedPath))) {
      throw new IllegalArgumentException();
    }

  }

  /**
   * Handles requests to the server to load CSVs
   *
   * @param request  - HTTP request from the user
   * @param response - HTTP response from the server
   * @return LoadResponse - JSON response that reports whether the loading was successful
   * @throws FileNotFoundException if user provides a non-existent file in the allowed directory
   * @throws IllegalArgumentException if the user provides a file outside of the allowed directory
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    // Will keep track of mappings between fields and content that will be returned
    Map<String, Object> jsonMap = new LinkedHashMap<>();

    String loadedCSV = request.queryParams("filepath");

    try {
      // We need a filepath to load a file!
      if (loadedCSV == null) {
        jsonMap.put("result", "error_bad_request");
        jsonMap.put("message", "Filepath missing from request.");
        return new LoadResponse(jsonMap).serialize();
      }

      // Check file access before letting the parser interact with it
      this.checkFileAccess(loadedCSV);

      // ArrayCreator() is being passed in but is not doing anything - in my implementation of
      // the parser in Sprint 1, I already had a helper method that returned the contents of the
      // whole CSV. Leveraging this seemed like the simplest approach
      Parser parser = new Parser(new BufferedReader(new FileReader(loadedCSV)), new ArrayCreator());

      // Update the loaded CSV and let the user know that the loading was successful
      this.state.setLoadedCSV(loadedCSV);
      jsonMap.put("result", "success");
      jsonMap.put("filepath", loadedCSV);
      jsonMap.put("message", "CSV has been loaded successfully.");

      return new LoadResponse(jsonMap).serialize();

      // User requested a non-existent file in the allowed directory
    } catch (FileNotFoundException e) {
      jsonMap.put("result", "error_bad_request");
      jsonMap.put("filepath", loadedCSV);
      jsonMap.put("message",
          "Could not find a file associated with the provided filepath. Did you make a typo?");
      return new LoadResponse(jsonMap).serialize();

      // User tried to access a file outside the allowed directory
    } catch (IllegalArgumentException e) {
      jsonMap.put("result", "error_bad_request");
      jsonMap.put("message",
          "File access denied. You tried to access " + loadedCSV + " but only files in "
              + allowedPath + " are permitted.");
      return new LoadResponse(jsonMap).serialize();
    }
  }

  /**
   * A JSON response that returns a success message if the loading was successful, or an error message
   * if something went wrong. Either way, the filepath provided by the user is returned as well
   *
   * @param jsonMap - the map that will be serialized into a JSON
   * @return this response, serialized as Json
   */
  public record LoadResponse(Map<String, Object> jsonMap) {

    String serialize() {
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
