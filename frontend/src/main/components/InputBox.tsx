interface InputBoxProps {
  handle: (data: string ) => void;
   text: string;
  setText: Function;
}

/**
 * Contains input-related elements (i.e. command box and Submit button)
 * @param props
 * @constructor
 */
export default function InputBox(props: InputBoxProps) {

  /**
   * Handles the submit button being clicked or the enter key being pressed
   */
  function handleSubmit() {
    props.handle(props.text);
    props.setText("");
  }

  // When the user presses "Enter" or clicks the button, the command is processed
  return (
    <div className="repl-input repl-center" aria-label="REPL input area">
      <input
        role= "input"
        type="text"
        onChange={(e) => props.setText(e.target.value)}
        value={props.text}
        onKeyUp={(e) => {
          if (e.key == "Enter") {
            handleSubmit();
          }
        }}
        className="repl-command-box"
        aria-label="Desired command"
      />

      <button role="button" aria-labelledby="Submit command" className="repl-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}
