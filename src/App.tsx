import { useState } from "react";
import "../styles/App.css";
import Header from "./components/Header";
import HistoryBox from "./components/HistoryBox";
import InputBox from "./components/InputBox";

function App() {
  // The data state is an array of strings, which is passed to our components
  // You may want to make this a more complex object, but for now it's just a string
  const [history, setHistory] = useState<string[]>([]);

  return (
    <div>
      <Header />
      <div className="repl">
        <HistoryBox history={history} />
        <hr />
        <InputBox history={history} setHistory={setHistory} />
      </div>
    </div>
  );
}

export default App;
