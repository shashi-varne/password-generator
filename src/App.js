import { useState } from "react";
import "./App.css";
import usePasswordGenerator from "./usePasswordGenerator";

function App() {
  const [length, setLength] = useState(10);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Uppercase letters", state: false },
    { title: "Lowercase letters", state: false },
    { title: "Numbers", state: false },
    { title: "Symbols", state: false },
  ]);
  const { password, errorMessage, generatePassword } = usePasswordGenerator();
  const [copied, setCopied] = useState(false);

  const onCheckboxClick = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="title">{password}</div>
          <button onClick={handleCopy} className="copyBtn">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="charLength">
          <span>
            <label>Character length</label>
            <label>{length}</label>
          </span>
          <input
            type="range"
            min="4"
            max="20"
            onChange={(e) => setLength(e.target.value)}
            value={length}
          />
        </div>

        <div className="checkboxes">
          {checkboxData?.map((checkbox, i) => {
            return (
              <div key={i}>
                <input
                  type="checkbox"
                  checked={checkbox.state}
                  name="password-options"
                  onClick={() => onCheckboxClick(i)}
                />
                <label>{checkbox.title}</label>
              </div>
            );
          })}
        </div>

        <button
          className="generateBtn"
          onClick={() => generatePassword(checkboxData, length)}
        >
          Generate password
        </button>
      </div>
      <div className="errorMessage">
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default App;
