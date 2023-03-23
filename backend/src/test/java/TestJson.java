import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import Parsing.JsonFromFile;

/**
 * Test the actual handlers.
 */
public class TestJson {

    @Test
    public void testPrintSimpleJson() throws Exception {

    try {
        JsonFromFile json = new JsonFromFile("geodata.json");

        assertTrue(json.containsTopLevelField("type"));
        assertTrue(json.containsTopLevelField("features"));        

    } catch (Exception e) {
        System.out.println(e.getMessage());
    }        
    }

    @Test
    public void getDeeperGeoField() throws Exception {

        try {
            JsonFromFile json = new JsonFromFile("geodata.json");

            List<String> expected = new ArrayList<String>();
            expected.add("[102.0,0.5]");
            expected.add("[[102.0,0.0],[103.0,1.0],[104.0,0.0],[105.0,1.0]]"); 
            expected.add("[[[100.0,0.0],[101.0,0.0],[101.0,1.0],[100.0,1.0],[100.0,0.0]]]");

            List<String> searchResult = json.searchFieldValues("coordinates");

            assertEquals(searchResult, expected);

            searchResult = json.searchFieldValues("properties");
            System.out.println(searchResult);
            System.out.println(searchResult.get(0));

            assertTrue(searchResult.get(0).contains("prop0"));
            assertTrue(searchResult.get(1).contains("prop1"));
            assertTrue(searchResult.get(2).contains("that"));

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }        
    }

    @Test
    public void getInstances() {
     
        try {
            JsonFromFile json = new JsonFromFile("family.json");

            List<String> searchResult = json.searchFieldValues("son");
            Assertions.assertEquals(searchResult.size(), 1);

            String sonString = searchResult.get(0);
            assertTrue(sonString.contains("Peter"));
            assertTrue(sonString.contains("Schoolboy"));
            assertTrue(sonString.contains("11"));

            searchResult = json.searchFieldValues("name");
            assertEquals(searchResult.size(), 3);

            assertEquals(searchResult.get(0), "Bob");
            assertEquals(searchResult.get(1), "Alice");
            assertEquals(searchResult.get(2), "Peter");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}