"use client";

import "@/lib/fontawesome";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Styles from "@/styles/Navbar.module.css";
import HeadLine from "../Ui/HeadLine/HeadLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbar, setNavbar] = useState(null);

  useEffect(() => {
    fetch("/api/navbar")
      .then((res) => res.json())
      .then(setNavbar);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  if (!navbar) return null;

  return (
    <>
      <HeadLine />

      <header className={Styles.navWrapper}>
        <div className={Styles.container}>
          {/* Logo */}
          <div className={Styles.brandLogo}>
            <Link href="/">
              <Image
                src={navbar.logo?.url}
                alt={navbar.logo?.alt || "Logo"}
                width={120}
                height={50}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className={Styles.desktopNav}>
            <ul>
              {navbar.menuItems
                ?.filter((i) => i.isActive)
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <li key={item._id}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Right */}
          <div className={Styles.rightSide}>
            {navbar.button?.isActive && (
              <Link href={navbar.button.href} className={Styles.ctaBtn}>
                {navbar.button.text}
              </Link>
            )}

            <button
              className={Styles.hamburgerBtn}
              onClick={() => setIsMenuOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile */}
      {isMenuOpen && (
        <div className={Styles.overlay} onClick={() => setIsMenuOpen(false)} />
      )}

      <div className={`${Styles.mobileMenu} ${isMenuOpen ? Styles.showMenu : ""}`}>
        <button className={Styles.closeBtn} onClick={() => setIsMenuOpen(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <ul>
          {navbar.menuItems?.map((item) => (
            <li key={item._id}>
              <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={Styles.csocaisl}>
          {navbar.socials?.linkedin && (
            <a href={navbar.socials.linkedin}><FontAwesomeIcon icon={faLinkedin} /></a>
          )}
          {navbar.socials?.youtube && (
            <a href={navbar.socials.youtube}><FontAwesomeIcon icon={faYoutube} /></a>
          )}
          {navbar.socials?.instagram && (
            <a href={navbar.socials.instagram}><FontAwesomeIcon icon={faInstagram} /></a>
          )}
          {navbar.socials?.twitter && (
            <a href={navbar.socials.twitter}><FontAwesomeIcon icon={faTwitter} /></a>
          )}
          {navbar.socials?.tiktok && (
            <a href={navbar.socials.tiktok}><FontAwesomeIcon icon={faTiktok} /></a>
          )}
        </div>
      </div>
    </>
  );
}
