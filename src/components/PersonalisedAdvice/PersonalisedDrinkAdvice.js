// @flow

import React, { type Element, useMemo } from "react";
import PropTypes from "prop-types";
import { useTranslation, Trans } from "react-i18next";
import List from "components/Elements/List/List";
import { drinkResultsCategories as drinkCategories } from "constants/questionnaire";

type Props = {
  +ewac: number,
  +auditC: number,
  +audit1: number
};

const PersonalisedDrinkAdvice = (props: Props): Element<any> => {
  const { ewac, auditC, audit1 } = props;
  const { t } = useTranslation();
  const xUnit = useMemo(() => Math.round(ewac - 14), [ewac]);
  const glassesOfWine = useMemo(() => Math.round((xUnit / 2.3) * 10) / 10, [xUnit]);
  const xInterval = useMemo(() => `${Math.max(Math.round(ewac) - 2.0)} – ${Math.max(Math.round(ewac) + 2.0)}`, [ewac]);

  const transValue = useMemo(() => {
    if (audit1 !== 0 && ewac < 10 && auditC < 5) {
      return drinkCategories.SEVEN;
    }

    if (ewac >= 17) {
      return drinkCategories.FIVE;
    }

    if (ewac >= 14 && ewac < 17 && xUnit > 1) {
      return drinkCategories.FOUR_MULTIPLE_UNITS;
    }

    if (ewac >= 14 && ewac < 17 && xUnit <= 1) {
      return drinkCategories.FOUR;
    }

    if (ewac >= 10 && ewac < 14) {
      return drinkCategories.THREE;
    }

    if (ewac < 10 && auditC >= 5) {
      return drinkCategories.SIX;
    } else {
      return drinkCategories.ONE_TWO;
    }
  }, [auditC, ewac, xUnit, audit1]);

  return (
    <>
      {transValue.titleTranslationKey && (
        <p className="u-margin-none" data-testid={`drink-cat-${transValue.category}`}>
          {t(transValue.titleTranslationKey)}
        </p>
      )}
      {transValue.bodyTranslationKey && transValue.listTranslationKey && (
        <p
          className="u-margin-none u-margin-bottom-none u-white-space-pre-line"
          data-testid={`drink-cat-${transValue.category}`}
        >
          <Trans
            i18nKey={transValue.bodyTranslationKey}
            values={{ list: t(transValue.listTranslationKey), averageWeekUnits: xInterval }}
            components={[
              <List
                items={t(transValue.listTranslationKey, {
                  unit: xUnit,
                  number: glassesOfWine,
                  returnObjects: true
                })}
              ></List>
            ]}
          ></Trans>
        </p>
      )}
      {transValue.bodyTranslationKey && !transValue.listTranslationKey && (
        <p
          className="u-margin-top-small u-margin-bottom-none u-white-space-pre-line"
          data-testid={`drink-cat-${transValue.category}`}
        >
          {t(transValue.bodyTranslationKey, { averageWeekUnits: xInterval })}
        </p>
      )}
    </>
  );
};

PersonalisedDrinkAdvice.propTypes = {
  ewac: PropTypes.number.isRequired,
  auditC: PropTypes.number.isRequired,
  audit1: PropTypes.number.isRequired
};

export default PersonalisedDrinkAdvice;
