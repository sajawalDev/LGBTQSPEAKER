"use client";
import Styles from "@/styles/HireToSpeak.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import  Link  from "next/link";

export default function HireToSpeak(){
    return(
        <Link href="/hire-to-speak"><button className={Styles.HtsBtn}> <FontAwesomeIcon icon={faMicrophone}/> Hire to Speak</button></Link>
    )
} 