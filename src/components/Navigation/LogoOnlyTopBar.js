// src/components/Navigation/LogoOnlyTopBar.jsx
import React from "react";
import images from "assets/images/navbar"; // correggi se necessario
import { useTranslation } from "react-i18next";

const LogoOnlyTopBar = () => {
  const { t } = useTranslation();

  return (
    <header className="navigation-bar top logo-only">
      <img
        src={images.logo}
        srcSet={`${images.logo} 1x, ${images.logo2x} 2x, ${images.logo3x} 3x`}
        alt={t("header.logoAlt")}
        className="navigation-bar__logo"
      />
    </header>
  );
};

export default LogoOnlyTopBar;
