// One place for every API call: adds the JWT, parses JSON, throws readable errors,
// and sends the user to /login when the session is missing or expired.
export async function api(path, { method = "GET", body } = {}) {
  const token = localStorage.getItem("token");
  const res = await fetch(`/api${path}`, {
    method,
    headers: { ...(body && { "Content-Type": "application/json" }), ...(token && { Authorization: `Bearer ${token}` }) },
    body: body && JSON.stringify(body),
  });
  const data = res.status === 204 ? null : await res.json().catch(() => ({}));
  if (res.status === 401 && !path.startsWith("/auth/login")) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  if (!res.ok) {
    const fields = Object.entries(data?.details || {}).map(([k, v]) => `${k} ${v}`).join(", ");
    throw new Error(fields ? `${data.error}: ${fields}` : data?.error || "Something went wrong");
  }
  return data;
}
