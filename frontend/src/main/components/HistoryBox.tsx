import { useEffect, useRef} from 'react';

interface HistoryBoxProps {
  history: (string|string[])[];
}

/**
 * Solution that scrolls the History box when new items are added (this ensures that the last, most recently added elements
 * are always visible).
 */
const AlwaysScrollToBottom = () => {

  try {
    const elementRef = useRef();

     useEffect(() => {
       if (elementRef && elementRef.current) {
         elementRef.current.scrollIntoView();
       }
     });
     return <div ref={elementRef} />;

  } catch {
    return null;
  }
};

/**
 * Component that displays the REPL history
 */
function HistoryBox(props: HistoryBoxProps) {

  const history = props.history;

  return (
      // Loops through the history and creates a div for each entry, along with a separator after
    <div className="repl-history" role="main" aria-label="repl-history">
      {history.map((item, index) => (
          <div aria-labelledby="REPL history entry">
             <div key={index} dangerouslySetInnerHTML={{ __html: item.toString() }}/>
             <hr  key={index + history.length}/>
          </div>
       ))}
      <AlwaysScrollToBottom />
    </div>
  );
}
export default HistoryBox;