package Parsing.Creators;

import Parsing.CreatorFromRow;
import Parsing.Exceptions.FactoryFailureException;
import java.util.List;

public class StringCreator implements CreatorFromRow<String> {
  public StringCreator() {}

  @Override
  public String create(List<String> row) throws FactoryFailureException {
    String csvData = "";
    for (int i = 0; i < row.size(); i++) {
      csvData = csvData.concat(row.get(i));
      if (i != row.size() - 1) {
        csvData = csvData.concat(" ");
      }
    }
    return csvData;
  }
}
