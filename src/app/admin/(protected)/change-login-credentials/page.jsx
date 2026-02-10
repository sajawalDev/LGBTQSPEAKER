"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSettingsPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [verifyForm, setVerifyForm] = useState({
    email: "",
    password: "",
  });

  const [updateForm, setUpdateForm] = useState({
    newEmail: "",
    newPassword: "",
  });

  const inputStyle = {
    width: "100%",
    padding: "12px 10px",
    marginBottom: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    outline: "none",
    fontSize: "14px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  };

  const verifyCurrentCredentials = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/change-credentials", {
      method: "GET",
      headers: {
        email: verifyForm.email,
        password: verifyForm.password,
      },
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setStep(2);
  };

  const updateCredentials = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/change-credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateForm),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
      return;
    }

    router.push("/admin/login");
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: 360 }}>
        <h3 style={{ marginBottom: 20 }}>
          {step === 1 ? "Verify Admin Identity" : "Update Credentials"}
        </h3>

        {step === 1 && (
          <>
            <input
              style={inputStyle}
              type="email"
              placeholder="Current Email"
              value={verifyForm.email}
              onChange={(e) =>
                setVerifyForm({ ...verifyForm, email: e.target.value })
              }
            />

            <input
              style={inputStyle}
              type="password"
              placeholder="Current Password"
              value={verifyForm.password}
              onChange={(e) =>
                setVerifyForm({ ...verifyForm, password: e.target.value })
              }
            />

            <button style={buttonStyle} onClick={verifyCurrentCredentials}>
              {loading ? "Verifying..." : "Verify"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              style={inputStyle}
              type="email"
              placeholder="New Email"
              value={updateForm.newEmail}
              onChange={(e) =>
                setUpdateForm({ ...updateForm, newEmail: e.target.value })
              }
            />

            <input
              style={inputStyle}
              type="password"
              placeholder="New Password"
              value={updateForm.newPassword}
              onChange={(e) =>
                setUpdateForm({
                  ...updateForm,
                  newPassword: e.target.value,
                })
              }
            />

            <button style={buttonStyle} onClick={updateCredentials}>
              {loading ? "Updating..." : "Update & Re-login"}
            </button>
          </>
        )}

        {error && (
          <p style={{ color: "red", marginTop: 12, fontSize: 13 }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
