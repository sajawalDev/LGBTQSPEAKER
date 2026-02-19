"use client";

import useSWR from "swr";
import "@/lib/fontawesome";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Styles from "@/styles/Navbar.module.css";
import HeadLine from "../Ui/HeadLine/HeadLine";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
    faInstagram,
    faTwitter,
    faLinkedin,
    faYoutube,
    faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function NavbarClient() {
    const { data: navbar } = useSWR("/api/navbar", fetcher, {
        refreshInterval: 1000, // check every 1 second
    });
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                                priority
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
                                        <Link
                                            href={item.href}
                                            className={pathname === item.href ? Styles.activeLink : ""}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>

                                ))}
                        </ul>
                    </nav>

                    {/* Right Side */}
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

            {/* Overlay */}
            {isMenuOpen && (
                <div
                    className={Styles.overlay}
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`${Styles.mobileMenu} ${isMenuOpen ? Styles.showMenu : ""
                    }`}
            >
                <button
                    className={Styles.closeBtn}
                    onClick={() => setIsMenuOpen(false)}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <ul>
                    {navbar.menuItems?.map((item) => (
                        <li
                            key={item._id}
                            className={pathname === item.href ? Styles.activeMobile : ""}
                        >
                            <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className={Styles.mobileSocial}>
                    <span>
                        <a href="https://www.linkedin.com/">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </span>
                    <span>
                        <a href="https://www.youtube.com/">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                    </span>
                    <span>
                        <a href="https://www.instagram.com/">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </span>
                    <span>
                        <a href="https://twitter.com/">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                    </span>
                    <span>
                        <a href="https://www.tiktok.com/">
                            <FontAwesomeIcon icon={faTiktok} />
                        </a>
                    </span>
                </div>
            </div>
        </>
    );
}
