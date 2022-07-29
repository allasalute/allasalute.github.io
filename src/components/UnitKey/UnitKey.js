import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Header from "components/Header/HeaderContainer";
import DrinkCard from "components/Elements/DrinkCard/DrinkCard";

import pintImage from "assets/images/drinks/beer2.svg";
import wineImage from "assets/images/drinks/half-wine.svg";
import aperitifsImage from "assets/images/drinks/single-aperitifs.svg";
import spiritImage from "assets/images/drinks/single-spirit.svg";
const UnitKey = props => {
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
    <>
      <Header className="u-width-100 u-padding-vertical-none u-padding-horizontal-none" />

      <div className="o-container u-width-100 u-padding-horizontal-none">
        <h3 className="c-modal__title" data-testid="title">
          {t("unitKey.title")}
        </h3>
        <div
          className="u-flex u-flex--space-between u-margin-bottom-large c-questionnaire__drink-card-wrapper u-scrollbar-light"
          data-testid="drink-card-wrapper"
        >
          {drinks.map(drink => (
            <DrinkCard content={drink} key={drink.id} />
          ))}
        </div>
      </div>
    </>
  );
};

UnitKey.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

UnitKey.defaultProps = {
  className: "",
  children: null
};

export default UnitKey;
