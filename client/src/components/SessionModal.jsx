import { useSelector } from "react-redux";

export default function SessionModal() {
  const expiring = useSelector((s) => s.auth.sessionExpiring);
  const expired = useSelector((s) => s.auth.sessionExpired);

  if (!expiring && !expired) return null;

  return (
    <div className="session-modal">
      {expiring && <p>Your session will expire in 1 minute.</p>}
      {expired && <p>Your session has expired. Please log in again.</p>}
    </div>
  );
}
