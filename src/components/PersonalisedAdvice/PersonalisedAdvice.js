// @flow

import React, { type Element } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import PersonalisedDrinkAdvice from "./PersonalisedDrinkAdvice";

type Props = {
  +isUserADrinker: boolean,
  +ewac: number,
  +auditC: number,
  +audit1: number
};

const PersonalisedAdvice = (props: Props): Element<any> => {
  const { isUserADrinker, ewac, auditC, audit1 } = props;
  const { t } = useTranslation();

  return isUserADrinker ? (
    <PersonalisedDrinkAdvice ewac={ewac} auditC={auditC} audit1={audit1} />
  ) : (
    <>
      <p className="u-margin-top-small u-margin-bottom-none" data-testid="drink-cat-zero">
        {t("questionnaireResults.alcoholIntake.intro.drinkCategoryZero.title")}
      </p>
      <p className="u-margin-top-small u-margin-bottom-none">
        {t("questionnaireResults.alcoholIntake.intro.drinkCategoryZero.subHeading")}
      </p>
    </>
  );
};

PersonalisedAdvice.propTypes = {
  isUserADrinker: PropTypes.bool.isRequired,
  ewac: PropTypes.number.isRequired,
  auditC: PropTypes.number.isRequired,
  audit1: PropTypes.number.isRequired
};

export default PersonalisedAdvice;
