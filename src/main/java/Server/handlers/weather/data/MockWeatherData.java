package Server.handlers.weather.data;

import com.squareup.moshi.Moshi;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Mocked data for testing weather queries
 */
public class MockWeatherData {

  public static Map<String, String> mockData = new HashMap<>();

  /**
   * Mock data to test that basic functionality works - test that properties are as expected
   * @return Map of endpoints to relevant data
   */
  public static Map<String, String> getMockData() {

    mockData.put("https://api.weather.gov/points/41.8251,-71.3982", "{\n" +
            "    \"@context\": [\n" +
            "        \"https://geojson.org/geojson-ld/geojson-context.jsonld\",\n" +
            "        {\n" +
            "            \"@version\": \"1.1\",\n" +
            "            \"wx\": \"https://api.weather.gov/ontology#\",\n" +
            "            \"s\": \"https://schema.org/\",\n" +
            "            \"geo\": \"http://www.opengis.net/ont/geosparql#\",\n" +
            "            \"unit\": \"http://codes.wmo.int/common/unit/\",\n" +
            "            \"@vocab\": \"https://api.weather.gov/ontology#\",\n" +
            "            \"geometry\": {\n" +
            "                \"@id\": \"s:GeoCoordinates\",\n" +
            "                \"@type\": \"geo:wktLiteral\"\n" +
            "            },\n" +
            "            \"city\": \"s:addressLocality\",\n" +
            "            \"state\": \"s:addressRegion\",\n" +
            "            \"distance\": {\n" +
            "                \"@id\": \"s:Distance\",\n" +
            "                \"@type\": \"s:QuantitativeValue\"\n" +
            "            },\n" +
            "            \"bearing\": {\n" +
            "                \"@type\": \"s:QuantitativeValue\"\n" +
            "            },\n" +
            "            \"county\": {\n" +
            "                \"@type\": \"@id\"\n" +
            "            }\n" +
            "        }\n" +
            "    ],\n" +
            "    \"id\": \"https://api.weather.gov/points/41.8251,-71.3982\",\n" +
            "    \"type\": \"Feature\",\n" +
            "    \"properties\": {\n" +
            "        \"@id\": \"https://api.weather.gov/points/41.8251,-71.3982\",\n" +
            "        \"@type\": \"wx:Point\",\n" +
            "        \"cwa\": \"BOX\",\n" +
            "        \"forecastOffice\": \"https://api.weather.gov/offices/BOX\",\n" +
            "        \"gridId\": \"BOX\",\n" +
            "        \"gridX\": 64,\n" +
            "        \"gridY\": 64,\n" +
            "        \"forecast\": \"https://api.weather.gov/gridpoints/BOX/64,64/forecast\",\n" +
            "        \"forecastHourly\": \"https://api.weather.gov/gridpoints/BOX/64,64/forecast/hourly\",\n" +
            "        \"forecastGridData\": \"https://api.weather.gov/gridpoints/BOX/64,64\",\n" +
            "        \"observationStations\": \"https://api.weather.gov/gridpoints/BOX/64,64/stations\",\n" +
            "        \"relativeLocation\": {\n" +
            "            \"type\": \"Feature\",\n" +
            "            \"geometry\": {\n" +
            "                \"type\": \"Point\",\n" +
            "                \"coordinates\": [\n" +
            "                    -71.418784000000002,\n" +
            "                    41.823056000000001\n" +
            "                ]\n" +
            "            },\n" +
            "            \"properties\": {\n" +
            "                \"city\": \"Providence\",\n" +
            "                \"state\": \"RI\",\n" +
            "                \"distance\": {\n" +
            "                    \"unitCode\": \"wmoUnit:m\",\n" +
            "                    \"value\": 1720.7102742975001\n" +
            "                },\n" +
            "                \"bearing\": {\n" +
            "                    \"unitCode\": \"wmoUnit:degree_(angle)\",\n" +
            "                    \"value\": 82\n" +
            "                }\n" +
            "            }\n" +
            "        },\n" +
            "        \"forecastZone\": \"https://api.weather.gov/zones/forecast/RIZ002\",\n" +
            "        \"county\": \"https://api.weather.gov/zones/county/RIC007\",\n" +
            "        \"fireWeatherZone\": \"https://api.weather.gov/zones/fire/RIZ002\",\n" +
            "        \"timeZone\": \"America/New_York\",\n" +
            "        \"radarStation\": \"KBOX\"\n" +
            "    }\n" +
            "}");

    mockData.put("https://api.weather.gov/gridpoints/BOX/64,64/forecast",
            "{\n" +
                    "    \"@context\": [\n" +
                    "        \"https://geojson.org/geojson-ld/geojson-context.jsonld\",\n" +
                    "        {\n" +
                    "            \"@version\": \"1.1\",\n" +
                    "            \"wx\": \"https://api.weather.gov/ontology#\",\n" +
                    "            \"geo\": \"http://www.opengis.net/ont/geosparql#\",\n" +
                    "            \"unit\": \"http://codes.wmo.int/common/unit/\",\n" +
                    "            \"@vocab\": \"https://api.weather.gov/ontology#\"\n" +
                    "        }\n" +
                    "    ],\n" +
                    "    \"type\": \"Feature\",\n" +
                    "    \"geometry\": {\n" +
                    "        \"type\": \"Polygon\",\n" +
                    "        \"coordinates\": [\n" +
                    "            [\n" +
                    "                [\n" +
                    "                    -71.3837762,\n" +
                    "                    41.861357300000002\n" +
                    "                ],\n" +
                    "                [\n" +
                    "                    -71.388849500000006,\n" +
                    "                    41.839880600000001\n" +
                    "                ],\n" +
                    "                [\n" +
                    "                    -71.360011700000001,\n" +
                    "                    41.836098100000001\n" +
                    "                ],\n" +
                    "                [\n" +
                    "                    -71.354932399999996,\n" +
                    "                    41.857574499999998\n" +
                    "                ],\n" +
                    "                [\n" +
                    "                    -71.3837762,\n" +
                    "                    41.861357300000002\n" +
                    "                ]\n" +
                    "            ]\n" +
                    "        ]\n" +
                    "    },\n" +
                    "    \"properties\": {\n" +
                    "        \"updated\": \"2023-03-04T21:13:09+00:00\",\n" +
                    "        \"units\": \"us\",\n" +
                    "        \"forecastGenerator\": \"BaselineForecastGenerator\",\n" +
                    "        \"generatedAt\": \"2023-03-04T23:39:28+00:00\",\n" +
                    "        \"updateTime\": \"2023-03-04T21:13:09+00:00\",\n" +
                    "        \"validTimes\": \"2023-03-04T15:00:00+00:00/P8DT6H\",\n" +
                    "        \"elevation\": {\n" +
                    "            \"unitCode\": \"wmoUnit:m\",\n" +
                    "            \"value\": 0.91439999999999999\n" +
                    "        },\n" +
                    "        \"periods\": [\n" +
                    "            {\n" +
                    "                \"number\": 1,\n" +
                    "                \"name\": \"Tonight\",\n" +
                    "                \"startTime\": \"2023-03-04T18:00:00-05:00\",\n" +
                    "                \"endTime\": \"2023-03-05T06:00:00-05:00\",\n" +
                    "                \"isDaytime\": false,\n" +
                    "                \"temperature\": 25,\n" +
                    "                \"temperatureUnit\": \"F\",\n" +
                    "                \"temperatureTrend\": null,\n" +
                    "                \"probabilityOfPrecipitation\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 30\n" +
                    "                },\n" +
                    "                \"dewpoint\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:degC\",\n" +
                    "                    \"value\": -1.1111111111111112\n" +
                    "                },\n" +
                    "                \"relativeHumidity\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 100\n" +
                    "                },\n" +
                    "                \"windSpeed\": \"3 to 15 mph\",\n" +
                    "                \"windDirection\": \"NW\",\n" +
                    "                \"icon\": \"https://api.weather.gov/icons/land/night/snow,30/bkn?size=medium\",\n" +
                    "                \"shortForecast\": \"Chance Light Snow then Mostly Cloudy\",\n" +
                    "                \"detailedForecast\": \"A chance of snow before 8pm. Mostly cloudy, with a low around 25. Northwest wind 3 to 15 mph, with gusts as high as 30 mph. Chance of precipitation is 30%.\"\n" +
                    "            },\n" +
                    "            {\n" +
                    "                \"number\": 2,\n" +
                    "                \"name\": \"Sunday\",\n" +
                    "                \"startTime\": \"2023-03-05T06:00:00-05:00\",\n" +
                    "                \"endTime\": \"2023-03-05T18:00:00-05:00\",\n" +
                    "                \"isDaytime\": true,\n" +
                    "                \"temperature\": 44,\n" +
                    "                \"temperatureUnit\": \"F\",\n" +
                    "                \"temperatureTrend\": null,\n" +
                    "                \"probabilityOfPrecipitation\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": null\n" +
                    "                },\n" +
                    "                \"dewpoint\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:degC\",\n" +
                    "                    \"value\": 0\n" +
                    "                },\n" +
                    "                \"relativeHumidity\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 100\n" +
                    "                },\n" +
                    "                \"windSpeed\": \"3 to 12 mph\",\n" +
                    "                \"windDirection\": \"W\",\n" +
                    "                \"icon\": \"https://api.weather.gov/icons/land/day/bkn?size=medium\",\n" +
                    "                \"shortForecast\": \"Partly Sunny\",\n" +
                    "                \"detailedForecast\": \"Partly sunny, with a high near 44. West wind 3 to 12 mph.\"\n" +
                    "            },\n" +
                    "            {\n" +
                    "                \"number\": 3,\n" +
                    "                \"name\": \"Sunday Night\",\n" +
                    "                \"startTime\": \"2023-03-05T18:00:00-05:00\",\n" +
                    "                \"endTime\": \"2023-03-06T06:00:00-05:00\",\n" +
                    "                \"isDaytime\": false,\n" +
                    "                \"temperature\": 30,\n" +
                    "                \"temperatureUnit\": \"F\",\n" +
                    "                \"temperatureTrend\": null,\n" +
                    "                \"probabilityOfPrecipitation\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": null\n" +
                    "                },\n" +
                    "                \"dewpoint\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:degC\",\n" +
                    "                    \"value\": -0.55555555555555558\n" +
                    "                },\n" +
                    "                \"relativeHumidity\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 82\n" +
                    "                },\n" +
                    "                \"windSpeed\": \"9 to 13 mph\",\n" +
                    "                \"windDirection\": \"NW\",\n" +
                    "                \"icon\": \"https://api.weather.gov/icons/land/night/few?size=medium\",\n" +
                    "                \"shortForecast\": \"Mostly Clear\",\n" +
                    "                \"detailedForecast\": \"Mostly clear, with a low around 30. Northwest wind 9 to 13 mph.\"\n" +
                    "            },\n" +
                    "            {\n" +
                    "                \"number\": 4,\n" +
                    "                \"name\": \"Monday\",\n" +
                    "                \"startTime\": \"2023-03-06T06:00:00-05:00\",\n" +
                    "                \"endTime\": \"2023-03-06T18:00:00-05:00\",\n" +
                    "                \"isDaytime\": true,\n" +
                    "                \"temperature\": 46,\n" +
                    "                \"temperatureUnit\": \"F\",\n" +
                    "                \"temperatureTrend\": null,\n" +
                    "                \"probabilityOfPrecipitation\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": null\n" +
                    "                },\n" +
                    "                \"dewpoint\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:degC\",\n" +
                    "                    \"value\": -2.7777777777777777\n" +
                    "                },\n" +
                    "                \"relativeHumidity\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 78\n" +
                    "                },\n" +
                    "                \"windSpeed\": \"14 to 20 mph\",\n" +
                    "                \"windDirection\": \"NW\",\n" +
                    "                \"icon\": \"https://api.weather.gov/icons/land/day/few?size=medium\",\n" +
                    "                \"shortForecast\": \"Sunny\",\n" +
                    "                \"detailedForecast\": \"Sunny, with a high near 46. Northwest wind 14 to 20 mph.\"\n" +
                    "            },\n" +
                    "            {\n" +
                    "                \"number\": 5,\n" +
                    "                \"name\": \"Monday Night\",\n" +
                    "                \"startTime\": \"2023-03-06T18:00:00-05:00\",\n" +
                    "                \"endTime\": \"2023-03-07T06:00:00-05:00\",\n" +
                    "                \"isDaytime\": false,\n" +
                    "                \"temperature\": 28,\n" +
                    "                \"temperatureUnit\": \"F\",\n" +
                    "                \"temperatureTrend\": null,\n" +
                    "                \"probabilityOfPrecipitation\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": null\n" +
                    "                },\n" +
                    "                \"dewpoint\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:degC\",\n" +
                    "                    \"value\": -3.8888888888888888\n" +
                    "                },\n" +
                    "                \"relativeHumidity\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 75\n" +
                    "                },\n" +
                    "                \"windSpeed\": \"7 to 16 mph\",\n" +
                    "                \"windDirection\": \"NW\",\n" +
                    "                \"icon\": \"https://api.weather.gov/icons/land/night/sct?size=medium\",\n" +
                    "                \"shortForecast\": \"Partly Cloudy\",\n" +
                    "                \"detailedForecast\": \"Partly cloudy, with a low around 28. Northwest wind 7 to 16 mph.\"\n" +
                    "            },\n" +
                    "            {\n" +
                    "                \"number\": 6,\n" +
                    "                \"name\": \"Tuesday\",\n" +
                    "                \"startTime\": \"2023-03-07T06:00:00-05:00\",\n" +
                    "                \"endTime\": \"2023-03-07T18:00:00-05:00\",\n" +
                    "                \"isDaytime\": true,\n" +
                    "                \"temperature\": 39,\n" +
                    "                \"temperatureUnit\": \"F\",\n" +
                    "                \"temperatureTrend\": null,\n" +
                    "                \"probabilityOfPrecipitation\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 30\n" +
                    "                },\n" +
                    "                \"dewpoint\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:degC\",\n" +
                    "                    \"value\": -2.7777777777777777\n" +
                    "                },\n" +
                    "                \"relativeHumidity\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 78\n" +
                    "                },\n" +
                    "                \"windSpeed\": \"8 to 14 mph\",\n" +
                    "                \"windDirection\": \"NW\",\n" +
                    "                \"icon\": \"https://api.weather.gov/icons/land/day/snow,30/rain,30?size=medium\",\n" +
                    "                \"shortForecast\": \"Chance Light Snow then Chance Light Rain\",\n" +
                    "                \"detailedForecast\": \"A chance of snow before 11am, then a chance of rain. Partly sunny, with a high near 39. Northwest wind 8 to 14 mph. Chance of precipitation is 30%.\"\n" +
                    "            },\n" +
                    "            {\n" +
                    "                \"number\": 7,\n" +
                    "                \"name\": \"Tuesday Night\",\n" +
                    "                \"startTime\": \"2023-03-07T18:00:00-05:00\",\n" +
                    "                \"endTime\": \"2023-03-08T06:00:00-05:00\",\n" +
                    "                \"isDaytime\": false,\n" +
                    "                \"temperature\": 29,\n" +
                    "                \"temperatureUnit\": \"F\",\n" +
                    "                \"temperatureTrend\": null,\n" +
                    "                \"probabilityOfPrecipitation\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": null\n" +
                    "                },\n" +
                    "                \"dewpoint\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:degC\",\n" +
                    "                    \"value\": -2.7777777777777777\n" +
                    "                },\n" +
                    "                \"relativeHumidity\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 81\n" +
                    "                },\n" +
                    "                \"windSpeed\": \"17 mph\",\n" +
                    "                \"windDirection\": \"NW\",\n" +
                    "                \"icon\": \"https://api.weather.gov/icons/land/night/bkn?size=medium\",\n" +
                    "                \"shortForecast\": \"Mostly Cloudy\",\n" +
                    "                \"detailedForecast\": \"Mostly cloudy, with a low around 29. Northwest wind around 17 mph.\"\n" +
                    "            },\n" +
                    "            {\n" +
                    "                \"number\": 8,\n" +
                    "                \"name\": \"Wednesday\",\n" +
                    "                \"startTime\": \"2023-03-08T06:00:00-05:00\",\n" +
                    "                \"endTime\": \"2023-03-08T18:00:00-05:00\",\n" +
                    "                \"isDaytime\": true,\n" +
                    "                \"temperature\": 46,\n" +
                    "                \"temperatureUnit\": \"F\",\n" +
                    "                \"temperatureTrend\": null,\n" +
                    "                \"probabilityOfPrecipitation\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": null\n" +
                    "                },\n" +
                    "                \"dewpoint\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:degC\",\n" +
                    "                    \"value\": 0.55555555555555558\n" +
                    "                },\n" +
                    "                \"relativeHumidity\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 81\n" +
                    "                },\n" +
                    "                \"windSpeed\": \"17 mph\",\n" +
                    "                \"windDirection\": \"N\",\n" +
                    "                \"icon\": \"https://api.weather.gov/icons/land/day/bkn?size=medium\",\n" +
                    "                \"shortForecast\": \"Partly Sunny\",\n" +
                    "                \"detailedForecast\": \"Partly sunny, with a high near 46. North wind around 17 mph.\"\n" +
                    "            },\n" +
                    "            {\n" +
                    "                \"number\": 9,\n" +
                    "                \"name\": \"Wednesday Night\",\n" +
                    "                \"startTime\": \"2023-03-08T18:00:00-05:00\",\n" +
                    "                \"endTime\": \"2023-03-09T06:00:00-05:00\",\n" +
                    "                \"isDaytime\": false,\n" +
                    "                \"temperature\": 32,\n" +
                    "                \"temperatureUnit\": \"F\",\n" +
                    "                \"temperatureTrend\": null,\n" +
                    "                \"probabilityOfPrecipitation\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": null\n" +
                    "                },\n" +
                    "                \"dewpoint\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:degC\",\n" +
                    "                    \"value\": 0.55555555555555558\n" +
                    "                },\n" +
                    "                \"relativeHumidity\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 89\n" +
                    "                },\n" +
                    "                \"windSpeed\": \"12 to 15 mph\",\n" +
                    "                \"windDirection\": \"N\",\n" +
                    "                \"icon\": \"https://api.weather.gov/icons/land/night/bkn?size=medium\",\n" +
                    "                \"shortForecast\": \"Mostly Cloudy\",\n" +
                    "                \"detailedForecast\": \"Mostly cloudy, with a low around 32. North wind 12 to 15 mph.\"\n" +
                    "            },\n" +
                    "            {\n" +
                    "                \"number\": 10,\n" +
                    "                \"name\": \"Thursday\",\n" +
                    "                \"startTime\": \"2023-03-09T06:00:00-05:00\",\n" +
                    "                \"endTime\": \"2023-03-09T18:00:00-05:00\",\n" +
                    "                \"isDaytime\": true,\n" +
                    "                \"temperature\": 45,\n" +
                    "                \"temperatureUnit\": \"F\",\n" +
                    "                \"temperatureTrend\": null,\n" +
                    "                \"probabilityOfPrecipitation\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": null\n" +
                    "                },\n" +
                    "                \"dewpoint\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:degC\",\n" +
                    "                    \"value\": -0.55555555555555558\n" +
                    "                },\n" +
                    "                \"relativeHumidity\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 88\n" +
                    "                },\n" +
                    "                \"windSpeed\": \"14 mph\",\n" +
                    "                \"windDirection\": \"N\",\n" +
                    "                \"icon\": \"https://api.weather.gov/icons/land/day/bkn?size=medium\",\n" +
                    "                \"shortForecast\": \"Partly Sunny\",\n" +
                    "                \"detailedForecast\": \"Partly sunny, with a high near 45. North wind around 14 mph.\"\n" +
                    "            },\n" +
                    "            {\n" +
                    "                \"number\": 11,\n" +
                    "                \"name\": \"Thursday Night\",\n" +
                    "                \"startTime\": \"2023-03-09T18:00:00-05:00\",\n" +
                    "                \"endTime\": \"2023-03-10T06:00:00-05:00\",\n" +
                    "                \"isDaytime\": false,\n" +
                    "                \"temperature\": 29,\n" +
                    "                \"temperatureUnit\": \"F\",\n" +
                    "                \"temperatureTrend\": null,\n" +
                    "                \"probabilityOfPrecipitation\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": null\n" +
                    "                },\n" +
                    "                \"dewpoint\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:degC\",\n" +
                    "                    \"value\": -0.55555555555555558\n" +
                    "                },\n" +
                    "                \"relativeHumidity\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 92\n" +
                    "                },\n" +
                    "                \"windSpeed\": \"12 mph\",\n" +
                    "                \"windDirection\": \"NW\",\n" +
                    "                \"icon\": \"https://api.weather.gov/icons/land/night/sct?size=medium\",\n" +
                    "                \"shortForecast\": \"Partly Cloudy\",\n" +
                    "                \"detailedForecast\": \"Partly cloudy, with a low around 29. Northwest wind around 12 mph.\"\n" +
                    "            },\n" +
                    "            {\n" +
                    "                \"number\": 12,\n" +
                    "                \"name\": \"Friday\",\n" +
                    "                \"startTime\": \"2023-03-10T06:00:00-05:00\",\n" +
                    "                \"endTime\": \"2023-03-10T18:00:00-05:00\",\n" +
                    "                \"isDaytime\": true,\n" +
                    "                \"temperature\": 45,\n" +
                    "                \"temperatureUnit\": \"F\",\n" +
                    "                \"temperatureTrend\": null,\n" +
                    "                \"probabilityOfPrecipitation\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": null\n" +
                    "                },\n" +
                    "                \"dewpoint\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:degC\",\n" +
                    "                    \"value\": -1.6666666666666667\n" +
                    "                },\n" +
                    "                \"relativeHumidity\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 92\n" +
                    "                },\n" +
                    "                \"windSpeed\": \"12 mph\",\n" +
                    "                \"windDirection\": \"NW\",\n" +
                    "                \"icon\": \"https://api.weather.gov/icons/land/day/sct?size=medium\",\n" +
                    "                \"shortForecast\": \"Mostly Sunny\",\n" +
                    "                \"detailedForecast\": \"Mostly sunny, with a high near 45. Northwest wind around 12 mph.\"\n" +
                    "            },\n" +
                    "            {\n" +
                    "                \"number\": 13,\n" +
                    "                \"name\": \"Friday Night\",\n" +
                    "                \"startTime\": \"2023-03-10T18:00:00-05:00\",\n" +
                    "                \"endTime\": \"2023-03-11T06:00:00-05:00\",\n" +
                    "                \"isDaytime\": false,\n" +
                    "                \"temperature\": 27,\n" +
                    "                \"temperatureUnit\": \"F\",\n" +
                    "                \"temperatureTrend\": null,\n" +
                    "                \"probabilityOfPrecipitation\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": null\n" +
                    "                },\n" +
                    "                \"dewpoint\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:degC\",\n" +
                    "                    \"value\": -1.1111111111111112\n" +
                    "                },\n" +
                    "                \"relativeHumidity\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 88\n" +
                    "                },\n" +
                    "                \"windSpeed\": \"10 mph\",\n" +
                    "                \"windDirection\": \"N\",\n" +
                    "                \"icon\": \"https://api.weather.gov/icons/land/night/sct?size=medium\",\n" +
                    "                \"shortForecast\": \"Partly Cloudy\",\n" +
                    "                \"detailedForecast\": \"Partly cloudy, with a low around 27. North wind around 10 mph.\"\n" +
                    "            },\n" +
                    "            {\n" +
                    "                \"number\": 14,\n" +
                    "                \"name\": \"Saturday\",\n" +
                    "                \"startTime\": \"2023-03-11T06:00:00-05:00\",\n" +
                    "                \"endTime\": \"2023-03-11T18:00:00-05:00\",\n" +
                    "                \"isDaytime\": true,\n" +
                    "                \"temperature\": 44,\n" +
                    "                \"temperatureUnit\": \"F\",\n" +
                    "                \"temperatureTrend\": null,\n" +
                    "                \"probabilityOfPrecipitation\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 30\n" +
                    "                },\n" +
                    "                \"dewpoint\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:degC\",\n" +
                    "                    \"value\": -1.1111111111111112\n" +
                    "                },\n" +
                    "                \"relativeHumidity\": {\n" +
                    "                    \"unitCode\": \"wmoUnit:percent\",\n" +
                    "                    \"value\": 92\n" +
                    "                },\n" +
                    "                \"windSpeed\": \"10 to 14 mph\",\n" +
                    "                \"windDirection\": \"NE\",\n" +
                    "                \"icon\": \"https://api.weather.gov/icons/land/day/rain/rain,30?size=medium\",\n" +
                    "                \"shortForecast\": \"Chance Light Rain\",\n" +
                    "                \"detailedForecast\": \"A chance of rain after 8am. Partly sunny, with a high near 44. Northeast wind 10 to 14 mph. Chance of precipitation is 30%.\"\n" +
                    "            }\n" +
                    "        ]\n" +
                    "    }\n" +
                    "}"
    );

    // check that coordinates out of bound error message appears
    mockData.put("https://api.weather.gov/points/100.0,100.0",
            "{\n" +
                    "    \"correlationId\": \"740ad369\",\n" +
                    "    \"title\": \"Invalid Parameter\",\n" +
                    "    \"type\": \"https://api.weather.gov/problems/InvalidParameter\",\n" +
                    "    \"status\": 400,\n" +
                    "    \"detail\": \"Parameter \\\"point\\\" is invalid: '100,100' does not appear to be a valid coordinate\",\n" +
                    "    \"instance\": \"https://api.weather.gov/requests/740ad369\"\n" +
                    "}"
    );
    
    // check that can Invalid Coordinates error message appears
    mockData.put("https://api.weather.gov/points/0.0,0.0",
            "{\n" +
                    "    \"correlationId\": \"3ed7316\",\n" +
                    "    \"title\": \"Data Unavailable For Requested Point\",\n" +
                    "    \"type\": \"https://api.weather.gov/problems/InvalidPoint\",\n" +
                    "    \"status\": 404,\n" +
                    "    \"detail\": \"Unable to provide data for requested point 0,0\",\n" +
                    "    \"instance\": \"https://api.weather.gov/requests/3ed7316\"\n" +
                    "}"
    );

    return mockData;
  }
}
