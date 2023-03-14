import CSVTable from "./CSVTable";
import { useEffect, useRef} from 'react';

import { history } from "../REPL/History";
interface HistoryBoxProps {
  history : History;
}

/**
 * Solution that scrolls the History box when new items are added (this ensure that the last elements are 
 * always visible).
 */
const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef?.current?.scrollIntoView());
  return <div ref={elementRef} />;
};

/**
 * Component that displays the History
 * @param props 
 * @returns 
 */
function HistoryBox(props: HistoryBoxProps) {

//  const history = props.history;

  const alternatingColor = ['#d5d5d5', '#a9a9a9'];


  return (
      // <CSVTable csvTable={props.csvTable} />
    <div className="repl-history">
      {history.entries.map((item, index) => (
           (item.type == "string")? 
               <div key={index} style={{backgroundColor: alternatingColor[index % alternatingColor.length]}}>{item.value.toString()} </div>
             : <div key={index}> <CSVTable csvTable={item.value} /> </div>
       ))}

      <AlwaysScrollToBottom />
    </div>
  );
}

export default HistoryBox;
