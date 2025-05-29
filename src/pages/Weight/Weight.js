// @flow

import React, { type Element } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";

import illustratedImage from "assets/images/illustrations/weight.svg";

import List from "components/Elements/List/List";
import ContentWithSidebar from "components/ContentWithSidebar/ContentWithSidebar";

type Props = {};

function Weight(props: Props): Element<any> {
  const { t } = useTranslation();

  return (
    <ContentWithSidebar sidebarImage={illustratedImage} homeButtonType="back">
      <h2 className="u-margin-top-none u-margin-bottom" data-testid="title">
        {t("weight.title")}
      </h2>
      <p className="u-padding-top u-margin-none">
        <Trans
          i18nKey={`weight.body`}
          values={{ list: t(`weight.list`) }}
          components={[<List items={t(`weight.list`, { returnObjects: true })}></List>]}
        ></Trans>
      </p>

      <p className="u-padding-top u-margin-none">
        <Trans
          i18nKey={`weight.mainLinksTitle`}
          values={{ list: t(`weight.mainLinksList`) }}
          components={[<List items={t(`weight.mainLinksList`, { returnObjects: true })}></List>]}
        ></Trans>
      </p>

      <p className="u-padding-top u-margin-none">
        <Trans
          i18nKey={`diet.body`}
          values={{ list: t(`diet.list`) }}
          components={[<List items={t(`diet.list`, { returnObjects: true })}></List>]}
        ></Trans>
      </p>

      <Link
        to="/home"
        className="c-button c-button--primary c-button--md u-margin-top-huge u-text-center u-flex--align-self-end"
      >
        {t("common.back")}
      </Link>
    </ContentWithSidebar>
  );
}

export default Weight;
