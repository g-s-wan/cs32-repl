import { useEffect, useRef} from 'react';


interface HistoryBoxProps {
  history: (string|string[])[];
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
 */
function HistoryBox(props: HistoryBoxProps) {

  const history = props.history;
  const alternatingColor = ['#d5d5d5', '#a9a9a9'];

  return (
    <div className="repl-history">
      {history.map((item, index) => (    
             <div key={index} dangerouslySetInnerHTML={{ __html: item.toString() }} /> 
       ))}

      <AlwaysScrollToBottom />
    </div>
  );
}

export default HistoryBox;