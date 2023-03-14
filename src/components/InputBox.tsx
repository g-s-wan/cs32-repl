import {MutableRefObject, useState} from "react";
import CSVTable from "./CSVTable";

interface InputBoxProps {
  history: (string|string[])[];
  handle: (data: (string | string[])[]) => void;
  text: string;
  setText: Function;
}

export default function InputBox(props: InputBoxProps) {

  /**
   * Handles the submit button being clicked or the enter key being pressed!
   * You may want to make this function more sophisticated to add real
   * command logic, but for now it just adds the text to the history box.
   */
  function handleSubmit() {
    props.handle([...props.history, props.text]);
    props.setText("");
  }

  return (
    <div className="repl-input">
      <input
        type="text"
        onChange={(e) => props.setText(e.target.value)}
        value={props.text}
        onKeyUp={(e) => {
          if (e.key == "Enter") {
            handleSubmit();
          }
        }}
        className="repl-command-box"
        role="input"
        aria-labelledby="input-box-id"
      />
      <button className="repl-button" onClick={handleSubmit}>
      Submit
      </button>
    </div>
  );
}
