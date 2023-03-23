package Parsing;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

/**
 * Read JSON from file into a JSON object.  Provides search functionality
 */
public class JsonFromFile {

    private JSONObject jsonObj;

    // Constructor reads Json from file and created a JSONObject
    //
    public JsonFromFile (String filePath) throws Exception{

        JSONParser parser = new JSONParser();
        
        try {
            jsonObj = (JSONObject) parser.parse(new FileReader("../data/" + filePath));
        } catch (Exception e) {
            jsonObj = null;
            throw e;
        }
    }


    /**
     * Returns the JSONObject created from Json data in the file.
     * @return JSON object.
     */
    public JSONObject getJsonObject() {
        return this.jsonObj;
    }

    /**
     * Searches recursively for the values that a given field has in the Json file.
     * @param fieldName: field (key) whose value we search for
     * @return
     */
    public List<String> searchFieldValues(String fieldName) {
        return getValuesInObject(this.jsonObj, fieldName);
    }

    /**
     * Helper function written so it can be called recursively
     * @param jsonObject: the JSON object to search within
     * @param key the key/field whose value we need
     * @return the list of values found
     */
    private List<String> getValuesInObject(JSONObject jsonObject, String key) {
        List<String> accumulatedValues = new ArrayList<String>();

        if (jsonObject == null) return accumulatedValues;

        Set<String> keys =  jsonObject.keySet();
        for (String currentKey : keys) {
            Object value = jsonObject.get(currentKey);
            if (currentKey.equals(key)) {
                accumulatedValues.add(value.toString());
            }

            if (value instanceof JSONObject) {
                accumulatedValues.addAll(getValuesInObject((JSONObject) value, key));
            } else if (value instanceof JSONArray) {
                accumulatedValues.addAll(getValuesInArray((JSONArray) value, key));
            }
        }

        return accumulatedValues;
    }

    /**
     * Helper function
     */
    private List<String> getValuesInArray(JSONArray jsonArray, String key) {
        List<String> accumulatedValues = new ArrayList<>();

        if (jsonArray == null) return accumulatedValues;

        for (Object obj : jsonArray) {
            if (obj instanceof JSONArray) {
                accumulatedValues.addAll(getValuesInArray((JSONArray) obj, key));
            } else if (obj instanceof JSONObject) {
                accumulatedValues.addAll(getValuesInObject((JSONObject) obj, key));
            }
        }

        return accumulatedValues;
    }


    /**
     * Returns true if the JSON file contains a top level field 
     * @param fieldName: the name of the field
     * @return True if Json contains the field
     */
    public boolean containsTopLevelField(String fieldName) {

        if (this.jsonObj != null)
            for(Iterator iterator = jsonObj.keySet().iterator(); iterator.hasNext();) {
                String key = (String) iterator.next();
                if (key.equals(fieldName)) 
                    return true;
            }
        return false;
    }

}
