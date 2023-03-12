interface CSVTableProps {
  csvTable: string[];
}

function CSVTable(props: CSVTableProps) {
  const csvTable = props.csvTable;

  return (
      <table>
        <tbody>
        {Object.values(csvTable).map((row) => (
            <tr>{row.toString()}</tr>
        ))}
        </tbody>
      </table>
  );
}

export default CSVTable;