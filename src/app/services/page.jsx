// "use client";

// import { useState, useEffect } from "react";
// import Styles from "@/styles/ServicesPage.module.css";

// const servicesData = [
//   {
//     id: 1,
//     title: "Speaking",
//     description:
//       "Professional speaking sessions focused on motivation, leadership, and real-world experiences. Ideal for conferences, universities, and corporate events.",
//     points: [
//       "Keynote speeches",
//       "Motivational talks",
//       "Industry insights",
//     ],
//   },
//   {
//     id: 2,
//     title: "Consultation",
//     description:
//       "One-on-one and team consultation to solve business, strategy, and growth-related challenges with actionable guidance.",
//     points: [
//       "Business strategy",
//       "Startup mentoring",
//       "Personal growth planning",
//     ],
//   },
//   {
//     id: 3,
//     title: "Workshops & Trainings",
//     description:
//       "Hands-on workshops and trainings designed to build practical skills with real exercises and outcomes.",
//     points: [
//       "Skill-based workshops",
//       "Team trainings",
//       "Interactive sessions",
//     ],
//   },
// ];

// export default function ServicesPage() {
//   const [activeService, setActiveService] = useState(servicesData[0]);

//   useEffect(() => {
//     // Runs every time a service is clicked
//     console.log("Active Service:", activeService.title);
//   }, [activeService]);

//   return (
//     <section className={Styles.ServicespageSection}>
//       <div className={`container ${Styles.servicesWrapper}`}>
        
//         {/* LEFT SIDE */}
//         <div className={Styles.servicesList}>
//           {servicesData.map((service) => (
//             <button
//               key={service.id}
//               onClick={() => setActiveService(service)}
//               className={`${Styles.serviceItem} ${
//                 activeService.id === service.id ? Styles.active : ""
//               }`}
//             >
//               {service.title}
//             </button>
//           ))}
//         </div>

//         {/* RIGHT SIDE */}
//         <div className={Styles.serviceContent}>
//           <h2>{activeService.title}</h2>
//           <p>{activeService.description}</p>

//           <ul>
//             {activeService.points.map((point, index) => (
//               <li key={index}>{point}</li>
//             ))}
//           </ul>
//         </div>

//       </div>
//     </section>
//   );
// }

import ServicesServer from "./ServicesServer";
import { connectDB } from "@/lib/mongodb";
import Seo from "@/models/Seo";
export async function generateMetadata() {
  await connectDB();

  const seo = await Seo.findOne({ page: "services" }).lean();

  if (!seo) return {};

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonical || undefined,
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
  };
}
export default function Services(){
  return <ServicesServer/>
}