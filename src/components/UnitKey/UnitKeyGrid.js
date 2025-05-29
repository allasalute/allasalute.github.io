// UnitKeyInline.jsx
import React from "react";
import { useTranslation } from "react-i18next";

//import DrinkCard from "components/Elements/DrinkCard/DrinkCard";
import DrinkCardToggle from "components/Elements/DrinkCard/DrinkCardToggle";
//import DrinkCardTooltip from "components/Elements/DrinkCard/DrinkCardTooltip";
//import DrinkCardPopup from "components/Elements/DrinkCard/DrinkCardPopup";
import pintImage from "assets/images/drinks/birra330new.svg";
import wineImage from "assets/images/drinks/vino125.svg";
import aperitifsImage from "assets/images/drinks/ape80.svg";
import spiritImage from "assets/images/drinks/shotrealisticoSmall.svg";

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
    <div className="info__card-wrapper">
      <h4 className="u-text-center u-margin-bottom-small card-text"> {t("unitKey.title")}</h4>

      <div className="info__card-grid">
        {drinks.map(drink => (
          <DrinkCardToggle content={drink} key={drink.id} />
        ))}
      </div>
    </div>
  );
};

export default UnitKeyInline;
