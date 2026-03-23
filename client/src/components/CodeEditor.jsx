import Editor from "@monaco-editor/react";
import { MONACO_LANGUAGE_MAP } from "../constants/languages.js";

function CodeEditor({ code, onChange, language, readOnly = false }) {
  return (
    <Editor
      height="100%"
      language={MONACO_LANGUAGE_MAP[language] || "plaintext"}
      value={code}
      onChange={(v) => onChange(v || "")}
      theme="vs-dark"
      options={{
        readOnly,
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        bracketPairColorization: { enabled: true },
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        folding: true,
        wordWrap: "on",
      }}
    />
  );
}

export default CodeEditor;