import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export function UI() {
  const { active } = useProgress();

  // active === true while loading

  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (!scrolled) {
        setScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (active) return null;

  return (
    <>
      {!scrolled && (
        <div
          style={{
            position: "fixed",
            bottom: "5px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10000,
            color: "#ef581d",
            fontFamily: "sans-serif",
            display: "grid",
            placeItems: "center",
            fontSize: "1rem",
          }}
        >
          <p>Scroll</p>

          {/* <svg
            className="arrow"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ef581d"
          >
            <path d="M480-360 280-560h400L480-360Z" />
          </svg> */}

          <svg
            className="arrow"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ef581d"
          >
            <path d="M480-345 240-585l56-56 184 183 184-183 56 56-240 240Z" />
          </svg>
        </div>
      )}

      <div
        style={{
          position: "fixed",
          bottom: "5px",
          right: "5px",
          zIndex: 10000,
          display: "flex",
          gap: "10px",
          color: "#ef581d",
          textDecoration: "none",
          fontFamily: "sans-serif",
          fontSize: "1rem",
        }}
      >
        <a
          style={{
            color: "#ef581d",
            textDecoration: "none",
          }}
          href="https://www.eztree.dev"
          target="_blank"
        >
          Tree
        </a>

        <a
          style={{
            color: "#ef581d",
            textDecoration: "none",
          }}
          href="https://sketchfab.com/3d-models/autumn-original-work-c89325dde9b14ce4b5c9001504b92085"
          target="_blank"
        >
          Anime Girl
        </a>

        <a href="https://x.com/TechyWebDev" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ef581d"
            viewBox="0 0 16 16"
            height="16"
            width="16"
          >
            <path
              d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z"
              strokeWidth="1"
            ></path>
          </svg>
        </a>
      </div>
    </>
  );
}
