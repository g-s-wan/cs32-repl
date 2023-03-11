package edu.brown.cs.student.main.Server.handlers.weather;

/**
 * Class that defines the records that are stored in the cache
 */
public class WeatherCacheUtilities {

  // Key of the cache
  public record Location(double lat, double lon, double threshold) {
    public double getLat() {
      return this.lat;
    }
    public double getLon() {
      return this.lon;
    }
  }

  // Value of the cache
  public record WeatherReport(String temp, String tempUnit, String timestamp, double lat, double lon) {
  }

}
