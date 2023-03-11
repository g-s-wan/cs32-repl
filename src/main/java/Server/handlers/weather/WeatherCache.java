package Server.handlers.weather;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import edu.brown.cs.student.main.Server.handlers.weather.WeatherCacheUtilities.Location;
import edu.brown.cs.student.main.Server.handlers.weather.WeatherCacheUtilities.WeatherReport;

import com.google.common.cache.LoadingCache;
import java.util.Iterator;
import java.util.concurrent.TimeUnit;

/**
 * Class representing a cache for NWI API responses
 *
 * */
public class WeatherCache {

  // The cache itself
  private final LoadingCache<Location, WeatherReport> cache;

  public WeatherCache() {
    cache = CacheBuilder.newBuilder()
        .maximumSize(30)
        .expireAfterWrite(24, TimeUnit.HOURS)
        .build(
            // Location: object that includes lat, lon, and a distance threshold
            // WeatherReport: object that includes temp, tempUnit, timestamp, lat, and lon
            new CacheLoader<Location, WeatherReport>() {
              @Override
              public WeatherReport load(Location location) throws Exception {
                return getWeatherReport(location);
              }
            }
        );
  }

  // Overloaded constructor in case user wants to override default cache params
  public WeatherCache(int maxSize, int duration, TimeUnit timeUnit) {
    cache = CacheBuilder.newBuilder()
          .maximumSize(maxSize)
          .expireAfterWrite(duration, timeUnit)
          .build(
              new CacheLoader<Location, WeatherReport>() {
                @Override
                public WeatherReport load(Location location) throws Exception {
                  return WeatherCache.this.getWeatherReport(location);
                }
              }
          );
  }

  /**
   * Getter for WeatherReports in the cache
   *
   * @param location
   * @return the WeatherReport associated with a particular Location
   */
  public WeatherReport getWeatherReport(Location location) {
    return cache.getUnchecked(location);
  }

  /**
   * Calculates how far apart two Locations are
   *
   * @param locationA - the first location
   * @param locationB - the second location
   * @return the Euclidean distance between the two Locations
   */
  public double calculateDist(Location locationA, Location locationB) {
    double latDiff = locationA.getLat() - locationB.getLat();
    double lonDiff = locationA.getLon() - locationB.getLon();

    // Simple distance calculation
    return Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lonDiff, 2));
  }

  /**
   * Determines whether two Locations are "close enough"
   *
   * @param locationA - the first location
   * @param locationB - the second location
   * @return a boolean that represents whether the two Locations are "close enough"
   */
  public boolean withinDist(Location locationA, Location locationB, double threshold) {
    if (this.calculateDist(locationA, locationB) <= threshold) {
      return true;
    }
    return false;
  }

  /**
   * Goes through all items in the cache and returns a matching Location, if any
   *
   * @param location - the location being compared to items in the cache
   * @param threshold - the distance threshold
   * @return a Location if there is a "close enough" entry in the cache, or null if there is not
   */
  public Location cacheHit(Location location, double threshold) {
    Iterator<Location> cachedWeather = cache.asMap().keySet().iterator();
    while (cachedWeather.hasNext()) {
      Location entry = cachedWeather.next();
      if (this.withinDist(location, entry, threshold)) {
        return entry;
      }
    }
    return null;
  }

  // Getter for the cache itself
  public LoadingCache<Location, WeatherReport> getCache() {
    return this.cache;
  }
}
