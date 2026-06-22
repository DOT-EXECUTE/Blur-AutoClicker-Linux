import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import "./SystemWarningBanner.css";

function diagnosticIndicatesProblem(diagnostic: string): boolean {
  const lower = diagnostic.toLowerCase();
  const markers = ["unavailable", "failed", "missing", "not writable"];
  return markers.some((marker) => lower.includes(marker));
}

export default function SystemWarningBanner() {
  const [diagnostic, setDiagnostic] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let mounted = true;

    invoke<string>("check_system_deps")
      .then((result) => {
        if (mounted && result && diagnosticIndicatesProblem(result)) {
          setDiagnostic(result);
        }
      })
      .catch((err) => {
        console.error("Failed to check system dependencies:", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!diagnostic || dismissed) {
    return null;
  }

  return (
    <div className="system-warning-banner" role="alert">
      <span className="system-warning-message">{diagnostic}</span>
      <button
        className="system-warning-dismiss"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss warning"
        title="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
