"use client";

import Styles from "@/styles/NewsLetter.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function NewsLetterClient({ data }) {
  if (!data) return null;

  const initialValues = {};
  data.fields.forEach(f => {
    initialValues[f.name] = "";
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values); // your manual integration already exists
    resetForm();
  };

  return (
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

            <button type="submit" className={Styles.subscribeBtn}>
              {data.buttonText}
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
