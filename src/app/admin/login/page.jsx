"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Styles from "@/styles/Login.module.css";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setError("");

      try {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (res.ok) {
          // Save JWT in cookie or localStorage
          if (values.remember) {
            localStorage.setItem("adminToken", data.token);
          } else {
            sessionStorage.setItem("adminToken", data.token);
          }

          alert("Login successful!");
          router.push("/admin"); // redirect to admin dashboard
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error(err);
        setError("Wrong Credentials!");
      }
    },
  });

  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 ${Styles.loginContainer}`}>
      <div className="col-12 col-md-4">
        <div className="card shadow p-4">
          <h2 className="text-center mb-4">Admin Login</h2>

          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email ? "is-invalid" : ""
                }`}
                id="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="email">Email address</label>
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
              ) : null}
            </div>

            {/* Password */}
            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${
                  formik.touched.password && formik.errors.password ? "is-invalid" : ""
                }`}
                id="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="password">Password</label>
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>

            {/* Remember Me */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember"
                name="remember"
                checked={formik.values.remember}
                onChange={formik.handleChange}
              />
              <label className="form-check-label" htmlFor="remember">
                Remember Me
              </label>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
