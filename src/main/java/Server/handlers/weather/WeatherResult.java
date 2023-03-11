package Server.handlers.weather;

    /**
     * Record to represent ForecastResponse from NWS API with relevant data. Used to add timestamp.
     * @param temp - temperature in response
     * @param unit - unit of temp
     * @param timestamp - time at which the forecast was retrieved from NWS
     */
    public record WeatherResult(String temp, String unit, String timestamp) {
    }
