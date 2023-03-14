import CSVTable from "./CSVTable";
import {EffectCallback, forwardRef, LegacyRef, useEffect} from "react";

interface HistoryBoxProps {
  history: (string|string[])[];
  scrollRef: LegacyRef<HTMLDivElement>;
}

function HistoryBox(props: HistoryBoxProps) {
  const history = props.history;

  // history.map((item, index) => {
  //   console.log(typeof item);
  // })
  return (
      // <CSVTable csvTable={props.csvTable} />
    <div className="repl-history" ref={props.scrollRef}>
      {history.map((item, index) => (
          typeof item === "string" ? <div key={index}>{item}<hr/></div> : <div><CSVTable csvTable={item} /><hr/></div>
      ))}
    </div>
  );
}

export default HistoryBox;
