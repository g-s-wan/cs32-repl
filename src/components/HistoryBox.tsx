import CSVTable from "./CSVTable";
import { useEffect, useRef} from 'react';

import { history } from "../REPL/History";
interface HistoryBoxProps {
  history : History;
}

import {additionalData} from "../REPL/AdditionalData";

/**
 * Solution that scrolls the History box when new items are added (this ensure that the last elements are 
 * always visible).
 */
const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef?.current?.scrollIntoView());
  return <div ref={elementRef} />;
};

const entryIsTable = (entry: any) : boolean => {

  try {
    const element00 = entry[0][0];
    console.log("element 00 = " + element00)
    return true;
  } catch {
    return false;
  }
}

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
