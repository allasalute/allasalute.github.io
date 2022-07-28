// @flow

import React, { type Element } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import classnames from "classnames";
import { Link } from "react-router-dom";

import Card from "components/Elements/Card/Card";

import drinksImage from "assets/images/home/cards/drinks.svg";
import healthyImage from "assets/images/home/cards/keep-breasts-healthy.svg";
import mythsImage from "assets/images/home/cards/myths.svg";
import physicalActivityImage from "assets/images/home/cards/physical-activity.svg";
import risksImage from "assets/images/home/cards/risks.svg";
import smokingImage from "assets/images/home/cards/smoking.svg";
import tipsImage from "assets/images/home/cards/tips.svg";
import weightImage from "assets/images/home/cards/weight.svg";
import wellbeingImage from "assets/images/home/cards/wellbeing.svg";

import { responsiveBreakpoint } from "constants/responsiveBreakpoint";
import Header from "components/Header/HeaderContainer";

type Props = {};
type CardContent = {
  +id: string,
  +image: string,
  +title: string,
  +strapline: ?string
};

function Home(props: Props): Element<any> {
  const { t } = useTranslation();

  const isMobile = useMediaQuery({ maxWidth: responsiveBreakpoint.md });
  const rowClasses = classnames("c-home__row u-flex--space-between", !isMobile && "u-flex");

  const renderCard = (card: CardContent) => {
    return (
      <Card className="c-home__card u-text-center" key={card.id}>
        <img className="u-responsive-image u-width-100" src={card.image} alt="" role="presentation" />
        <div className="c-home__card-inner ">
          <h3 className="c-home__card-title u-margin-none">{card.title}</h3>
          {card.strapline && <p className="u-margin-bottom-none c-home__card-body">{card.strapline}</p>}
          <div className="u-margin-top-auto">
            <Link
              to={`/${card.id}`}
              aria-label={t("common.learnMoreAltText", { topic: card.title })}
              className="c-home__card-cta c-button c-button--primary c-button--md u-text-center u-width-100"
            >
              {t("common.learnMore")}
            </Link>
          </div>
        </div>
      </Card>
    );
  };

  const topSectionCards = [
    {
      id: "changeRisks",
      image: healthyImage,
      title: t("homeTiles.changeMyRisks.title"),
      strapline: t("homeTiles.changeMyRisks.strapline")
    },
    {
      id: "myths",
      image: mythsImage,
      title: t("homeTiles.myths.title"),
      strapline: t("homeTiles.myths.strapline")
    }
  ];

  const alcoholFactorCards = [
    {
      id: "alcoholRisks",
      image: risksImage,
      title: t("homeTiles.alcoholRisks.title"),
      strapline: t("homeTiles.alcoholRisks.strapline")
    },
    {
      id: "drinkCalculator",
      image: drinksImage,
      title: t("homeTiles.whatsInMyDrink.title"),
      strapline: t("homeTiles.whatsInMyDrink.strapline")
    },
    {
      id: "tips",
      image: tipsImage,
      title: t("homeTiles.topTips.title"),
      strapline: t("homeTiles.topTips.strapline")
    }
  ];

  const otherFactorCards = [
    {
      id: "stayingActive",
      image: physicalActivityImage,
      title: t("homeTiles.stayingActive.title"),
      strapline: null
    },
    {
      id: "smoking",
      image: smokingImage,
      title: t("homeTiles.smoking.title"),
      strapline: null
    },
    {
      id: "weight",
      image: weightImage,
      title: t("homeTiles.weight.title"),
      strapline: null
    },
    {
      id: "wellbeing",
      image: wellbeingImage,
      title: t("homeTiles.wellbeing.title"),
      strapline: null
    }
  ];

  return (
    <>
      <Header isResultsBtnVisible isShareVisible isEndSessionBtnVisible />
      <main className="o-container u-margin-bottom-huge">
        <h2 className="u-margin-top-large u-margin-bottom-none" data-testid="title">
          {t("homeTiles.improveBreastHealth.title")}
        </h2>
        <p className="u-margin-top-small u-margin-bottom-huge">{t("homeTiles.improveBreastHealth.subHeading")}</p>
        <div className={rowClasses}>{topSectionCards.map(card => renderCard(card))}</div>
      </main>
      <div className="c-home__coloured-row">
        <div className="o-container u-padding-bottom-huge u-padding-top-large">
          <div>
            <h2 className="u-margin-top-huge u-margin-bottom-none">{t("homeTiles.factors.title")}</h2>
            <p className="u-margin-top-small u-margin-bottom-huge">{t("homeTiles.factors.alcohol")}</p>
            <div className={rowClasses}>{alcoholFactorCards.map(card => renderCard(card))}</div>
            <p className="u-margin-top-none u-margin-vertical-huge u-padding-top">{t("homeTiles.factors.other")}</p>

            <div className={rowClasses}>{otherFactorCards.map(card => renderCard(card))}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
