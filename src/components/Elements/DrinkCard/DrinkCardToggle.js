// DrinkCardToggle.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DrinkCardToggle = ({ content }) => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isTouch = typeof window !== "undefined" && window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setExpanded(prev => !prev)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onFocus={() => setHovered(true)}
      onBlur={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      aria-expanded={expanded}
      style={{
        all: "unset", // rimuove lo stile nativo dei button
        cursor: "pointer",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        width: "100%",
        maxWidth: "140px",
        minHeight: isMobile ? "220px" : "280px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
        textAlign: "center",
        transition: pressed
          ? "transform 0.05s ease-out, box-shadow 0.1s ease-out"
          : isTouch
          ? "none" // touch = nessuna transizione per evitare ritardi
          : "transform 0.25s ease, box-shadow 0.25s ease",
        boxSizing: "border-box",
        boxShadow: hovered
          ? "0 6px 16px rgba(0, 0, 0, 0.15)" // ombra più intensa al passaggio
          : "0 2px 6px rgba(0, 0, 0, 0.05)", // ombra leggera di base
        transform: pressed ? "scale(0.985)" : !isTouch && hovered ? "translateY(-2px)" : "none"
      }}
    >
      <img
        src={content.image}
        alt={content.title}
        style={{
          height: isMobile ? "8rem" : "10rem",
          maxHeight: "100%",
          marginBottom: "0.5rem",
          objectFit: "contain"
        }}
      />
      <h5 style={{ margin: "0.5rem 0", fontSize: "1rem" }}>{content.title}</h5>
      {!expanded && (
        <small
          style={{
            color: "#888",
            fontSize: "0.75rem",
            marginTop: "0.25rem"
          }}
        >
          {isTouch ? "Tocca per info" : "Clicca per info"}
        </small>
      )}
      {expanded && (
        <p
          style={{
            fontSize: "0.85rem",
            color: "#444",
            marginTop: "0.5rem",
            transition: "opacity 0.3s ease",
            opacity: expanded ? 1 : 0
          }}
        >
          {content.description}
        </p>
      )}
    </button>
  );
};

DrinkCardToggle.propTypes = {
  content: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
  }).isRequired
};

export default DrinkCardToggle;
