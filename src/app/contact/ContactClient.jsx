// "use client";

// import { useState } from "react";
// import Styles from "@/styles/contact.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCaretRight,
//   faPhone,
//   faEnvelope,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   faInstagram,
//   faTwitter,
//   faLinkedin,
//   faYoutube,
//   faTiktok,
// } from "@fortawesome/free-brands-svg-icons";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import ButtonSpinner from "@/components/ButtonSpinner";
// import Head from "next/head";

// export default function ContactClient({ data }) {
//   if (!data || !data.inputs || !Array.isArray(data.inputs)) return null;

//   const [showPopup, setShowPopup] = useState(false);

//   // Ensure every input has a name for Formik
//   const initialValues = {};
//   data.inputs.forEach((input, index) => {
//     const fieldName = input.name || `field${index}`;
//     initialValues[fieldName] = "";
//   });

//   const validationSchema = Yup.object(
//     data.inputs.reduce((acc, input, index) => {
//       const fieldName = input.name || `field${index}`;
//       if (fieldName === "email") {
//         acc[fieldName] = Yup.string()
//           .email("Invalid email address")
//           .required("Email is required");
//       } else if (fieldName === "message") {
//         acc[fieldName] = Yup.string().required("Message is required");
//       } else {
//         acc[fieldName] = Yup.string();
//       }
//       return acc;
//     }, {})
//   );

//   const handleSubmit = async (values, { resetForm, setSubmitting }) => {
//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       });
//       if (!res.ok) throw new Error("Failed to submit");

//       resetForm();
//       setShowPopup(true);
//       setTimeout(() => setShowPopup(false), 4000);
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Contact - Whittington Consulting</title>
//       </Head>

//       <section className={Styles.ContactSection}>
//         <div className={Styles.ContactContainer}>
//           <p>
//             Home <span><FontAwesomeIcon icon={faCaretRight} /></span> Contact
//           </p>
//           <h1>Contact</h1>
//         </div>

//         <div className="container">
//           <div className="row mt-5">
//             {/* LEFT SIDE */}
//             <div className="col-md-7">
//               <div className={Styles.ContactContent}>
//                 <h5>{data.heroHeading}</h5>
//                 <h2>{data.heroSubHeading}</h2>
//                 <p>{data.heroContent}</p>

//                 <div className={Styles.ContactCard}>
//                   <div className={Styles.ContactC}>
//                     <p><FontAwesomeIcon icon={faPhone} /></p>
//                     <span>
//                       {data.phoneHeading}
//                       <br />
//                       <b>{data.phoneNumber}</b>
//                     </span>
//                   </div>

//                   <div className={Styles.ContactC}>
//                     <p><FontAwesomeIcon icon={faEnvelope} /></p>
//                     <span>
//                       {data.emailHeading}
//                       <br />
//                       <b>{data.emailAddress}</b>
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* SOCIAL MEDIA */}
//               <div className={Styles.SocialMedia}>
//                 <h5>Social Media :</h5>
//                 <p>
//                   <span>
//                     <a href="https://www.linkedin.com/in/shannonwhittington/">
//                       <FontAwesomeIcon icon={faLinkedin} />
//                     </a>
//                   </span>
//                   <span>
//                     <a href="https://www.youtube.com/@shannonwhittingtonconsulting/videos">
//                       <FontAwesomeIcon icon={faYoutube} />
//                     </a>
//                   </span>
//                   <span>
//                     <a href="https://www.instagram.com/shannonwhittingtonconsulting">
//                       <FontAwesomeIcon icon={faInstagram} />
//                     </a>
//                   </span>
//                   <span>
//                     <FontAwesomeIcon icon={faTwitter} />
//                   </span>
//                   <span>
//                     <a href="https://www.tiktok.com/@shannonwhittingtonsheher">
//                       <FontAwesomeIcon icon={faTiktok} />
//                     </a>
//                   </span>
//                 </p>
//               </div>
//             </div>

//             {/* RIGHT SIDE – FORM */}
//             <div className="col-md-5 my-lg-0 my-md-0 my-3">
//               <div className={Styles.ContactForm}>
//                 <h3>{data.formHeading}</h3>

//                 <Formik
//                   initialValues={initialValues}
//                   validationSchema={validationSchema}
//                   onSubmit={handleSubmit}
//                 >
//                   {({ isSubmitting }) => (
//                     <Form>
//                       {data.inputs.map((input, index) => {
//                         const fieldName = input.name || `field${index}`;
//                         return (
//                           <div key={index} className={Styles.FormGroup}>
//                             {input.type === "textarea" ? (
//                               <Field
//                                 as="textarea"
//                                 name={fieldName}
//                                 placeholder={input.placeholder || ""}
//                                 rows="5"
//                                 className={Styles.input}
//                               />
//                             ) : (
//                               <Field
//                                 type={input.type || "text"}
//                                 name={fieldName}
//                                 placeholder={input.placeholder || ""}
//                                 className={Styles.input}
//                               />
//                             )}
//                             <ErrorMessage
//                               name={fieldName}
//                               component="div"
//                               className={Styles.error}
//                             />
//                           </div>
//                         );
//                       })}

//                       <button
//                         type="submit"
//                         className={Styles.SendBtn}
//                         disabled={isSubmitting}
//                       >
//                         <span className={isSubmitting ? Styles.hidden : ""}>
//                           {data.buttonText}
//                         </span>
//                         {isSubmitting && (
//                           <span className={Styles.spinnerOverlay}>
//                             <ButtonSpinner size={22} color="#ffffff" />
//                           </span>
//                         )}
//                       </button>
//                     </Form>
//                   )}
//                 </Formik>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* SUCCESS POPUP */}
//       {showPopup && (
//         <div className={Styles.popupOverlay}>
//           <div className={Styles.popupBox}>
//             <h3>Thank you for contacting us</h3>
//             <p>
//               We have received your message. Our team at Whittington Consulting will get in touch with you shortly.
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
"use client";

import { useState } from "react";
import Styles from "@/styles/contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ButtonSpinner from "@/components/ButtonSpinner";
import Head from "next/head";

export default function ContactClient({ data }) {
  if (!data || !data.inputs || !Array.isArray(data.inputs)) return null;

  const [showPopup, setShowPopup] = useState(false);

  // --- OPTION B: Map inputs to proper names ---
  const mappedInputs = data.inputs.map((input, index) => ({
    ...input,
    name:
      input.name ||
      (index === 0 ? "name" : index === 1 ? "email" : index === 2 ? "message" : `field${index}`),
  }));

  // --- Initial form values ---
  const initialValues = {};
  mappedInputs.forEach((input) => {
    initialValues[input.name] = "";
  });

  // --- Validation schema ---
  const validationSchema = Yup.object(
    mappedInputs.reduce((acc, input) => {
      if (input.name === "email") {
        acc[input.name] = Yup.string()
          .email("Invalid email address")
          .required("Email is required");
      } else if (input.name === "message") {
        acc[input.name] = Yup.string().required("Message is required");
      } else {
        acc[input.name] = Yup.string();
      }
      return acc;
    }, {})
  );

  // --- Form submission ---
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to submit");

      resetForm();
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact - Whittington Consulting</title>
      </Head>

      <section className={Styles.ContactSection}>
        <div className={Styles.ContactContainer}>
          <p>
            Home <span><FontAwesomeIcon icon={faCaretRight} /></span> Contact
          </p>
          <h1>Contact</h1>
        </div>

        <div className="container">
          <div className="row mt-5">
            {/* LEFT SIDE */}
            <div className="col-md-7">
              <div className={Styles.ContactContent}>
                <h5>{data.heroHeading}</h5>
                <h2>{data.heroSubHeading}</h2>
                <p>{data.heroContent}</p>

                <div className={Styles.ContactCard}>
                  <div className={Styles.ContactC}>
                    <p><FontAwesomeIcon icon={faPhone} /></p>
                    <span>
                      {data.phoneHeading}
                      <br />
                      <b>{data.phoneNumber}</b>
                    </span>
                  </div>

                  <div className={Styles.ContactC}>
                    <p><FontAwesomeIcon icon={faEnvelope} /></p>
                    <span>
                      {data.emailHeading}
                      <br />
                      <b>{data.emailAddress}</b>
                    </span>
                  </div>
                </div>
              </div>

              {/* SOCIAL MEDIA */}
              <div className={Styles.SocialMedia}>
                <h5>Social Media :</h5>
                <p>
                  <span>
                    <a href="https://www.linkedin.com/in/shannonwhittington/">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </span>
                  <span>
                    <a href="https://www.youtube.com/@shannonwhittingtonconsulting/videos">
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                  </span>
                  <span>
                    <a href="https://www.instagram.com/shannonwhittingtonconsulting">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faTwitter} />
                  </span>
                  <span>
                    <a href="https://www.tiktok.com/@shannonwhittingtonsheher">
                      <FontAwesomeIcon icon={faTiktok} />
                    </a>
                  </span>
                </p>
              </div>
            </div>

            {/* RIGHT SIDE – FORM */}
            <div className="col-md-5 my-lg-0 my-md-0 my-3">
              <div className={Styles.ContactForm}>
                <h3>{data.formHeading}</h3>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      {mappedInputs.map((input, index) => (
                        <div key={index} className={Styles.FormGroup}>
                          {input.type === "textarea" ? (
                            <Field
                              as="textarea"
                              name={input.name}
                              placeholder={input.placeholder || ""}
                              rows="5"
                              className={Styles.input}
                            />
                          ) : (
                            <Field
                              type={input.type || "text"}
                              name={input.name}
                              placeholder={input.placeholder || ""}
                              className={Styles.input}
                            />
                          )}
                          <ErrorMessage
                            name={input.name}
                            component="div"
                            className={Styles.error}
                          />
                        </div>
                      ))}

                      <button
                        type="submit"
                        className={Styles.SendBtn}
                        disabled={isSubmitting}
                      >
                        <span className={isSubmitting ? Styles.hidden : ""}>
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
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className={Styles.popupOverlay}>
          <div className={Styles.popupBox}>
            <h3>Thank you for contacting us</h3>
            <p>
              We have received your message. Our team at Whittington Consulting will get in touch with you shortly.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

