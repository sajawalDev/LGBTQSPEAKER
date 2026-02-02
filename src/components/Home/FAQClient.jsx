// 'use client';

// import Styles from "@/styles/FAQs.module.css"
// import { useState } from 'react';
// import { Plus, Minus } from 'lucide-react';

// const FAQs = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const faqs = [
//     {
//       question: "What services do you offer?",
//       answer: `We offer keynote presentations, workshops, strategic consulting, and education designed to help organizations build inclusive, high-performing cultures grounded in belonging and psychological safety. Our work supports corporate teams and healthcare systems alike, with focus areas including inclusive leadership, LGBTQ+ equity, organizational culture, and performance. For healthcare providers, we deliver specialized education in LGBTQ+ Patient-Centered Care for doctors, nurses, social workers, physical and occupational therapists, home health aides, dentists, and interdisciplinary care teams strengthening engagement, care quality, and measurable outcomes.`
//     },
//     {
//       question: "How can I Book Shannon for an Event or Consultation?",
//       answer:
//         "Booking Shannon is easy. Please visit our Contact page to get in touch with us. We'll respond promptly to discuss your specific needs and availability."
//     },
//     {
//       question: "Are Shannon's Services Customizable for my event or Organization?",
//       answer:
//         "Absolutely! Shannon's services can be customized to align with your event theme or organization's goals. Contact us to discuss your customization needs."
//     },
//     {
//       question: "Can Shannon Provides Virtual Presentations or Workshop?",
//       answer:
//         "Yes, Shannon offers virtual presentations and workshops to reach a global audience. We use state-of-the-art technology to deliver an immersive online experience."
//     },
//     {
//       question: "What makes Shannon Presentations Unique?",
//       answer:
//         "Shannon’s presentations stand out because they go beyond awareness to deliver practical, evidence-based strategies that leaders and teams can apply immediately. She blends real-world healthcare and organizational leadership experience with deep expertise in LGBTQ+ inclusion, belonging, and psychological safety, connecting these principles directly to engagement, performance, retention, and outcomes. Her sessions are engaging, grounded, and action-oriented, equipping audiences with clear frameworks that create lasting cultural and operational impact."
//     },
//     {
//       question: "Do you offer educational outreach programs for school and youth Organizations?",
//       answer:
//         "Yes, we are committed to promoting awareness and understanding among students and youth. Contact us to discuss tailored educational outreach programs."
//     },
//     {
//       question: "What is the best way to updated on Shannon's upcoming events or contents?",
//       answer:
//         "Stay connected with us through our newsletter and social media channels. You can find the latest updates, event announcements, and valuable content on our website and social platforms."
//     },
//     {
//       question: "Are these Resources available for individuals seeking support and guidance?",
//       answer:
//         "Yes, we offer resources and one-on-one consultations for individuals looking for guidance on LGBTQ+ issues, personal growth, and more. Visit our Resources page for helpful information."
//     },
//     {
//       question: "How can I share my testimonial and feedback to Shannon?",
//       answer:
//         "We welcome your testimonials and feedback. Please contact us through the provided channels to share your experiences and insights."
//     }
//   ];

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className={`container mt-5 ${Styles.faqContainer}`}>
//         <h6 className="text-center">Find your Answer</h6>
//       <h1 className={Styles.faqHeading}>Frequently Asked Questions</h1>
//       <p className="text-center">Join our newsletter community to receive the latest updates, valuable insights, and exclusive content from Shannon Whittington. Our newsletter is your gateway to a world of knowledge and empowerment.</p>
//       <div className={Styles.faqList}>
//         {faqs.map((item, index) => (
//           <div key={index} className={Styles.faqItem}>
//             <div
//               className={Styles.faqQuestion}
//               onClick={() => toggleFAQ(index)}
//             >
//               <h4>{item.question}</h4>
//               <span className={Styles.icon}>
//                 {activeIndex === index ? <Minus /> : <Plus />}
//               </span>
//             </div>

//             <div
//               className={`${Styles.faqAnswerWrapper} ${
//                 activeIndex === index ? Styles.active : ""
//               }`}
//             >
//               <p className={Styles.faqAnswer}>{item.answer}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FAQs;

'use client';

import { useState } from "react";
import { Plus, Minus } from 'lucide-react';
import Styles from "@/styles/FAQs.module.css";

export default function FAQClient({ initialFAQs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`container mt-5 ${Styles.faqContainer}`}>
      {initialFAQs.map((faq, idx) => (
        <div key={idx}>
          <h6 className="text-center">{faq.sectionSubHeading}</h6>
          <h1 className={Styles.faqHeading}>{faq.sectionHeading}</h1>
          <p className="text-center">{faq.sectionParagraph}</p>

          <div className={Styles.faqList}>
            {faq.questions.map((item, index) => (
              <div key={index} className={Styles.faqItem}>
                <div
                  className={Styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                >
                  <h4>{item.question}</h4>
                  <span className={Styles.icon}>
                    {activeIndex === index ? <Minus /> : <Plus />}
                  </span>
                </div>

                <div
                  className={`${Styles.faqAnswerWrapper} ${
                    activeIndex === index ? Styles.active : ""
                  }`}
                >
                  <p className={Styles.faqAnswer}>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
