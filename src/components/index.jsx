import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { transform } from "@babel/standalone";
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    padding: "10px",
    backgroundColor: "#f0f0f0",
  },
  editorContainer: {
    width: "50%",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  outputContainer: {
    width: "50%",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginLeft: "10px",
  },
  button: {
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  errorText: {
    color: "red",
    marginTop: "10px",
  },
};

const LiveCodeEditor = () => {
  const [code, setCode] = useState(
    `function App() { return <h1>Hello, world!</h1>; }`
  );
  const [error, setError] = useState(null);
  const [component, setComponent] = useState(null);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleValidateCode = () => {
    setError(null);
    try {
      const transpiledCode = transform(code, {
        presets: ["react"],
      }).code;
      const componentFunction = new Function(
        "React",
        `
        ${transpiledCode}
        return App;
      `
      )(React);
      setComponent(React.createElement(componentFunction));
    } catch (err) {
      setError("Invalid code: " + err.message);
      setComponent(null);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.editorContainer}>
        <Editor
          height="80vh"
          language="javascript"
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
          }}
        />
        <button style={styles.button} onClick={handleValidateCode}>
          Validate Code
        </button>
        {error && <div style={styles.errorText}>{error}</div>}
      </div>
      <div style={styles.outputContainer}>
        <h2>Output</h2>
        {component && component}
      </div>
    </div>
  );
};

export default LiveCodeEditor;
