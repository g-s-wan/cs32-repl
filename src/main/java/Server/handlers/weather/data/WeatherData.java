package Server.handlers.weather.data;
import java.util.List;

/**
 * WeatherData specifies different custom types representing data retrieved from NWS API
 */
public class WeatherData {

    /**
     * NWS API response when calling "https://api.weather.gov/points/(lat, lon)" with valid lat, lon coordinates.
     */
    public record GridResponse(GridProperties properties) {}

    /**
     * GridProperties is the result of getting the properties found in GridResponse. forecast is the relevant
     * property, and it is the endpoint to forecast data for specified location
     */
    public record GridProperties(String forecast) {

        /**
         * Gets forecast URL
         * @return endpoint to forecast data for specified location
         */
        public String getForecast() {return forecast;}
    }

    /**
     * Properties retrieved from forecast endpoint
     */
    public record WeatherForecastResponse(WeatherForecast properties) {}

    /**
     * Represents list of forecast periods within forecast properties
     */
    public record WeatherForecast(List<Forecast> periods){}

    /**
     * Forecast data for specific forecast period. Contains relevant temperature data
     */
    public record Forecast(String temperature, String temperatureUnit) {

        /**
         * Temp (number) getter
         * @return temperature of specified forecast period within specified location
         */
        public String getTemp() {return temperature;}

        /**
         * Temp Unit getter
         * @return either F (Fahrenheit) or C (Celsius)
         */
        public String getUnit() {return temperatureUnit;}
    }
}




