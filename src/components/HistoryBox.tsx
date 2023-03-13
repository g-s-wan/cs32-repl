import CSVTable from "./CSVTable";

interface HistoryBoxProps {
  history: (string|string[])[];
}

function HistoryBox(props: HistoryBoxProps) {
  const history = props.history;

  // history.map((item, index) => {
  //   console.log(typeof item);
  // })
  return (
      // <CSVTable csvTable={props.csvTable} />
    <div className="repl-history">
      {history.map((item, index) => (
          typeof item === "string" ? <div key={index}>{item}</div> : <CSVTable csvTable={item} />
      ))}
    </div>
  );
}

export default HistoryBox;
