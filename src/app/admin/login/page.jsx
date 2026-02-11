"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Styles from "@/styles/Login.module.css";
import FullScreenSpinner from "@/components/FullScreenSpinner";

const logo = "/images/Whittington-Logo.png";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const formik = useFormik({
    initialValues: { email: "", password: "", remember: false },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: async (values) => {
      setError("");
      setLoading(true); // 🔥 START SPINNER

      try {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (res.ok) {
          document.cookie = `admin_token=${data.token}; path=/; ${values.remember ? "max-age=31536000" : ""
            }`;

          router.push("/admin");
        } else {
          setError(data.message || "Wrong credentials");
          setLoading(false); // ❌ STOP SPINNER
        }
      } catch (err) {
        console.error(err);
        setError("Login failed");
        setLoading(false); // ❌ STOP SPINNER
      }
    },

  });

  return (
    <>
      {loading && <FullScreenSpinner />}

      <div
        className={`d-flex justify-content-center align-items-center vh-100 ${Styles.loginContainer}`}
      >
        <div className="col-12 col-md-4">
          <div className="card shadow p-4">

            {/* LOGO */}
            <div className="text-center mb-4">
              <img
                src={logo}
                alt="Admin Logo"
                style={{
                  maxWidth: "180px",
                  height: "auto",
                }}
              />
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className={`form-control ${formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                    }`}
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                />
                <label>Email address</label>
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className={`form-control ${formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                    }`}
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
                <label>Password</label>
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  {...formik.getFieldProps("remember")}
                />
                <label className="form-check-label">Remember Me</label>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
