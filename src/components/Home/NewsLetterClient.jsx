"use client";

import { useState, useEffect } from "react";
import Styles from "@/styles/NewsLetter.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ButtonSpinner from "../ButtonSpinner";

export default function NewsLetterClient({ data }) {
  if (!data) return null;

  const [showPopup, setShowPopup] = useState(false);

  const initialValues = {};
  data.fields.forEach(f => {
    initialValues[f.name] = "";
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error();

      resetForm();
      setShowPopup(true);

      // Auto-hide popup after 4 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 4000);

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className={Styles.Newsletter}>
        <div className="container">
          <div className={Styles.newsletterHeding}>
            <h6>{data.subHeading}</h6>
            <h2>{data.heading}</h2>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={Styles.form}>
                {data.fields.map(field => (
                  <div key={field._id} className={Styles.formGroup}>
                    <label>{field.label}</label>
                    <Field
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className={Styles.input}
                    />
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className={Styles.error}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className={Styles.subscribeBtn}
                  disabled={isSubmitting}
                >
                  <span
                    className={`${Styles.btnText} ${isSubmitting ? Styles.hidden : ""
                      }`}
                  >
                    {data.buttonText}
                  </span>

                  {isSubmitting && (
                    <span className={Styles.spinnerOverlay}>
                      <ButtonSpinner size={22} color="#ffffff" />
                    </span>
                  )}
                </button>

              </Form>
            )}
          </Formik>
        </div>
      </section>

      {/* ✅ Success Popup */}
      {showPopup && (
        <div className={Styles.popupOverlay}>
          <div className={Styles.popupBox}>
            <h3>Thank you for subscribing</h3>
            <p>
              You have been successfully added to our newsletter.
              We will notify you about upcoming events, professional updates,
              and relevant news.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
