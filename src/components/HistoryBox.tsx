interface HistoryBoxProps {
  history: string[];
}

function HistoryBox(props: HistoryBoxProps) {
  const history = props.history;
  return (
    <div className="repl-history">
      {history.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      {/* TODO: Add a div for each command in the history */}
      {/* Hint: You can use the map function to iterate over an array */}
    </div>
  );
}

export default HistoryBox;
