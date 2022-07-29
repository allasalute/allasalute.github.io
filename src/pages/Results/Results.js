// @flow

import React, { type Element } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link, Redirect } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import classnames from "classnames";

import images from "assets/images/charts/units";

import { responsiveBreakpoint } from "constants/responsiveBreakpoint";
import { type Response } from "constants/types";

import { getEngPercentile } from "helpers/unitCalculations";

import List from "components/Elements/List/List";
import Header from "components/Header/HeaderContainer";
import PersonalisedAdvice from "components/PersonalisedAdvice/PersonalisedAdvice";

import drinkingImage from "assets/images/illustrations/drinking.svg";
import smokerImage from "assets/images/illustrations/smoker.svg";

type Props = {
  +response: Array<Response>
};

function Results(props: Props): Element<any> {
  const { response } = props;

  const { t } = useTranslation();

  const isMobile = useMediaQuery({ maxWidth: responsiveBreakpoint.md });
  const isSmallMobile = useMediaQuery({ maxWidth: responsiveBreakpoint.sm });
  const classes = classnames("c-section", "u-flex", "u-flex--column", !isMobile && "u-margin-left-huge");
  const wrapperClasses = classnames("o-container u-margin-bottom-huge", !isMobile && "u-flex");
  const buttonWrapperClasses = classnames("u-margin-top-auto u-flex--space-between", !isSmallMobile && "u-flex ");

  const howOftenResponse = response?.[0]?.value;
  const unitsResponse = response?.[1]?.value;
  const howoften2Response = response?.[2]?.value;
  const isSmokerResponse = response?.[3]?.value;
  const isSmoker = response?.[3]?.value === "non-smoker" ? false : true;
  const heightInCm = response?.[4]?.value;
  const weightInKg = response?.[5]?.value;
  let bmiCat;
  const heightInM = Number(heightInCm) / 100;
  const metersSquared = heightInM * heightInM;
  const bmi = Number(weightInKg) / metersSquared;

  const formattedBmi = Math.floor(bmi * 10) / 10;
  if (bmi < 18.5) {
    bmiCat = "one";
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiCat = "two";
  } else if (bmi >= 25 && bmi < 30) {
    bmiCat = "three";
  } else {
    bmiCat = "four";
  }

  const howOftenMap = [
    {
      audit: 0,
      value: 0.0
    },
    {
      audit: 1,
      value: 0.1825144
    },
    {
      audit: 2,
      value: 0.5622265
    },
    {
      audit: 3,
      value: 1.6139923
    },
    {
      audit: 4,
      value: 3.3252783
    },
    {
      audit: 4,
      value: 5.1799232
    }
  ];
  const unitsMap = [
    {
      audit: 0,
      value: 19.376
    },
    {
      audit: 1,
      value: 34.736
    },
    {
      audit: 2,
      value: 46.736
    },
    {
      audit: 3,
      value: 55.128
    },
    {
      audit: 4,
      value: 77.36
    },
    {
      audit: 4,
      value: 77.8
    },
    {
      audit: 4,
      value: 142.656
    }
  ];
  const howOften2Map = [
    {
      audit: 0,
      value: 4.34
    },
    {
      audit: 1,
      value: 15.004
    },
    {
      audit: 2,
      value: 29.249
    },
    {
      audit: 3,
      value: 62.436
    },
    {
      audit: 4,
      value: 258.132
    },
    {
      audit: 4,
      value: 258.132
    }
  ];

  const q1 = howOftenMap[Number(howOftenResponse)]?.value;
  const isUserADrinker = howOftenResponse === "0" ? false : true;

  const q2 = unitsMap[Number(unitsResponse)]?.value;
  const q3 = howOften2Map[Number(howoften2Response)]?.value;
  const audit1 = howOftenMap[Number(howOftenResponse)]?.audit;
  const audit2 = unitsMap[Number(unitsResponse)]?.audit;
  const audit3 = howOften2Map[Number(howoften2Response)]?.audit;
  const auditC = audit1 + audit2 + audit3;

  const ewacGrams = q1 && q1 * q2 + q3;
  const ewacUk = q1 && ewacGrams / 8;

  const isResponsesAvailable = isUserADrinker
    ? howOftenResponse && unitsResponse && howoften2Response && isSmokerResponse && heightInCm && weightInKg
    : howOftenResponse && isSmokerResponse && heightInCm && weightInKg;

  const healthyWeightInKg = Math.round(25.0 * metersSquared);
  const healthyWeightInSt = Math.floor(25.0 * metersSquared * 0.157473);
  const healthyWeightInLbs = Math.round((18.5 * metersSquared * 0.157473 - healthyWeightInSt) / 14);

  console.log("ewac: ", ewacUk, "auditC: ", auditC);

  return isResponsesAvailable ? (
    <>
      <Header isHomeBtnVisible isShareVisible isEndSessionBtnVisible />
      <main>
        <div className={wrapperClasses}>
          <aside className="c-sidebar">
            <div className="c-sidebar__inner">
              <img className="u-responsive-image" src={drinkingImage} alt="" role="presentation" />
            </div>
          </aside>
          <section className={classes}>
            <h2 className="u-margin-top-none u-margin-bottom" data-testid="title">
              {t("questionnaireResults.alcoholIntake.title")}
            </h2>
            <PersonalisedAdvice isUserADrinker={isUserADrinker} ewac={ewacUk} audit1={audit1} auditC={auditC} />
          </section>
        </div>
        <div className={wrapperClasses} data-testid="drinker-comparison">
          <aside className="c-sidebar">
            <div className="c-sidebar__inner">
              <img
                className="u-responsive-image"
                src={images.units}
                srcSet={`${images.units} 1x, ${images.units2x} 2x, ${images.units3x} 3x`}
                alt=""
                role="presentation"
              />
            </div>
          </aside>
          <section className={classes}>
            <h2 className="u-margin-top-none u-margin-bottom">{t("questionnaireResults.comparedToOthers.title")}</h2>
            <div className="c-info u-flex--column">
              <p className="c-info__heading u-margin-vertical-none">
                {t("questionnaireResults.comparedToOthers.percentageBar.england.ctaText")}
              </p>
              <p className="u-margin-vertical-none">
                {t("questionnaireResults.comparedToOthers.percentageBar.england.caption", {
                  percentage: getEngPercentile(audit1, audit2, audit3)
                })}
              </p>
              <p className="u-margin-none">
                <Trans
                  i18nKey="questionnaireResults.deptOfHealthRecommendations.title"
                  values={{ list: t("questionnaireResults.deptOfHealthRecommendations.list") }}
                  components={[
                    <List
                      items={t("questionnaireResults.deptOfHealthRecommendations.list", { returnObjects: true })}
                    ></List>
                  ]}
                ></Trans>
              </p>
            </div>
          </section>
        </div>
        )
        <div className={wrapperClasses}>
          <aside className="c-sidebar">
            <div className="c-sidebar__inner">
              <img className="u-responsive-image" src={smokerImage} alt="" role="presentation" />
            </div>
          </aside>
          <section className={classes}>
            <h2 className="u-margin-top-none u-margin-bottom-small">{t("questionnaireResults.smoking.title")}</h2>

            <p className="u-margin-vertical-none" data-testid="smoker-data">
              <List
                items={t(`questionnaireResults.smoking.${isSmoker ? "smoker" : "nonSmoker"}.list`, {
                  returnObjects: true
                })}
                link={
                  isSmoker ? (
                    <span className="u-padding-top u-margin-none">
                      <Trans
                        i18nKey={`questionnaireResults.smoking.smoker.support`}
                        values={{ link: t(`questionnaireResults.smoking.smoker.supportLink`) }}
                        components={[
                          <a
                            href="/smoking"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="u-styled-link u-styled-link--inherit u-font-bold"
                          >
                            {t(`questionnaireResults.smoking.smoker.supportLink`)}
                          </a>
                        ]}
                      ></Trans>
                    </span>
                  ) : null
                }
              ></List>
            </p>

            <h2 className="u-margin-top u-margin-bottom-small">{t("questionnaireResults.weight.title")}</h2>

            <p className="u-margin-vertical-none" data-testid="bmi-data">
              <List
                items={t(`questionnaireResults.weight.bmiCategories.${bmiCat}`, {
                  bmi: formattedBmi,
                  kilos: healthyWeightInKg,
                  stone: healthyWeightInSt,
                  lbs: healthyWeightInLbs,
                  returnObjects: true
                })}
              ></List>
            </p>

            <div className={buttonWrapperClasses}>
              <Link
                to={{ pathname: "/questionnaire", id: 5 }}
                className="c-button c-button--secondary c-button--md u-text-center u-margin-bottom-small"
                params={{ questionNumberFromLink: 5 }}
              >
                {t("common.previous")}
              </Link>

              <Link to="/home" className="c-button c-button--primary c-button--md u-text-center u-margin-bottom-small">
                {t("common.home")}
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  ) : (
    <Redirect to="/?endSession=true" />
  );
}

export default Results;
