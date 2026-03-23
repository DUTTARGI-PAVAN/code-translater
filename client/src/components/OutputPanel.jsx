import CodeEditor from "./CodeEditor.jsx";
import "../styles/output.css";

const InfoCard = ({ label, value }) => (
  <div className="info-card">
    <span className="info-label">{label}</span>
    <span className="info-value">{value}</span>
  </div>
);

function OutputPanel({ result, action, targetLanguage }) {
  if (!result) {
    return (
      <div className="empty-state">
        <p>Write code, pick an action, and hit <span>Run</span></p>
      </div>
    );
  }

  if (action === "translate") {
    return (
      <div className="output-editor">
        <CodeEditor code={result.translatedCode || ""} onChange={() => {}} language={targetLanguage} readOnly />
      </div>
    );
  }

  if (action === "analyze") {
    return (
      <div className="output-analysis">
        <div className="info-cards">
          <InfoCard label="Time Complexity" value={result.timeComplexity} />
          <InfoCard label="Space Complexity" value={result.spaceComplexity} />
        </div>
        <div className="analysis-explanation">
          <h4>Explanation</h4>
          <p>{result.explanation}</p>
        </div>
      </div>
    );
  }

  if (action === "optimize") {
    return (
      <div className="output-optimize">
        <div className="output-editor" style={{ height: "55%" }}>
          <CodeEditor code={result.optimizedCode || ""} onChange={() => {}} language="plaintext" readOnly />
        </div>
        <div className="suggestions-box">
          <h4>Suggestions</h4>
          <p>{result.suggestions}</p>
        </div>
      </div>
    );
  }

  if (action === "explain") {
    return (
      <div className="output-explain">
        <p>{result.explanation}</p>
      </div>
    );
  }

  return null;
}

export default OutputPanel;