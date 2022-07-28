// @flow

import React, { type Element } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";

import illustratedImage from "assets/images/illustrations/smoker.svg";

import List from "components/Elements/List/List";
import ContentWithSidebar from "components/ContentWithSidebar/ContentWithSidebar";

type Props = {};

function Smoking(props: Props): Element<any> {
  const { t } = useTranslation();

  return (
    <ContentWithSidebar sidebarImage={illustratedImage}>
      <h2 className="u-margin-top-none u-margin-bottom" data-testid="title">
        {t("smoking.title")}
      </h2>
      <p className="u-padding-top u-margin-none">
        <Trans
          i18nKey={`smoking.body`}
          values={{ list: t(`smoking.list`) }}
          components={[<List items={t(`smoking.list`, { returnObjects: true })}></List>]}
        ></Trans>
      </p>

      <div className="u-margin-top-auto u-flex--align-self-end ">
        <Link to="/home" className="c-button c-button--primary c-button--md u-margin-top-huge u-text-center">
          {t("common.home")}
        </Link>
      </div>
    </ContentWithSidebar>
  );
}

export default Smoking;
