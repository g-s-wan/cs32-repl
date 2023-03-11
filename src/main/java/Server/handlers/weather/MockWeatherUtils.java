package Server.handlers.weather;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import Server.handlers.weather.data.MockWeatherData;
import Server.handlers.weather.data.WeatherData;
import java.io.IOException;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.Map;

public class MockWeatherUtils implements APISource {
  /**
   * Stores time that API call is created
   */
  public String timeOfAPICall = "";

  private Map<String, String> mockData = new MockWeatherData().mockData;

  @Override
  /**
   *
   * @param lat latitude param
   * @param lon longitude param
   * @return WeatherResponse consisting of relevant Forecast data for given coordinates
   * @throws IOException exception specified in classNWSAPI
   */
  public WeatherResult getForecast(double lat, double lon) throws IOException {
    WeatherData.GridResponse gridResponse;
    WeatherData.WeatherForecastResponse forecastResponse;
    String gridEndpoint = "https://api.weather.gov/points/" + lat + "," + lon;

    gridResponse = this.mockGetNWSData(mockData.get(gridEndpoint), WeatherData.GridResponse.class);
    timeOfAPICall = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ").format(new java.util.Date());

    // Will get caught by handle()
    try {
      gridResponse.properties().getForecast();
    } catch (NullPointerException e) {
      throw new InvalidCoordinatesException("Invalid coordinates");
    }

    String forecastEndpoint = gridResponse.properties().getForecast();

    forecastResponse = this.mockGetNWSData(mockData.get(forecastEndpoint), WeatherData.WeatherForecastResponse.class);
    WeatherData.Forecast temp = forecastResponse.properties().periods().get(0);
    return getWeatherResult(temp);
  }

  /**
   * Mocked version of requesting a URL
   * @param url request endpoint
   * @param targetClass class to deserialize JSON into
   * @return instance of a deserialized class
   * @throws IOException thrown by the deserialization engine
   */
  public <T> T mockGetNWSData(String url, Class<T> targetClass) throws IOException {
    return this.fromJson(targetClass, url);
  }

  /**
   * Method uses Moshi to convert API data from string to specified classType
   * @param classType type of WeatherData type representing data to be adapted
   * @param jsonString string of Json data
   * @return data from string in the form of specified classType
   * @throws IOException
   */
  public <T> T fromJson(Type classType, String jsonString) throws IOException {
    Moshi moshi = new Moshi.Builder().build();
    JsonAdapter<T> adapter = moshi.adapter(classType);
    return adapter.fromJson(jsonString);
  }

  public WeatherResult getWeatherResult(WeatherData.Forecast temp) {
    return new WeatherResult(temp.getTemp(), temp.getUnit(), timeOfAPICall);
  }
}
