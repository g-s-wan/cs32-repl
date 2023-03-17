package Server;

import static spark.Spark.after;

import Server.handlers.csv.ClearHandler;
import Server.handlers.csv.LoadHandler;
import Server.handlers.csv.SearchHandler;
import Server.handlers.csv.State;
import Server.handlers.csv.ViewHandler;
import spark.Spark;

/**
 * Top-level class. Contains the main() method which starts Spark and runs the various handlers.
 *
 */
public class Server {
    public static void main(String[] args) {
        int portNum = 3232;
        Spark.port(portNum);
        after((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "*");
        });
        State state = new State();
        // Setting up the handler for each endpoint
        Spark.get("loadcsv", new LoadHandler(state));
        Spark.get("viewcsv", new ViewHandler(state));
        Spark.get("searchcsv", new SearchHandler(state));
        Spark.get("clear", new ClearHandler(state));
        Spark.init();
        Spark.awaitInitialization();
        System.out.println("Server started in port " + portNum);
    }
}
