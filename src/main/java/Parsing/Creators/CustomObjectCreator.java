package Parsing.Creators;

import Parsing.CreatorFromRow;
import Parsing.Exceptions.FactoryFailureException;
import java.util.List;

public class CustomObjectCreator implements CreatorFromRow<CustomObject> {

  @Override
  public CustomObject create(List<String> row) throws FactoryFailureException {
    CustomObject object =
        new CustomObject(row.get(0), row.get(1), row.get(2), row.get(3), row.get(4));

    return object;
  }
}
