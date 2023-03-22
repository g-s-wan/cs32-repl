import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../main/components/Header";
import HistoryBox from "../main/components/HistoryBox";
import InputBox from "../main/components/InputBox";
import App from "../main/App";
import "../main/styles/App.css";
import jest from "jest-mock";

Element.prototype.scrollIntoView = jest.fn();

/** 
 *   SPRINT-2 LIKE TESTS
 */
describe("Page loading works as expected", () => {
  test("Page has required elements", async () => {
    render(<App />);
    
    // Check we have a History box
    expect(screen.getByRole("main")).toBeInTheDocument();

    // Check we have an inout box
    expect(screen.getByRole("input")).toBeInTheDocument();

    // Check we have an input box
    expect(screen.getByRole("button")).toBeInTheDocument();

    // Check that the input box is empty
    expect(screen.getByRole("input")).toBeEmptyDOMElement();

    // Check that the button has the correct label
    expect(screen.getByRole("button")).toContainHTML("button")

    expect(screen.getByText(/REPL/i)).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();

  })

  test("Header has required elements", async () => {
    render(<Header />);
      
    expect(screen.getByText(/REPL/i)).toBeInTheDocument();
  })

  test("HistoryBox has required elements", async () => {
    render(<HistoryBox history={[]}/>);
      
    // Check we have a History box
    expect(screen.getByRole("main")).toBeInTheDocument();

  })

  test("InputBox has required elements", async () => {
    function handleFunc() {};
    function setTextFunc(txt: string){};

    render(
      <InputBox  
        handle={handleFunc}
        text={""}
        setText={setTextFunc}/>
      );
      
    // Check that the input box is empty
    expect(screen.getByRole("input")).toBeEmptyDOMElement();

    // Check that the button has the correct label
    expect(screen.getByRole("button")).toContainHTML("button")

    expect(screen.getByText("Submit")).toBeInTheDocument();
    
  })

})

