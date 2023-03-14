interface CSVTableProps {

  csvTable: string[];
}

function CSVTable(props: CSVTableProps) {
  const csvTable = props.csvTable;

  return (
      <div className="repl-center">
        <table>
          <thead>
          {Object.values(csvTable).map((row) => (
              <tr>{row.toString().split(",").map((word) => (
                  <td className="table-cell">{word}</td>
              ))
              }</tr>
          ))}
          </thead>
        </table>
      </div>
  );
}

export default CSVTable;