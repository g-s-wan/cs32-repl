interface CSVTableProps {

  csvTable: string[][] | string;  // The | string is for type checking only
}

function CSVTable(props: CSVTableProps) {
  const csvTable = props.csvTable;

  const alternatingColor = ['Lightgreen', 'cyan'];

  return (
      <div className="repl-center">
        <table style={{width: "80%" }} >
          <thead>
          {Object.values(csvTable).map((row, index) => (
              <tr key={index} style={{backgroundColor: alternatingColor[index % alternatingColor.length]}}>
                {Object.values(row).map((col, index) => (<td key={index} className="repl-table-column">{col}</td>))}
              </tr>
          ))}
          </thead>
        </table>
      </div>
  );
}

export default CSVTable;