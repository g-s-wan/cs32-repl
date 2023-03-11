package Server.handlers.weather;

import edu.brown.cs.student.main.Server.handlers.weather.WeatherCacheUtilities.Location;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;

import edu.brown.cs.student.main.Server.handlers.weather.WeatherCacheUtilities.WeatherReport;
import java.io.IOException;

import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * This class handles a weather query, checking for coordinate params and sending appropriate response type with
 * relevant weather info to the user
 */
public class WeatherHandle implements Route {


  private static double threshold;
  private WeatherCache weatherCache;

  /**
   * weatherUtils to conduct API query
   */
  private APISource weatherUtils;

  // Takes in an APISource - either WeatherUtils or MockWeatherUtils
  public WeatherHandle(APISource apiSource) {
    // Developer can customize the cache in the constructor
    this.weatherCache = new WeatherCache();

    /**
     * instance of weatherUtils to conduct API query
     */
    this.weatherUtils = apiSource;
    // Developer can also set threshold, which is 1 by default
    // Keep in mind one degree of lat is 69 miles and one degree of lon is 54.6 miles
    this.threshold = 1;
  }

  /**
   * Takes in user input, including query params, and returns serialized data from appropriate response Object
   * @param request user Query
   * @param response
   * @return serialised JSON from either SuccessWeatherResponse or FailureWeatherResponse
   * @throws Exception
   */
  @Override
  public Object handle(Request request, Response response){
    String latParamString = request.queryParams("lat");;
    String lonParamString = request.queryParams("lon");
    Map jsonMap = new HashMap<String, Object>();
    jsonMap.put("lat", latParamString);
    jsonMap.put("lon", lonParamString);
    WeatherResult forecast;
    double lat;
    double lon;
    // checks that both lat and lon params are included in query
    if (latParamString == null || lonParamString == null) {
      jsonMap.put("error message", "missing lat and/or lon param");
      return new WeatherFailureResponse("error_bad_request", jsonMap).serialize();
    }
    try {
      // checks if lat and lon are both numerical
      lat = Double.parseDouble(latParamString);
      lon = Double.parseDouble(lonParamString);
    } catch (NumberFormatException e) {
      jsonMap.put("error message", "Please provide a numerical value for lat and lon params");
      return new WeatherFailureResponse("error_bad_request", jsonMap).serialize();
    }

    try {
      forecast = this.weatherUtils.getForecast(lat, lon);
      Location loc = new Location(lat, lon, this.threshold);
      Location maybeMatch = this.weatherCache.cacheHit(loc, this.threshold);
      // Check the cache
      if (this.weatherCache.getCache().getIfPresent(loc) != null) {
        WeatherReport report = this.weatherCache.getCache().getIfPresent(loc);
        jsonMap.put("temp", report.temp());
        jsonMap.put("tempUnit", report.tempUnit());
        jsonMap.put("time", report.timestamp());
        return new WeatherSuccessResponse("success", jsonMap).serialize();
      } else if (maybeMatch != null) {
        WeatherReport report = this.weatherCache.getCache().getIfPresent(maybeMatch);
        jsonMap.put("temp", report.temp());
        jsonMap.put("tempUnit", report.tempUnit());
        jsonMap.put("time", report.timestamp());
        return new WeatherSuccessResponse("success", jsonMap).serialize();
      } else {
        this.weatherCache.getCache().put(loc, new WeatherReport(forecast.temp(),
                forecast.unit(), forecast.timestamp(), lat, lon));
      }
    }
    // returns failure response with relevant error message if can't call API with given coordinates
    catch (InvalidCoordinatesException e){
      jsonMap.put("error message", e.getMessage());
      return new WeatherFailureResponse("error_bad_request", jsonMap).serialize();
    }
    catch (IOException e){
      jsonMap.put("error message", e.getMessage());
      return new WeatherFailureResponse("error_datasource", jsonMap).serialize();
    }
    try{
        jsonMap.put("temp", forecast.temp());
        jsonMap.put("tempUnit", forecast.unit());
        jsonMap.put("time", forecast.timestamp());
        return new WeatherSuccessResponse("success", jsonMap).serialize();
    } catch (Exception e) {
      jsonMap.put("error message", e.getMessage());
      return new WeatherFailureResponse("error_datasource", jsonMap).serialize();
    }
  }

  /**
   * Response object to send when weather query succeeds, includes map with info on temp, temp unit, and time
   */
  public record WeatherSuccessResponse(String result, Map<String, Object> data) {
    /** Converts data from map to a Json
     * @return this response, serialized as Json
     */
    String serialize() {
      try {
        Moshi moshi = new Moshi.Builder()
                .build();
        JsonAdapter<WeatherSuccessResponse> adapter = moshi.adapter(WeatherSuccessResponse.class);
        return adapter.toJson(this);
      } catch(Exception e) {
        e.printStackTrace();
        throw e;
      }
    }
  }

  /**
   * Response object to send when weather query fails, includes map with info on error type and error message
   */
  public record WeatherFailureResponse(String result, Map data) {

    /**
     * Converts data from map and error type to a Json
     * @return this response, serialized as Json
     */
    String serialize() {
      Moshi moshi = new Moshi.Builder().build();
      return moshi.adapter(WeatherFailureResponse.class).toJson(this);
    }
  }

  // For testing purposes
  public WeatherCache getWeatherCache() {
    return this.weatherCache;
  }

  public double getThreshold() {
    return this.threshold;
  }
}
