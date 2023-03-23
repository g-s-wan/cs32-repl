import Server.handlers.csv.LoadHandler;
import Server.handlers.csv.SearchHandler;
import Server.handlers.csv.State;
import Server.handlers.csv.ViewHandler;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import java.util.Map;
import okio.Buffer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Spark;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test the actual handlers.
 */
public class TestServerAPIHandlers {

  @BeforeAll
  public static void setup_before_everything() {
    // Set the Spark port number
    Spark.port(0);
    Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger
  }

  /**
   * Shared state for all tests. We need to be able to mutate it but never need to replace
   * the reference itself. We clear this state out after every test runs.
   */
  private State state = new State();

  @BeforeEach
  public void setup() {
    // Re-initialize state, etc. for _every_ test method run
    state = new State();

    // In fact, restart the entire Spark server for every test!
    Spark.get("/loadcsv", new LoadHandler(state));
    Spark.get("/viewcsv", new ViewHandler(state));
    Spark.get("/searchcsv", new SearchHandler(state));
    Spark.init();
    Spark.awaitInitialization(); // don't continue until the server is listening
  }

  @AfterEach
  public void teardown() {
    // Gracefully stop Spark listening on both endpoints
    Spark.unmap("/loadcsv");
    Spark.unmap("/viewcsv");
    Spark.unmap("/searchcsv");
    Spark.awaitStop(); // don't proceed until the server is stopped
  }

  /**
   * Helper to start a connection to a specific API endpoint/params
   * @param apiCall the call string, including endpoint
   *                (NOTE: this would be better if it had more structure!)
   * @return the connection for the given URL, just after connecting
   * @throws IOException if the connection fails for some reason
   */
  static private HttpURLConnection tryRequest(String apiCall) throws IOException {
    // Configure the connection (but don't actually send the request yet)
    URL requestURL = new URL("http://localhost:"+Spark.port()+"/"+apiCall);
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.connect();
    return clientConnection;
  }

  /**
   * Helper method that returns a string version of the response from the server
   *
   * @param clientConnection - represents the connection between the user and the server
   * @returns a string version of the response from the server
   */
  static private String getResponse(HttpURLConnection clientConnection) throws IOException {
    Moshi moshi = new Moshi.Builder().build();
    Object response = moshi.adapter(
            Types.newParameterizedType(Map.class, String.class, Object.class))
        .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    return response.toString();
  }

  /**
   * Tests that the appropriate error message is displayed if the user tries to load a CSV without
   * providing a filepath
   *
   * @throws IOException
   */
  @Test
  public void testAPILoadNoFilePath() throws IOException {
    HttpURLConnection clientConnection = tryRequest("loadcsv");

    // Get an OK response (the *connection* worked, the *API* provides an error response)
    assertEquals(200, clientConnection.getResponseCode());
    String response = getResponse(clientConnection);

    // Check that the response contains critical elements
    assertTrue(response.contains("Filepath missing from request."));
    assertTrue(response.contains("error_bad_request"));
    clientConnection.disconnect();
  }

  /**
   * Tests that the appropriate error message is displayed if the user tries to load a CSV outside
   * the allowed directory
   *
   * @throws IOException
   */
  @Test
  // Recall that the "throws IOException" doesn't signify anything but acknowledgement to the type checker
  public void testAPILoadNoAccess() throws IOException {
    HttpURLConnection clientConnection = tryRequest("loadcsv?filepath=fdigjdlfgj");

    // Get an OK response (the *connection* worked, the *API* provides an error response)
    assertEquals(200, clientConnection.getResponseCode());
    String response = getResponse(clientConnection);

    // Check that the response contains critical elements
    assertTrue(response.contains("File access denied. You tried to access"));
    assertTrue(response.contains("error_bad_request"));
    clientConnection.disconnect();
  }

  /**
   * Tests that the appropriate error message is returned when the user tries to access a non-existent
   * file in the allowed directory
   *
   * @throws IOException
   */
  @Test
  public void testAPILoadFileNotFound() throws IOException {
    HttpURLConnection clientConnection = tryRequest("loadcsv?filepath=../data/woohoo.csv");

    // Get an OK response (the *connection* worked, the *API* provides an error response)
    assertEquals(200, clientConnection.getResponseCode());
    String response = getResponse(clientConnection);

    // Check that the response contains critical elements
    assertTrue(response.contains("Could not find a file associated with the provided filepath. Did you make a typo?"));
    assertTrue(response.contains("error_bad_request"));
    assertTrue(response.contains("filepath=../data/woohoo.csv"));
    clientConnection.disconnect();
  }

  /**
   * Tests that a valid load request produces a success message
   *
   * @throws IOException
   */
  @Test
  public void testAPILoadSuccess() throws IOException {
    HttpURLConnection clientConnection = tryRequest("loadcsv?filepath=../data/stars/ten-star.csv");

    // Get an OK response (the *connection* worked, the *API* provides an error response)
    assertEquals(200, clientConnection.getResponseCode());
    String response = getResponse(clientConnection);

    // Check that the response contains critical elements
    assertTrue(response.contains("success"));
    assertTrue(response.contains("CSV has been loaded successfully."));
    assertTrue(response.contains("filepath=../data/stars/ten-star.csv"));
    clientConnection.disconnect();
  }

  /**
   * Tests that the appropriate error message is displayed if a user tries to search before loading
   * a CSV
   *
   * @throws IOException
   */
  @Test
  public void testAPISearchBeforeLoad() throws IOException {
    HttpURLConnection clientConnection = tryRequest("searchcsv");

    // Get an OK response (the *connection* worked, the *API* provides an error response)
    assertEquals(200, clientConnection.getResponseCode());
    String response = getResponse(clientConnection);

    // Check that the response contains critical elements
    assertTrue(response.contains("No CSV file has been loaded yet."));
    assertTrue(response.contains("error_bad_request"));
    clientConnection.disconnect();
  }

  /**
   * Tests that matching CSV rows are returned after a valid search request
   *
   * @throws IOException
   */
  @Test
  public void testAPISearchSuccess() throws IOException {
    HttpURLConnection clientConnection = tryRequest("loadcsv?filepath=../data/stars/ten-star.csv");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("searchcsv?searchterm=Barnard&hasheaders=y&col=ProperName");
    assertEquals(200, clientConnection.getResponseCode());

    // Get an OK response (the *connection* worked, the *API* provides an error response)
    String response = getResponse(clientConnection);

    /// Check that the response contains critical elements
    assertTrue(response.contains("success"));
    assertTrue(response.contains("87666,Barnard's Star,-0.01729,-1.81533,0.14824"));
    assertTrue(response.contains("searchterm=Barnard"));
    assertTrue(response.contains("hasheaders=y"));
    assertTrue(response.contains("column=ProperName"));
    clientConnection.disconnect();
  }

  /**
   * Tests that the appropriate error message is displayed if the user does not provide the right
   * query parameters (searchterm and hasheaders) while trying to search
   *
   * @throws IOException
   */
  @Test
  public void testAPISearchMissingParam() throws IOException {
    HttpURLConnection clientConnection = tryRequest("loadcsv?filepath=../data/stars/ten-star.csv");

    // Get an OK response (the *connection* worked, the *API* provides an error response)
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("searchcsv?searchterm=Rigel");

    // Get an OK response (the *connection* worked, the *API* provides an error response)
    assertEquals(200, clientConnection.getResponseCode());
    String response = getResponse(clientConnection);

    // Check that the response contains critical elements
    assertTrue(response.contains("Please provide the searchterm, hasheaders, and (if desired) col parameters."));
    assertTrue(response.contains("error_bad_request"));
    clientConnection = tryRequest("searchcsv?hasheaders=y");
    assertEquals(200, clientConnection.getResponseCode());
    response = getResponse(clientConnection);
    assertTrue(response.contains("Please provide the searchterm, hasheaders, and (if desired) col parameters."));
    assertTrue(response.contains("error_bad_request"));
    clientConnection.disconnect();
  }

  /**
   * Tests that the appropriate error message is displayed when the user tries to search by a header
   * name that doesn't exist, or an out of bounds column index
   *
   * @throws IOException
   */
  @Test
  public void testAPISearchInvalidHeader() throws IOException {
    HttpURLConnection clientConnection = tryRequest("loadcsv?filepath=../data/stars/ten-star.csv");

    // Get an OK response (the *connection* worked, the *API* provides an error response)
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("searchcsv?searchterm=Rigel&hasheaders=y&col=10000");

    // Get an OK response (the *connection* worked, the *API* provides an error response)
    assertEquals(200, clientConnection.getResponseCode());
    String response = getResponse(clientConnection);

    // Check that the response contains critical elements
    assertTrue(response.contains("Invalid header name or column index. Did you make a typo?"));
    assertTrue(response.contains("error_bad_request"));
    assertTrue(response.contains("searchterm=Rigel"));
    assertTrue(response.contains("hasheaders=y"));
    assertTrue(response.contains("column=10000"));
  }

  /**
   * Tests that the contents of the CSV are returned after a successful view request
   *
   * @throws IOException
   */
  @Test
  public void testAPIViewSuccess() throws IOException {
    HttpURLConnection clientConnection = tryRequest("loadcsv?filepath=../data/stars/ten-star.csv");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("viewcsv");

    // Get an OK response (the *connection* worked, the *API* provides an error response)
    assertEquals(200, clientConnection.getResponseCode());
    String response = getResponse(clientConnection);

    // If the response contained an arbitrary row, it likely returned the whole CSV correctly
    assertTrue(response.contains("[71457, Rigel Kentaurus A, -0.50362, -0.42139, -1.17665]"));
    clientConnection.disconnect();
  }

  /**
   * Tests that the appropriate error message is returned when the user provides a malformed CSV
   *
   * @throws IOException
   */
  @Test
  public void testAPISearchMalformedCSV() throws IOException {
    HttpURLConnection clientConnection = tryRequest("loadcsv?filepath=../data/stars/ten-star-malformed.csv");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("searchcsv?searchterm=Star&hasheaders=y&col=0");

    // Get an OK response (the *connection* worked, the *API* provides an error response)
    assertEquals(200, clientConnection.getResponseCode());
    String response = getResponse(clientConnection);

    // Check that the response contains critical elements
    assertTrue(response.contains("error_bad_json"));
    assertTrue(response.contains("searchterm=Star"));
    assertTrue(response.contains("hasheaders=y"));
    assertTrue(response.contains("filepath=../data/stars/ten-star-malformed.csv"));
    clientConnection.disconnect();
  }

  /**
   * Tests that the appropriate error message is returned when the user tries to view before loading
   * a CSV
   *
   * @throws IOException
   */
  @Test
  public void testAPIViewBeforeLoad() throws IOException {
    HttpURLConnection clientConnection = tryRequest("viewcsv");

    // Get an OK response (the *connection* worked, the *API* provides an error response)
    assertEquals(200, clientConnection.getResponseCode());
    String response = getResponse(clientConnection);

    // Check that the response contains critical elements
    assertTrue(response.contains("No CSV file has been loaded yet."));
    assertTrue(response.contains("error_bad_request"));

    clientConnection.disconnect();
  }

  /**
   * Tests a more complex flow in which the user loads, then searchers, then loads again, then views
   *
   * @throws IOException
   */
  @Test
  public void testAPILoadSearchLoadView() throws IOException {
    HttpURLConnection clientConnection = tryRequest("loadcsv?filepath=../data/stars/ten-star-no-headers.csv");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("searchcsv?searchterm=Proxima&hasheaders=n");
    assertEquals(200, clientConnection.getResponseCode());
    String search_response = getResponse(clientConnection);

    // Check that the response contains critical elements after searching
    assertTrue(search_response.contains("70667,Proxima Centauri,-0.47175,-0.36132,-1.15037"));
    assertTrue(search_response.contains("searchterm=Proxima"));
    assertTrue(search_response.contains("hasheaders=n"));
    assertTrue(search_response.contains("column=null"));

    // Load a different CSV
    clientConnection = tryRequest("loadcsv?filepath=../data/stars/ten-star-one-col.csv");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("viewcsv");
    assertEquals(200, clientConnection.getResponseCode());
    String view_response = getResponse(clientConnection);

    // Check that the response contains critical elements after viewing
    assertTrue(view_response.contains("[1234567890]"));
    clientConnection.disconnect();
  }

  /**
   * Tests a more complex flow in which the user loads, then searchers, then loads an invalid file, then searches again
   *
   * @throws IOException
   */
  @Test
  public void testAPILoadSearchLoadInvalidSearch() throws IOException {
    HttpURLConnection clientConnection = tryRequest("loadcsv?filepath=../data/stars/ten-star-no-headers.csv");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection = tryRequest("searchcsv?searchterm=Proxima&hasheaders=n");
    assertEquals(200, clientConnection.getResponseCode());
    String search_response = getResponse(clientConnection);

    // Check that the response contains critical elements after searching
    assertTrue(search_response.contains("70667,Proxima Centauri,-0.47175,-0.36132,-1.15037"));
    assertTrue(search_response.contains("searchterm=Proxima"));
    assertTrue(search_response.contains("hasheaders=n"));
    assertTrue(search_response.contains("column=null"));

    // Load an invalid CSV
    clientConnection = tryRequest("loadcsv?filepath=../data/stars/sglidjflihj");
    assertEquals(200, clientConnection.getResponseCode());
    String response = getResponse(clientConnection);
    assertTrue(response.contains("Could not find a file associated with the provided filepath. Did you make a typo?"));
    clientConnection = tryRequest("searchcsv?searchterm=Proxima&hasheaders=n");
    assertEquals(200, clientConnection.getResponseCode());
    search_response = getResponse(clientConnection);

    // Check that the response contains critical elements after viewing
    assertTrue(search_response.contains("70667,Proxima Centauri,-0.47175,-0.36132,-1.15037"));
    assertTrue(search_response.contains("searchterm=Proxima"));
    assertTrue(search_response.contains("hasheaders=n"));
    assertTrue(search_response.contains("column=null"));
    clientConnection.disconnect();
  }
}

