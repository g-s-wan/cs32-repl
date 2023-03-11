package Server.handlers.weather;

import java.io.IOException;

/**
 * Interface extended by WeatherUtils and MockWeatherUtils - supports mocking
 */
public interface APISource {

  /**
   * Either calls the NWS API or retrieves mock data
   *
   * @param lat - latitude of the target location
   * @param lon - longitude of the target location
   * @return WeatherResult consisting of relevant Forecast data for given coordinates
   * @throws IOException
   */
  WeatherResult getForecast(double lat, double lon) throws IOException;
}
