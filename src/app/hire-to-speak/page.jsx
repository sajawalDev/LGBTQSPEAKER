"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Styles from "@/styles/hire-to-speak.module.css";
import Head from "next/head";

const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
    eventDate: Yup.string().required("Required"),
    eventLocation: Yup.string().required("Required"),
    audienceSize: Yup.string().required("Required"),
    eventTopic: Yup.string().required("Required"),
    additionalInfo: Yup.string().required("Required"),
});

export default function HireToSpeak() {
    return (
        <>
        <Head>
            <title>Hire to Speak_Whittington Consulting</title>
        </Head>
        <section className={Styles.HiretospeakSection}>
            <h2 className="text-center">Hire to Speak</h2>
            <div className="container">
                <div className={Styles.HTPForm}>
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            email: "",
                            phone: "",
                            eventDate: "",
                            eventLocation: "",
                            audienceSize: "",
                            eventTopic: "",
                            additionalInfo: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // console.log(values);
                            resetForm();
                        }}
                    >
                        {() => (
                            <Form className="row g-3">
                                {/* First 6 inputs → col-6 */}
                                <div className="col-md-6">
                                    <label className="form-label">First Name <span className="text-danger">*</span></label>
                                    <Field name="firstName" className="form-control" />
                                    <ErrorMessage name="firstName" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Last Name <span className="text-danger">*</span></label>
                                    <Field name="lastName" className="form-control" />
                                    <ErrorMessage name="lastName" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Email <span className="text-danger">*</span></label>
                                    <Field type="email" name="email" className="form-control" />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                                    <Field name="phone" className="form-control" />
                                    <ErrorMessage name="phone" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Event Date <span className="text-danger">*</span></label>
                                    <Field type="date" name="eventDate" className="form-control" />
                                    <ErrorMessage name="eventDate" component="div" className="text-danger" />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Event Location <span className="text-danger">*</span></label>
                                    <Field name="eventLocation" className="form-control" />
                                    <ErrorMessage name="eventLocation" component="div" className="text-danger" />
                                </div>

                                {/* Remaining inputs → col-12 */}
                                <div className="col-12">
                                    <label className="form-label">Audience Size <span className="text-danger">*</span></label>
                                    <Field as="select" name="audienceSize" className="form-control">
                                        <option value="">Select audience size</option>
                                        <option value="0-100">0–100</option>
                                        <option value="100-500">100–500</option>
                                        <option value="500-1000">500–1000</option>
                                        <option value="1000+">1000+</option>
                                    </Field>
                                    <ErrorMessage name="audienceSize" component="div" className="text-danger" />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Event Theme / Topic <span className="text-danger">*</span></label>
                                    <Field name="eventTopic" className="form-control" />
                                    <ErrorMessage name="eventTopic" component="div" className="text-danger" />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Additional Information / Comments <span className="text-danger">*</span></label>
                                    <Field as="textarea" rows="4" name="additionalInfo" className="form-control" />
                                    <ErrorMessage name="additionalInfo" component="div" className="text-danger" />
                                </div>

                                <div className="col-12 text-center">
                                    <button type="submit" className=" px-5">
                                        Submit Request
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
        </>
    );
}

HireToSpeak.getLayout = function (page) {
    return page;
};
