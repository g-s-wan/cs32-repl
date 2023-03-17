package Parsing.Creators;

import Parsing.CreatorFromRow;
import Parsing.Exceptions.FactoryFailureException;
import java.util.List;

public class ArrayCreator implements CreatorFromRow<String[]> {
  public ArrayCreator() {}

  @Override
  public String[] create(List<String> row) throws FactoryFailureException {
    String[] csvArray = new String[row.size()];

    for (int i = 0; i < row.size(); i++) {
      csvArray[i] = row.get(i);
    }
    return csvArray;
  }
}
