// @flow

import React, { type Element } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";

import illustratedImage from "assets/images/illustrations/drinking.svg";

import images from "assets/images/charts/units";

import List from "components/Elements/List/List";
import ContentWithSidebar from "components/ContentWithSidebar/ContentWithSidebar";

type Props = {};

function AlcoholRisks(props: Props): Element<any> {
  const { t } = useTranslation();

  return (
    <ContentWithSidebar sidebarImage={illustratedImage} homeButtonType="back">
      <h2 className="u-margin-top-none u-margin-bottom" data-testid="title">
        {t("alcoholRisks.title")}
      </h2>

      <p className="u-padding-top u-margin-none">
        <Trans
          i18nKey={`alcoholRisks.strapline`}
          values={{ list: t(`alcoholRisks.list`) }}
          components={[<List items={t(`alcoholRisks.list`, { returnObjects: true })}></List>]}
        ></Trans>
      </p>

      <img
        className="u-responsive-image u-margin-vertical-huge"
        src={images.unitGraph}
        srcSet={`${images.unitGraph} 1x, ${images.unitGraph2x} 2x, ${images.unitGraph3x} 3x`}
        alt={t("alcoholRisks.graphAltText")}
        role="presentation"
      />

      <p className="u-padding-top u-margin-none">
        <Trans
          i18nKey={`alcoholRisks.body`}
          values={{ list: t(`alcoholRisks.statisticsList`) }}
          components={[<List items={t(`alcoholRisks.statisticsList`, { returnObjects: true })}></List>]}
        ></Trans>
      </p>

      <Link
        to="/home"
        className="c-button c-button--primary c-button--md u-margin-top-huge u-flex--align-self-end u-text-center"
      >
        {t("common.back")}
      </Link>
    </ContentWithSidebar>
  );
}

export default AlcoholRisks;
