interface CSVTableProps {

  csvTable: string[];
}

function CSVTable(props: CSVTableProps) {
  const csvTable = props.csvTable;

  return (
      <table>
        <thead>
        {Object.values(csvTable).map((row) => (
            <tr>{row.toString()}</tr>
        ))}
        </thead>
      </table>
  );
}

export default CSVTable;