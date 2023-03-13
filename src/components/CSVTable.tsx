interface CSVTableProps {

  csvTable: string[];
}

function CSVTable(props: CSVTableProps) {
  const csvTable = props.csvTable;

  return (
      <div className="repl-center">
        <table aria-label="table">
          <thead>
          {Object.values(csvTable).map((row) => (
              <tr>{row.toString()}</tr>
          ))}
          </thead>
        </table>
      </div>
  );
}

export default CSVTable;