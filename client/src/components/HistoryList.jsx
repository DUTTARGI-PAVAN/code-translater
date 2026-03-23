import "../styles/history.css";

function HistoryList({ entries, onView, onDelete }) {
  if (entries.length === 0) return <div className="history-empty">No history yet</div>;

  return (
    <div>
      {entries.map((entry) => (
        <div key={entry._id} className="history-item" onClick={() => onView(entry)}>
          <div className="history-item-info">
            <span className={`history-type-badge ${entry.type}`}>{entry.type}</span>
            <span className="history-lang">
              {entry.sourceLanguage}{entry.targetLanguage ? ` → ${entry.targetLanguage}` : ""}
            </span>
          </div>
          <div className="history-item-meta">
            <span className="history-date">{new Date(entry.createdAt).toLocaleDateString()}</span>
            <button className="history-delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(entry._id); }}>✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryList;