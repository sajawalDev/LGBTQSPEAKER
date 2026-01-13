"use client";

import Styles from "@/styles/NewsLetter.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function NewsLetter() {
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <section className={Styles.Newsletter}>
      <div className="container">
        <div className={Styles.newsletterHeding}>
          <h6>SUBSCRIBE TODAY</h6>
          <h2>Newsletter Sign Up</h2>
        </div>

        <div className="row">
          <div className="col">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className={Styles.form}>
                {/* Email */}
                <div className={Styles.formGroup}>
                  <label>
                    Email <span className={Styles.required}>*</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={Styles.input}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={Styles.error}
                  />
                </div>

                {/* First Name */}
                <div className={Styles.formGroup}>
                  <label>First Name</label>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    className={Styles.input}
                  />
                </div>

                {/* Last Name */}
                <div className={Styles.formGroup}>
                  <label>Last Name</label>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    className={Styles.input}
                  />
                </div>

                <button type="submit" className={Styles.subscribeBtn}>
                  Subscribe
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}
