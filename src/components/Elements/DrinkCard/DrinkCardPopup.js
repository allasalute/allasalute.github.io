import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DrinkCardPopup = ({ content }) => {
  const [showPopup, setShowPopup] = useState(false);

  // Chiusura con ESC
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === "Escape") {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showPopup]);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowPopup(true)}
        style={{
          all: "unset",
          cursor: "pointer",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "1rem",
          width: "120px",
          textAlign: "center",
          background: "#fff"
        }}
      >
        <img src={content.image} alt={content.title} style={{ height: "60px", marginBottom: "0.5rem" }} />
        <h5 style={{ margin: "0.5rem 0", fontSize: "1rem" }}>{content.title}</h5>
      </button>

      {showPopup && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >
          {/* Copertura interattiva */}
          <button
            aria-label="Chiudi popup"
            onClick={() => setShowPopup(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "transparent",
              border: "none",
              cursor: "default"
            }}
          />

          {/* Contenuto del popup */}
          <div
            style={{
              position: "relative",
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "8px",
              maxWidth: "300px",
              textAlign: "center",
              zIndex: 1,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}
          >
            <h4>{content.title}</h4>
            <p>{content.description}</p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                marginTop: "1rem",
                background: "#f06",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.5rem 1rem",
                cursor: "pointer"
              }}
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </>
  );
};

DrinkCardPopup.propTypes = {
  content: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
  }).isRequired
};

export default DrinkCardPopup;

