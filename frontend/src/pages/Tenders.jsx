import { useEffect, useState } from "react";
import { api } from "../api";

export default function Tenders() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    api(`/tenders?page=${page}&per_page=5`).then(setData).catch((e) => setError(e.message));
  }, [page]);

  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!data) return <p>Loading...</p>;
  return (
    <>
      <h2>Tenders</h2>
      {data.items.length === 0 && <p>No tenders to show yet.</p>}
      {data.items.map((t) => (
        <div key={t.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, marginBottom: 8 }}>
          <strong>{t.title}</strong> <small>({t.category}, {t.status})</small>
          <div>Budget: {t.budget.toLocaleString()} | Deadline: {t.deadline_date}</div>
        </div>
      ))}
      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
      <span> Page {data.page} of {Math.max(data.pages, 1)} </span>
      <button disabled={page >= data.pages} onClick={() => setPage(page + 1)}>Next</button>
    </>
  );
}
