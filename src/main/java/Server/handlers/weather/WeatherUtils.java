package Server.handlers.weather;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;

import Server.handlers.weather.data.MockWeatherData;
import Server.handlers.weather.data.WeatherData;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Map;

/**
 * WeatherUtils handles API query calling & handling getting relevant forecast data from given coordinate params
 */
public class WeatherUtils implements APISource {

    /**
     * Stores time that API call is created
     */
    public String timeOfAPICall = "";

    /**
     * WeatherUtils constructor
     */
    public WeatherUtils() {
    }

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

        gridResponse = this.callNWSAPI(gridEndpoint, WeatherData.GridResponse.class);

        // Will get caught by handle()
        try {
            gridResponse.properties().getForecast();
        } catch (NullPointerException e) {
             throw new InvalidCoordinatesException("Invalid coordinates");
        }

        String forecastEndpoint = gridResponse.properties().getForecast();
        forecastResponse = this.callNWSAPI(forecastEndpoint, WeatherData.WeatherForecastResponse.class);

        WeatherData.Forecast temp = forecastResponse.properties().periods().get(0);
        return getWeatherResult(temp);
    }

    /**
     * Returns the WeatherResult instance for a given forecast and adds a timestamp.
     * @param temp - Forecast instance to create a WeatherResponse for
     * @return - new WeatherResult instance created
     */
    public WeatherResult getWeatherResult(WeatherData.Forecast temp) {
        return new WeatherResult(temp.getTemp(), temp.getUnit(), timeOfAPICall);
    }

    /**
     * This method calls National Weather Services API and returns retrieved data
     * @param url endpoint used to call API
     * @param classType type of WeatherData class that JSON data should be converted to
     * @return type of passed in classType containing data retrieved from API
     * @throws IOException error message based on status error type
     */
    public <T> T callNWSAPI(String url, Type classType) throws IOException {
        URL endpoint = new URL(url);
        HttpURLConnection clientConnection = (HttpURLConnection) endpoint.openConnection();
        clientConnection.connect();
        timeOfAPICall = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ").format(new java.util.Date());
        int status = clientConnection.getResponseCode();
        switch (status) {
            case 400 -> throw new InvalidCoordinatesException("Coordinates are out of bounds. Please choose valid lat" +
                    " and lon values");
            case 404 -> throw new InvalidCoordinatesException("Could not find data for specified coordinates");
            case 500 -> throw new IOException("An unexpected error occurred while connecting to NWS server");
        }
        InputStreamReader resultReader = new InputStreamReader(clientConnection.getInputStream());
        String jsonAsString = this.readerToString(resultReader);
        return this.fromJson(classType, jsonAsString);
    }

    /**
     * Method to convert reader to string
     * @param reader InputStreamReader with relevant API data
     * @return string of data found from reader
     * @throws IOException
     */
    public String readerToString(InputStreamReader reader) throws IOException {
        BufferedReader br = new BufferedReader(reader);
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            stringBuilder.append(line);
        }
        br.close();
        return stringBuilder.toString();
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
}
