package Server.handlers.csv;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import Searching.Search;
import java.io.EOFException;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Handler class for requests to the /searchcsv endpoint
 *
 * Returns matching rows in the CSV if the file was searched successfully, or an appropriate error message
 * depending on what went wrong
 */
public class SearchHandler implements Route {
    // Keeps track of the loaded CSV file
    private State state;

    // Constructor takes in shared state
    public SearchHandler(State state) {
        this.state = state;
    }

    /**
     * Handles requests to the server to search CSVs
     *
     * @param request  the request to handle
     * @param response use to modify properties of the response
     * @return SearchResponse - JSON response that returns matching rows or an error message,
     * depending on whether searching was successful
     * @throws FileNotFoundException if the user tries to access a file that does not exist - accounts
     * for situations in which the CSV is moved or deleted
     * @throws NumberFormatException if the user provides an invalid column name/index to search by
     * @throws IOException if an error occurred while reading the CSV
     * @throws ArrayIndexOutOfBoundsException if the user provides a malformed CSV
     */
    @Override
    public Object handle(Request request, Response response) throws Exception {
        // Will keep track of mappings between fields and content that will be returned
        Map<String, Object> jsonMap = new LinkedHashMap<>();

        // Can't search a CSV that hasn't been loaded
        if (this.state.getLoadedCSV() == "") {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message", "No CSV file has been loaded yet.");
            return new SearchResponse(jsonMap).serialize();
        }

        String searchTerm = request.queryParams("searchterm");
        String hasHeaders = request.queryParams("hasheaders");
        // Column name/index is optional
        String col = request.queryParamOrDefault("col", null);

        // Add query params regardless of whether the search was successful or not
        jsonMap.put("searchterm", searchTerm);
        jsonMap.put("hasheaders", hasHeaders);
        // Column name/index is optional
        if (col == null) {
            jsonMap.put("column", "null");
        } else {
            jsonMap.put("column", col);
        }

        // Return a failure response for missing params
        if (searchTerm == null || hasHeaders == null) {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message",
                "Please provide the searchterm, hasheaders, and (if desired) col parameters.");
            return new SearchResponse(jsonMap).serialize();
        }

        if (!(hasHeaders.toLowerCase().equals("y")) && !(hasHeaders.toLowerCase().equals("n"))) {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message", "The hasheaders parameter must be either 'y' or 'n'");
            return new SearchResponse(jsonMap).serialize();
        }

        Search searcher = new Search();

        try {
            // Search the CSV!
            List<List<String>> searchResult =
                searcher.searchCSV(this.state.getLoadedCSV(), searchTerm, hasHeaders, col);

            jsonMap.put("result", "success");
            jsonMap.put("data", searchResult);
            return new SearchResponse(jsonMap).serialize();
            // If the user is trying to search a file that doesn't exist
        } catch (FileNotFoundException e) {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message", "The loaded CSV no longer exists.");
            jsonMap.put("filepath", this.state.getLoadedCSV());
            return new SearchResponse(jsonMap).serialize();
            // If the user provides an invalid column name/index
        } catch (NumberFormatException e) {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message", "Invalid header name or column index. Did you make a typo?");
            return new SearchResponse(jsonMap).serialize();
            // If an error occurred while reading the CSV
        } catch (IOException e) {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message", "Something went wrong while reading from the CSV.");
            jsonMap.put("filepath", this.state.getLoadedCSV());
            return new SearchResponse(jsonMap).serialize();
            // If the user provides a malformed CSV
        } catch (ArrayIndexOutOfBoundsException e) {
            jsonMap.put("result", "error_bad_json");
            jsonMap.put("message", "The file appears to be malformed.");
            jsonMap.put("filepath", this.state.getLoadedCSV());
            return new SearchResponse(jsonMap).serialize();
        }
    }

    /**
     * A JSON response that returns the matching rows if the search was successful, or an error message
     * if something went wrong. Either way, query params are returned as well
     *
     * @param jsonMap - the map that will be serialized into a JSON
     * @return this response, serialized as Json
     *
     */
    public record SearchResponse(Map<String, Object> jsonMap) {

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
