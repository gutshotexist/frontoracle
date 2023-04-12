import { useEffect, useState } from "react";

const MotoText = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(true);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        maxWidth: "800px",
      }}
    >
      <h1
        style={{
          transform: `translateY(${showText ? "0" : "70px"})`,
          transition: "transform 1s",
          opacity: showText ? 1 : 0,
          color: "white",
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 600,
          fontSize: "4rem",
          textAlign: "center",
        }}
      >
        Building bridges between traditional finance and crypto markets
      </h1>
    </div>
  );
};

export default MotoText;
