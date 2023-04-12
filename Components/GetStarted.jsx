import styles from "../styles/Home.module.css";
import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function GetStartedButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowButton(true), 1000); // set showButton to true after 1 second delay
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={`${styles.getStartedButtonContainer} ${
        showButton ? styles.showButton : ""
      }`}
    >
      <Link href="/linegraph">
        <button className={styles.getStartedButton}>
          <span>Get Started</span>
          <div className={styles.arrowIcon}>
            <ArrowRightIcon />
          </div>
        </button>
      </Link>
    </div>
  );
}
