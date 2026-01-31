// "use client";

// import "@/lib/fontawesome";
// import Styles from "@/styles/Services.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { servicesData } from "@/data/servicesData";
// import Link from "next/link";
// export default function Services() {
//     return (
//         <section className={Styles.ServicesSection}>
//             <div className="container">
//                 <div className={Styles.ServicesHeading}>
//                     <h5>Services</h5>
//                     <h2>Make Your Event Memorable with Shannon.</h2>
//                     <p>
//                         My passion is to empower change through my work as an LGBTQ+ speaker
//                         and consultant. My commitment to diversity, inclusion, and belonging
//                         drives everything I do.
//                     </p>
//                 </div>

//                 <div className="row d-flex flex-wrap">
//                     {servicesData.map((service) => (
//                         <div key={service.id} className="col-12 col-md-6 col-lg-4 mb-4">
//                             <div className={Styles.ServiceCard}>

//                                 <div className={Styles.CardHeader}>
//                                     <span className={Styles.Icon}>
//                                         <FontAwesomeIcon icon={service.icon} />
//                                     </span>
//                                     <h4>{service.title}</h4>
//                                 </div>

//                                 <p className={Styles.Desc}>{service.desc}</p>
//                                <Link href="/hire-to-speak">
//                                 <button className={Styles.CardButton}>
//                                     <FontAwesomeIcon icon={service.buttonIcon} className="me-2" /> Hire to speak
//                                 </button>
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className={Styles.servcesTagline}>
//                     <p>Experience our journey of impactful <b>gigs and successfull</b> collaborations</p>
//                 </div>
//             </div>
//         </section>
//     );
// }
"use client";

import "@/lib/fontawesome";
import Styles from "@/styles/Services.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import {
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";


export default function ServicesClient({ data }) {
  if (!data) return null;

  return (
    <section className={Styles.ServicesSection}>
      <div className="container">

        <div className={Styles.ServicesHeading}>
          <h5>{data.headingTag}</h5>
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>

        <div className="row d-flex flex-wrap">
          {data.cards?.map((service, i) => {
            const icon = SolidIcons[service.icon];

            return (
              <div key={i} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className={Styles.ServiceCard}>

                  <div className={Styles.CardHeader}>
                    {icon && (
                      <span className={Styles.Icon}>
                        <FontAwesomeIcon icon={icon} />
                      </span>
                    )}
                    <h4>{service.title}</h4>
                  </div>

                  <p className={Styles.Desc}>{service.desc}</p>

                  {service.link && (
                    <Link href={service.link}>
                      <button className={Styles.CardButton}>
                        Hire to speak <FontAwesomeIcon icon={faArrowRight}/>
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {data.tagline && (
          <div className={Styles.servcesTagline}>
            <p>{data.tagline}</p>
          </div>
        )}
      </div>
    </section>
  );
}
