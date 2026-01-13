"use client";

import "@/lib/fontawesome";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Styles from "@/styles/Navbar.module.css";
import HireToSpeak from "../Ui/Button/HireToSpeak";
import HeadLine from "../Ui/HeadLine/HeadLine";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';


const logo = "/images/Whittington-Logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);
  return (
    <>
      <HeadLine />

      <header className={Styles.navWrapper}>
        <div className={Styles.container}>
          {/* Logo */}
          <div className={Styles.brandLogo}>
            <Link href="/">
              <Image src={logo} alt="Logo" width={120} height={50} />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className={Styles.desktopNav}>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/media">Media</Link></li>
              <li><Link href="/media">Services</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>

          {/* Right side */}
          <div className={Styles.rightSide}>
            <div className={Styles.desktopButton}>
              <HireToSpeak />
            </div>

            <button
              className={Styles.hamburgerBtn}
              onClick={() => setIsMenuOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className={Styles.overlay}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu (ROOT LEVEL) */}
      <div className={`${Styles.mobileMenu} ${isMenuOpen ? Styles.showMenu : ""}`}>
        <button
          className={Styles.closeBtn}
          onClick={() => setIsMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <ul>
          <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link href="/media" onClick={() => setIsMenuOpen(false)}>Media</Link></li>
          <li><Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
        </ul>
      </div>
    </>

  );
};

export default Navbar;
