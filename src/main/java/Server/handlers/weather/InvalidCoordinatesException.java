package Server.handlers.weather;

import java.io.IOException;

/**
 * Exception for invalid lat and lon coordinates
 */
public class InvalidCoordinatesException extends IOException {

    /**
     * Constructor takes in error message
     */
    public InvalidCoordinatesException(String error){
        super(error);
    }
}
