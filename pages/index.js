import styles from "../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "../Components/Navbar";
import MotoText from "../Components/MotoText";
import GetStartedButton from "../Components/GetStarted";

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <MotoText
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className={styles.connectButton}>
          <ConnectButton chainStatus={"icon"} />
        </div>
        <div className={styles.logo}>
          <Navbar />
        </div>
        <GetStartedButton />
      </div>
    </main>
  );
}
