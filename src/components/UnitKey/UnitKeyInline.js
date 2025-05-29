// UnitKeyInline.jsx
import React from "react";
import { useTranslation } from "react-i18next";

//import DrinkCard from "components/Elements/DrinkCard/DrinkCard";
import DrinkCardToggle from "components/Elements/DrinkCard/DrinkCardToggle";
//import DrinkCardTooltip from "components/Elements/DrinkCard/DrinkCardTooltip";
//import DrinkCardPopup from "components/Elements/DrinkCard/DrinkCardPopup";
import pintImage from "assets/images/drinks/BeerCan.png";
import wineImage from "assets/images/drinks/half-wine.svg";
import aperitifsImage from "assets/images/drinks/single-aperitifs.svg";
import spiritImage from "assets/images/drinks/single-spirit.svg";

const UnitKeyInline = () => {
  const { t } = useTranslation();

  const drinks = [
    {
      id: "pint",
      title: t("unitKey.singleUnits.halfPint.title"),
      description: t("unitKey.singleUnits.halfPint.description"),
      image: pintImage
    },
    {
      id: "wine",
      title: t("unitKey.singleUnits.halfGlass.title"),
      description: t("unitKey.singleUnits.halfGlass.description"),
      image: wineImage
    },
    {
      id: "singleAperitifs",
      title: t("unitKey.singleUnits.singleAperitifs.title"),
      description: t("unitKey.singleUnits.singleAperitifs.description"),
      image: aperitifsImage
    },
    {
      id: "singleSprit",
      title: t("unitKey.singleUnits.singleSpirit.title"),
      description: t("unitKey.singleUnits.singleSpirit.description"),
      image: spiritImage
    }
  ];

  return (
    <div className="u-margin-bottom" style={{ background: "#fff5f8", padding: "1rem", borderRadius: "8px" }}>
      <h4 style={{ marginBottom: "1rem" }}>{t("unitKey.title")}</h4>
      <div className="u-flex u-flex--space-between u-scrollbar-light" style={{ overflowX: "visible", gap: "1rem" }}>
        {drinks.map(drink => (
          <DrinkCardToggle content={drink} key={drink.id} />
        ))}
      </div>
    </div>
  );
};

export default UnitKeyInline;
