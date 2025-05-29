import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const DrinkCardTooltip = ({ content }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const cardRef = useRef(null);
  const tooltipRef = useRef(null);
  const [tooltipWidth, setTooltipWidth] = useState(null);

  // Chiude il tooltip cliccando fuori
  useEffect(() => {
    const handleClickOutside = e => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  // Imposta larghezza del tooltip = larghezza della card
  useEffect(() => {
    if (showTooltip && cardRef.current) {
      const width = cardRef.current.offsetWidth;
      setTooltipWidth(width);
    }
  }, [showTooltip]);

  return (
    <div style={{ position: "relative", display: "inline-block" }} ref={cardRef}>
      <button
        type="button"
        onClick={() => setShowTooltip(!showTooltip)}
        style={{
          all: "unset",
          cursor: "pointer",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "1rem",
          width: "120px",
          textAlign: "center",
          background: "#fff",
          position: "relative",
          zIndex: 1
        }}
      >
        <img src={content.image} alt={content.title} style={{ height: "60px", marginBottom: "0.5rem" }} />
        <h5 style={{ margin: "0.5rem 0", fontSize: "1rem" }}>{content.title}</h5>
      </button>

      {showTooltip && (
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%) translateY(8px)",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "0.75rem 1rem",
            width: tooltipWidth ? `${tooltipWidth}px` : "auto", // 👈 larghezza dinamica
            zIndex: 9999,
            animation: "fadeInScale 0.2s ease-out"
          }}
        >
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#444", textAlign: "center" }}> {content.description} </p>
        </div>
      )}

      <style>
        {`
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(16px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(8px) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

DrinkCardTooltip.propTypes = {
  content: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
  }).isRequired
};

export default DrinkCardTooltip;
