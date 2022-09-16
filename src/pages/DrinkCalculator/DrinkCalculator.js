// @flow

import React, { useEffect, useState, type Element } from "react";
import { useTranslation, Trans } from "react-i18next";
import classnames from "classnames";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import Header from "components/Header/HeaderContainer";
import Button from "components/Elements/Button/Button";
import DrinkCard from "components/Elements/DrinkCard/DrinkCard";
import Tag from "components/Elements/Tag/Tag";
import Tooltip from "components/Elements/Tooltip/Tooltip";
import Modal from "components/Elements/Modal/Modal";
import List from "components/Elements/List/List";
import UnitKey from "components/UnitKey/UnitKey";

import { responsiveBreakpoint } from "constants/responsiveBreakpoint";
import { drinksList } from "constants/drinks";

type Props = {};

function DrinkCalculator(props: Props): Element<any> {
  const { t } = useTranslation();

  const isMobile = useMediaQuery({ maxWidth: responsiveBreakpoint.md });
  const isSmallMobile = useMediaQuery({ maxWidth: responsiveBreakpoint.sm });
  const wrapperClasses = classnames("o-container u-margin-bottom-huge", !isMobile && "u-flex");
  const buttonWrapperClasses = classnames(
    !isSmallMobile && "u-flex",
    "u-flex--justify-end",
    isSmallMobile && "u-d-block"
  );
  const resultsButtonWrapperClasses = classnames(
    !isMobile && "u-flex",
    "u-flex--space-between u-margin-top",
    isMobile && "u-d-block"
  );
  const resultInformationClasses = classnames(!isMobile && "u-flex");
  const informationClasses = classnames(!isMobile && "u-flex u-flex--space-between", "u-padding-top-small");

  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [unitKeyModalVisible, setUnitKeyModalVisible] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);

  useEffect(() => {
    if (selectedDrinks?.length === 0) {
      setModalVisible(false);
    }
  }, [selectedDrinks]);

  const amountOfDrinksToDisplay = 1;
  const selectedDrinksPreview = selectedDrinks.slice(0, amountOfDrinksToDisplay);
  const selectedDrinksTotal = selectedDrinks.length;
  const isDrinksSelected = selectedDrinksTotal > 0;
  const additionalNumberOfDrinks = selectedDrinksTotal - amountOfDrinksToDisplay;
  const rowWrapperClasses = classnames(isDrinksSelected && !isMobile && "u-flex u-flex--space-between");

  const totalUnits = isDrinksSelected ? selectedDrinks.map(item => item.units).reduce((prev, next) => prev + next) : 0;
  const totalKcal = isDrinksSelected ? selectedDrinks.map(item => item.kcal).reduce((prev, next) => prev + next) : 0;
  const sugar = totalKcal ? Math.round(totalKcal / 16) : 0;
  return (
    <>
      <Header isHomeBtnVisible isShareVisible isEndSessionBtnVisible />
      <main className={wrapperClasses}>
        <section className="u-width-100 u-flex u-flex--column">
          {resultsVisible ? (
            <>
              <h2 className="u-margin-top-none u-margin-bottom" data-testid="results-title">
                {t("whatsInYourDrink.results.title")}
              </h2>

              <div className={informationClasses}>
                <div className="c-info c-drink-calculator__info">
                  <p className="u-margin-none">
                    <Trans
                      i18nKey="whatsInYourDrink.units"
                      values={{ value: totalUnits.toFixed(1) }}
                      components={{
                        value: (
                          <span data-testid="unit-total" className="u-d-block c-info__heading u-margin-vertical-none" />
                        )
                      }}
                    ></Trans>
                  </p>
                </div>

                <div className="c-info c-drink-calculator__info">
                  <p className="u-margin-none">
                    <Trans
                      i18nKey="whatsInYourDrink.calories"
                      values={{ value: t("whatsInYourDrink.kcal", { number: Math.round(totalKcal) }) }}
                      components={{
                        value: (
                          <span data-testid="kcal-total" className="u-d-block c-info__heading u-margin-vertical-none" />
                        )
                      }}
                    ></Trans>
                  </p>
                </div>

                <div className="c-info c-drink-calculator__info">
                  <p className="u-margin-none">
                    <Trans
                      i18nKey="whatsInYourDrink.food"
                      values={{ value: t("whatsInYourDrink.spoonsOfSugar", { number: sugar }) }}
                      components={{
                        value: (
                          <span
                            data-testid="sugar-total"
                            className="u-d-block c-info__heading u-margin-vertical-none"
                          />
                        )
                      }}
                    ></Trans>
                  </p>
                </div>
              </div>

              <div className={resultInformationClasses}>
                <p className="u-flex--two u-margin-bottom-none u-margin-top-small u-padding-right-huge">
                  <Trans
                    i18nKey="whatsInYourDrink.deptOfHealth.body"
                    values={{ list: t("whatsInYourDrink.deptOfHealth.list") }}
                    components={[
                      <List items={t("whatsInYourDrink.deptOfHealth.list", { returnObjects: true })}></List>
                    ]}
                  ></Trans>
                </p>

                <p className="c-drink-calculator__info u-margin-bottom-none u-margin-top-small">
                  <Trans
                    i18nKey="whatsInYourDrink.ukUnitInfo.body"
                    values={{ list: t("whatsInYourDrink.ukUnitInfo.list") }}
                    components={[<List items={t("whatsInYourDrink.ukUnitInfo.list", { returnObjects: true })}></List>]}
                  ></Trans>
                </p>
              </div>

              <div className={resultsButtonWrapperClasses}>
                <div className="u-margin-top-huge u-flex--align-self-end">
                  <Button
                    className="c-button c-button--secondary u-margin-top-auto u-flex--align-self-end c-drink-calculator__total"
                    onClick={() => {
                      setModalVisible(false);
                      setSelectedDrinks([]);
                      setResultsVisible(false);
                    }}
                  >
                    {t("whatsInYourDrink.reset")}
                  </Button>
                  <Button
                    className="c-button c-button--secondary u-margin-top-auto u-flex--align-self-end c-drink-calculator__total"
                    onClick={() => setUnitKeyModalVisible(true)}
                  >
                    {t("questionnaire.unitsKey")}
                  </Button>
                  <Button
                    className="c-button c-button--secondary u-margin-top-auto u-flex--align-self-end c-drink-calculator__total"
                    onClick={() => setModalVisible(true)}
                  >
                    {t("whatsInYourDrink.viewTotal")}
                  </Button>
                </div>

                <Link
                  to="/home"
                  className="c-button c-button--primary c-button--md u-text-center u-flex--align-self-end"
                >
                  {t("common.home")}
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="u-margin-none" data-testid="title">
                {t("whatsInYourDrink.title")}
              </h2>

              <p className="u-margin-none c-drink-calculator__strapline">
                {t("whatsInYourDrink.choose", { number: drinksList.length })}
              </p>

              <div className="o-container u-width-100 u-padding-top u-flex u-flex--space-between u-margin-bottom-large u-padding-bottom-huge c-drink-calculator__drink-card-wrapper u-scrollbar-light">
                {drinksList.map(drink => {
                  const readableDrinkName = t(`drinks.${drink.id}.name`);
                  return (
                    <DrinkCard
                      content={drink}
                      ctaText={t("whatsInYourDrink.addDrink", { drink: readableDrinkName })}
                      key={drink.id}
                      name={t(`drinks.${drink.id}.name`)}
                      className="c-drink-calculator__drink-card"
                      onSelect={() => {
                        console.log("Added drink:", drink); // for testers
                        setSelectedDrinks([...selectedDrinks, drink]);
                      }}
                    >
                      <div className="u-margin-top-auto">
                        <h3 className="u-h4 c-drink-card__title u-margin-top-small u-margin-bottom-tiny u-text-center">
                          {t(`drinks.${drink.id}.name`)}
                        </h3>
                        <p className="c-drink-card__subtitle u-margin-top-none u-margin-bottom-small">
                          {t("drinks.common.drinkInfo", {
                            abv: drink.abv,
                            container: drink.container,
                            ml: drink.ml,
                            count: drink.units
                          })}
                        </p>
                      </div>
                    </DrinkCard>
                  );
                })}
              </div>

              <div className={rowWrapperClasses}>
                {isDrinksSelected && (
                  <div>
                    {selectedDrinksPreview.map((drink, index) => {
                      const readableDrinkName = t(`drinks.${drink.id}.name`);

                      return (
                        <Tag
                          key={`drink.id-${index}`}
                          text={t("drinks.tag", {
                            name: readableDrinkName,
                            abv: drink.abv,
                            container: drink.container,
                            ml: drink.ml,
                            unit: drink.units
                          })}
                          ctaText={t("whatsInYourDrink.removeDrink", { drink: readableDrinkName })}
                          onSelect={() => {
                            console.log("removed drink:", drink); // for testers
                            const removeSelectedDrink = selectedDrinks.filter((el, i) => index !== i);
                            setSelectedDrinks(removeSelectedDrink);
                          }}
                        />
                      );
                    })}
                    {additionalNumberOfDrinks > 0 && (
                      <Tag text={t("whatsInYourDrink.total", { total: additionalNumberOfDrinks })} />
                    )}
                  </div>
                )}

                <div className={buttonWrapperClasses}>
                  {isDrinksSelected && (
                    <Button
                      className="c-button c-button--secondary u-margin-top-auto u-flex--align-self-end c-drink-calculator__total"
                      onClick={() => setModalVisible(true)}
                      data-testid="view-total-button"
                    >
                      {t("whatsInYourDrink.viewTotal")}
                    </Button>
                  )}

                  <Button
                    className="c-button c-button--primary u-margin-top-auto u-flex--align-self-end"
                    disabled={!isDrinksSelected}
                    onClick={() => setResultsVisible(true)}
                    data-testid="calculate-button"
                  >
                    {t("whatsInYourDrink.calculate")}
                  </Button>
                </div>
              </div>
              {!isDrinksSelected && (
                <div className="u-margin-top-auto u-flex--align-self-end">
                  <Tooltip text={t("whatsInYourDrink.tooltip")} />
                </div>
              )}
            </>
          )}
          {unitKeyModalVisible && (
            <Modal onClose={() => setUnitKeyModalVisible(false)}>
              <UnitKey />
            </Modal>
          )}
          {modalVisible && (
            <Modal>
              <Header className="u-width-100 u-padding-vertical-none u-padding-horizontal-none" />

              <div className="o-container u-width-100 u-padding-horizontal-none">
                <h3 className="c-modal__title u-margin-top u-margin-bottom-small">{t("whatsInYourDrink.title")}</h3>
                <p className="u-margin-top-none u-margin-bottom c-drink-calculator__strapline">
                  {t("whatsInYourDrink.choose", { number: selectedDrinks.length })}
                </p>

                <div className="u-flex u-margin-bottom-large u-padding-bottom-huge u-margin-horizontal-none c-drink-calculator__drink-card-wrapper u-scrollbar-dark">
                  {selectedDrinks.map((drink, index) => {
                    const readableDrinkName = t(`drinks.${drink.id}.name`);
                    return (
                      <DrinkCard
                        content={drink}
                        ctaText={t("whatsInYourDrink.removeDrink", { drink: readableDrinkName })}
                        ctaType="remove"
                        key={`drink.id-${index}`}
                        name={t(`drinks.${drink.id}.name`)}
                        className="c-drink-calculator__drink-card"
                        onSelect={() => {
                          console.log("removed drink:", drink); // for testers
                          const removeSelectedDrink = selectedDrinks.filter((el, i) => index !== i);
                          setSelectedDrinks(removeSelectedDrink);
                        }}
                      >
                        <div className="u-margin-top-auto">
                          <h3 className="u-h4 su-margin-top-small u-margin-bottom-tiny u-text-center">
                            {t(`drinks.${drink.id}.name`)}
                          </h3>
                          <p className="c-drink-card__subtitle u-margin-top-none u-margin-bottom-small">
                            {t("drinks.common.drinkInfo", {
                              abv: drink.abv,
                              container: drink.container,
                              ml: drink.ml,
                              count: drink.units
                            })}
                          </p>
                        </div>
                      </DrinkCard>
                    );
                  })}
                </div>
              </div>

              <div className="c-modal__cta-wrapper u-flex--space-between">
                <div className="u-flex--align-self-end u-margin-top-auto">
                  <Button
                    className="c-button c-button--secondary u-margin-top-auto u-flex--align-self-end c-drink-calculator__total"
                    onClick={() => {
                      setResultsVisible(false);
                      setModalVisible(false);
                    }}
                  >
                    {t("whatsInYourDrink.addMore")}
                  </Button>
                  <Button
                    className="c-button c-button--secondary u-margin-top-auto u-flex--align-self-end c-drink-calculator__total"
                    onClick={() => {
                      setResultsVisible(false);
                      setSelectedDrinks([]);
                      setModalVisible(false);
                    }}
                  >
                    {t("whatsInYourDrink.clearTotal")}
                  </Button>
                </div>

                <Button
                  className="c-button c-button--primary u-flex--align-self-end u-margin-top-auto"
                  disabled={!isDrinksSelected}
                  onClick={() => {
                    setModalVisible(false);
                    setResultsVisible(true);
                  }}
                >
                  {t("whatsInYourDrink.calculate")}
                </Button>
              </div>
            </Modal>
          )}
        </section>
      </main>
    </>
  );
}

export default DrinkCalculator;
