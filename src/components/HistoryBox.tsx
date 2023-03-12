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
    </div>
  );
}

export default HistoryBox;
