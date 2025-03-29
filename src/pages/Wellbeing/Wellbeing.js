// @flow

import React, { useState, type Element } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import classnames from "classnames";

import illustratedImage from "assets/images/illustrations/wellbeing.svg";

import { responsiveBreakpoint } from "constants/responsiveBreakpoint";

import Button from "components/Elements/Button/Button";
import Header from "components/Header/HeaderContainer";

type Props = {};

function Wellbeing(props: Props): Element<any> {
  const { t } = useTranslation();

  const isMobile = useMediaQuery({ maxWidth: responsiveBreakpoint.md });
  const classes = classnames(
    "c-section",
    "u-flex",
    "u-flex--column",
    "u-flex--space-between",
    !isMobile && "u-margin-left-huge"
  );
  const wrapperClasses = classnames("o-container", !isMobile && "u-flex");

  const [selectedOption, setSelectedOption] = useState("moodAndAnxiety");

  const tabOptions = [
    {
      key: "moodAndAnxiety",
      label: "moodAndAnxiety",
      x: 46,
      y: 3,
      orderNumber: 1
    },
    {
      key: "dementia",
      label: "dementia",
      x: 31,
      y: 7,
      orderNumber: 2
    },
    {
      key: "sleep",
      label: "sleep",
      x: 57,
      y: 11,
      orderNumber: 3
    },
    {
      key: "nutrition",
      label: "nutrition",
      x: 34,
      y: 18,
      orderNumber: 4
    },

    {
      key: "heart",
      label: "heart",
      x: 52,
      y: 27,
      orderNumber: 5
    },
    {
      key: "liver",
      label: "liver",
      x: 38,
      y: 32,
      orderNumber: 6
    },

    {
      key: "digestion",
      label: "digestion",
      x: 50,
      y: 38,
      orderNumber: 7
    },
    {
      key: "hairSkinNails",
      label: "hairSkinNails",
      x: 21,
      y: 46,
      orderNumber: 8
    },
    {
      key: "staySafe",
      label: "staySafe",
      x: 54,
      y: 68,
      orderNumber: 9
    }
  ];

  return (
    <>
      <Header isHomeBtnVisible={true} isShareVisible isEndSessionBtnVisible={true} />
      <main className={wrapperClasses}>
        <aside className="c-sidebar is-wellbeing">
          <div className="c-sidebar__inner u-position-relative">
            <img className="u-responsive-image" src={illustratedImage} alt="" role="presentation" />
            {tabOptions.map((item, index) => {
              const hasPositions = tabOptions?.[index]?.x && tabOptions?.[index]?.y;
              return hasPositions ? (
                <Button
                  style={{ left: `${tabOptions?.[index]?.x ?? 0}%`, top: `${tabOptions?.[index]?.y ?? 0}%` }}
                  aria-label={t(`wellbeing.infoCtas.${item.label}.ctaText`, { number: item.orderNumber })}
                  className={classnames(
                    "u-position-absolute c-button--circle",
                    selectedOption === item.key && "is-active"
                  )}
                  size="sm"
                  onClick={() => setSelectedOption(item.key)}
                  key={item.key}
                >
                  {item.orderNumber}
                </Button>
              ) : (
                <div></div>
              );
            })}
          </div>
        </aside>
        <section className={classes}>
          <div>
            <h2 className="u-margin-top-none u-margin-bottom" data-testid="title">
              {t("wellbeing.title")}
            </h2>
            <p className="u-padding-top u-margin-none"></p>
            <p className="u-margin-top-none u-margin-bottom">{t("wellbeing.body")}</p>

            <h3 className="u-h4 u-margin-top-none u-margin-bottom">
              {t(`wellbeing.infoCtas.${selectedOption}.modal.title`)}
            </h3>
            <p className="u-margin-top-none u-margin-bottom">{t(`wellbeing.infoCtas.${selectedOption}.modal.body`)}</p>
          </div>
          <Link
            to="/home"
            className="c-button c-button--primary c-button--md u-margin-top-huge u-text-center u-flex--align-self-end"
          >
            {t("common.home")}
          </Link>
        </section>
      </main>
    </>
  );
}

export default Wellbeing;
