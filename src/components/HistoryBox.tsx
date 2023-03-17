import { useEffect, useRef} from 'react';


interface HistoryBoxProps {
  history: (string|string[])[];
}

/**
 * Solution that scrolls the History box when new items are added (this ensure that the last elements are 
 * always visible).
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
 * Component that displays the History
 */
function HistoryBox(props: HistoryBoxProps) {

  const history = props.history;

  return (
    <div className="repl-history" role="main">
      {history.map((item, index) => (
          <div>
             <div key={index} dangerouslySetInnerHTML={{ __html: item.toString() }}/>
             <hr  key={index + history.length}/>
          </div>
       ))}
      <AlwaysScrollToBottom />
    </div>
  );
}
export default HistoryBox;