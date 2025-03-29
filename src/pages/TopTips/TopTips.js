// @flow

import React, { useState, type Element } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import classnames from "classnames";

import illustratedImage from "assets/images/illustrations/drinking.svg";

import List from "components/Elements/List/List";
import TabHeader from "components/Elements/TabHeader/TabHeader";
import Button from "components/Elements/Button/Button";
import ContentWithSidebar from "components/ContentWithSidebar/ContentWithSidebar";

type Props = {};

function TopTips(props: Props): Element<any> {
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState("makeAPlan");

  const tabOptions = [
    {
      key: "makeAPlan",
      label: "makeAPlan"
    },
    {
      key: "changeDrink",
      label: "changeDrink"
    },
    {
      key: "getOthersInvolved",
      label: "getOthersInvolved"
    },
    {
      key: "setBudget",
      label: "setBudget"
    },
    {
      key: "takeABreak",
      label: "takeABreak"
    },
    {
      key: "stayHydrated",
      label: "stayHydrated"
    }
  ];
  return (
    <ContentWithSidebar sidebarImage={illustratedImage}>
      <h2 className="u-margin-top-none u-margin-bottom" data-testid="title">
        {t("topTips.title")}
      </h2>

      <p className="u-padding-top u-margin-none">
        <Trans
          i18nKey={`topTips.benefitsListTitle`}
          values={{ list: t(`topTips.benefitsList`) }}
          components={[<List items={t(`topTips.benefitsList`, { returnObjects: true })}></List>]}
        ></Trans>
      </p>

      <p>{t("topTips.tipsListHeading")}</p>

      <TabHeader className="u-margin-bottom-small u-width-100">
        {tabOptions.map(option => {
          return (
            <Button
              key={option.key}
              className={classnames("c-button--tab c-tab-header__btn", selectedOption === option.label && "is-active")}
              size="sm"
              onClick={() => setSelectedOption(option.label)}
            >
              {t(`topTips.${option.label}.ctaText`)}
            </Button>
          );
        })}
      </TabHeader>

      <p className="u-padding-top u-margin-none">
        <Trans
          i18nKey={`topTips.${selectedOption}.modal.body`}
          values={{
            subList: (
              <List
                className="is-small"
                items={t(`topTips.${selectedOption}.modal.list`, { returnObjects: true })}
              ></List>
            )
          }}
          components={[
            <List
              className="u-padding-top-none u-margin-vertical-none is-small"
              items={t(`topTips.${selectedOption}.modal.list`, { returnObjects: true })}
            ></List>,
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <a href="https://www.joinclubsoda.co.uk" rel="noreferrer noopener" target="_blank"></a>
          ]}
        ></Trans>
      </p>

      <Link
        to="/home"
        className="c-button c-button--primary c-button--md u-margin-top-huge u-flex--align-self-end u-text-center"
      >
        {t("common.home")}
      </Link>
    </ContentWithSidebar>
  );
}

export default TopTips;
