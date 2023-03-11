import { useState } from "react";

interface InputBoxProps {
  history: string[];
  handle: (data: string[]) => void;
  onKeyPress: Function;
}

export default function InputBox(props: InputBoxProps) {
  const [text, setText] = useState("");

  /**
   * Handles the submit button being clicked or the enter key being pressed!
   * You may want to make this function more sophisticated to add real
   * command logic, but for now it just adds the text to the history box.
   */
  function handleSubmit() {
    props.handle([...props.history, text]);
    setText("");
  }

  return (
    <div className="repl-input">
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyUp={(e) => {
          if (e.key == "Enter") {
            handleSubmit();
          }
        }}
        className="repl-command-box"
      />
      <button className="repl-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
