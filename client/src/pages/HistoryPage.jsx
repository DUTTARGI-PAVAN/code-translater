import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import HistoryList from "../components/HistoryList.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import { getHistory, deleteHistoryItem, clearHistory } from "../services/historyService.js";
import "../styles/history.css";

function HistoryPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getHistory(currentPage, 8);
      setEntries(data.entries);
      setTotalPages(data.totalPages);
    } catch { toast.error("Failed to load history."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchHistory(); }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await deleteHistoryItem(id);
      toast.success("Deleted");
      if (selectedEntry?._id === id) setSelectedEntry(null);
      fetchHistory();
    } catch { toast.error("Failed to delete."); }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Clear all history?")) return;
    try {
      await clearHistory();
      toast.success("History cleared");
      setSelectedEntry(null);
      setCurrentPage(1);
      fetchHistory();
    } catch { toast.error("Failed to clear history."); }
  };

  return (
    <div className="history-page">
      <div className="history-sidebar">
        <div className="history-sidebar-header">
          <h3>History</h3>
          <button className="clear-all-btn" onClick={handleClearAll}>Clear All</button>
        </div>
        {loading ? <div className="loading-state"><div className="spinner" /></div>
          : <HistoryList entries={entries} onView={setSelectedEntry} onDelete={handleDelete} />}
        {totalPages > 1 && (
          <div className="history-pagination">
            <button className="page-btn" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} className={`page-btn ${currentPage === p ? "active" : ""}`} onClick={() => setCurrentPage(p)}>{p}</button>
            ))}
            <button className="page-btn" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
          </div>
        )}
      </div>

      <div className="history-detail">
        {!selectedEntry ? <div className="empty-state"><p>Select an entry to view details</p></div> : (
          <>
            <div className="detail-header">
              <span className={`history-type-badge ${selectedEntry.type}`}>{selectedEntry.type}</span>
              <span className="history-date">{new Date(selectedEntry.createdAt).toLocaleString()}</span>
              <button className="close-btn" onClick={() => setSelectedEntry(null)}>✕</button>
            </div>
            <div className="detail-section">
              <h4>Input Code ({selectedEntry.sourceLanguage})</h4>
              <div style={{ height: "200px" }}>
                <CodeEditor code={selectedEntry.inputCode} onChange={() => {}} language={selectedEntry.sourceLanguage} readOnly />
              </div>
            </div>
            <div className="detail-section">
              <h4>Output</h4>
              {selectedEntry.type === "translate" && <pre className="detail-code-block">{selectedEntry.output?.translatedCode}</pre>}
              {selectedEntry.type === "analyze" && (
                <div>
                  <p><strong>Time:</strong> {selectedEntry.output?.timeComplexity}</p>
                  <p><strong>Space:</strong> {selectedEntry.output?.spaceComplexity}</p>
                  <p>{selectedEntry.output?.explanation}</p>
                </div>
              )}
              {selectedEntry.type === "optimize" && (
                <div>
                  <pre className="detail-code-block">{selectedEntry.output?.optimizedCode}</pre>
                  <p>{selectedEntry.output?.suggestions}</p>
                </div>
              )}
              {selectedEntry.type === "explain" && <p>{selectedEntry.output?.explanation}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;