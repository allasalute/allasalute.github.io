// @flow

import React, { useState, type Element } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import classnames from "classnames";

import illustratedImage from "assets/images/illustrations/nurse.svg";

import List from "components/Elements/List/List";
import TabHeader from "components/Elements/TabHeader/TabHeader";
import Button from "components/Elements/Button/Button";
import ContentWithSidebar from "components/ContentWithSidebar/ContentWithSidebar";

type Props = {};

function ChangeRisks(props: Props): Element<any> {
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState("canChange");

  const tabOptions = [
    {
      key: "can",
      label: "canChange"
    },
    {
      key: "cannot",
      label: "cannotChange"
    }
  ];
  return (
    <ContentWithSidebar sidebarImage={illustratedImage}>
      <h2 className="u-margin-top-none u-margin-bottom" data-testid="title">
        {t("changeMyRisks.title")}
      </h2>
      <p className="u-margin-top-none u-margin-bottom">{t("changeMyRisks.strapline")}</p>
      <TabHeader className="u-margin-bottom-small">
        {tabOptions.map(option => {
          return (
            <Button
              key={option.key}
              className={classnames("c-button--tab c-tab-header__btn", selectedOption === option.label && "is-active")}
              size="sm"
              onClick={() => setSelectedOption(option.label)}
            >
              {t(`changeMyRisks.${option.label}.title`)}
            </Button>
          );
        })}
      </TabHeader>
      <p className="u-padding-top u-margin-none u-white-space-pre-line">
        <Trans
          i18nKey={`changeMyRisks.${selectedOption}.body`}
          values={{ list: t(`changeMyRisks.${selectedOption}.list`) }}
          components={[
            <List
              items={t(`changeMyRisks.${selectedOption}.list`, { returnObjects: true })}
              itemHeaders={t(`changeMyRisks.${selectedOption}.listHeaders`, { returnObjects: true })}
            ></List>
          ]}
        ></Trans>
      </p>

      <div>
        {selectedOption === "cannotChange" && (
          <p className="u-padding-top u-margin-none u-white-space-pre-line">
            <Trans
              i18nKey={`changeMyRisks.cannotChange.otherFactors`}
              values={{ list: t(`changeMyRisks.cannotChange.otherFactorsList`) }}
              components={[
                <List
                  items={t(`changeMyRisks.cannotChange.otherFactorsList`, { returnObjects: true })}
                  itemHeaders={t(`changeMyRisks.cannotChange.otherFactorsListHeaders`, { returnObjects: true })}
                ></List>
              ]}
            ></Trans>
          </p>
        )}
      </div>

      <Link
        to="/home"
        className="c-button c-button--primary c-button--md u-margin-top-huge u-flex--align-self-end u-text-center"
      >
        {t("common.home")}
      </Link>
    </ContentWithSidebar>
  );
}

export default ChangeRisks;
