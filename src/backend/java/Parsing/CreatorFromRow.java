package Parsing;

import Parsing.Exceptions.FactoryFailureException;
import java.util.List;

public interface CreatorFromRow<T> {
  T create(List<String> row) throws FactoryFailureException;
}
