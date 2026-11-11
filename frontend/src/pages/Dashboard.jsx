import { useEffect, useState } from "react";
import { api } from "../api";

const LABELS = {
  admin: { tenders_created: "Tenders created", open_tenders: "Open tenders", proposals_received: "Proposals received", pending_review: "Awaiting review" },
  contractor: { my_bids: "My bids", pending: "Pending", accepted: "Accepted" },
  auditor: { awarded_tenders: "Awarded tenders", total_awarded_value: "Total awarded value", bids_on_awarded: "Bids on awarded tenders" },
};

// The API already returns role-specific numbers; this page just renders the right labels.
export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/dashboard").then(setData).catch((e) => setError(e.message));
  }, []);

  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!data) return <p>Loading...</p>;
  return (
    <>
      <h2>{data.role[0].toUpperCase() + data.role.slice(1)} dashboard</h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {Object.entries(LABELS[data.role]).map(([key, label]) => (
          <div key={key} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, minWidth: 150 }}>
            <div style={{ fontSize: 28 }}>{data[key]}</div>
            <div>{label}</div>
          </div>
        ))}
      </div>
      {data.upcoming_deadlines && (
        <>
          <h3>Upcoming deadlines</h3>
          {data.upcoming_deadlines.length === 0 && <p>No open tenders right now.</p>}
          <ul>{data.upcoming_deadlines.map((t) => <li key={t.id}>{t.title}: closes {t.deadline_date}</li>)}</ul>
        </>
      )}
    </>
  );
}
