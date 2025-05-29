// @flow

import React, { useState, type Element } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import classnames from "classnames";

import illustratedImage from "assets/images/illustrations/physical-activity.svg";

import List from "components/Elements/List/List";
import TabHeader from "components/Elements/TabHeader/TabHeader";
import Button from "components/Elements/Button/Button";
import ContentWithSidebar from "components/ContentWithSidebar/ContentWithSidebar";

type Props = {};

function StayingActive(props: Props): Element<any> {
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState("moderatePhysicalActivity");

  const tabOptions = [
    {
      key: "moderatePhysicalActivity",
      label: "moderatePhysicalActivity"
    },
    {
      key: "vigorousPhysicalActivity",
      label: "vigorousPhysicalActivity"
    },
    {
      key: "peopleWithADisability",
      label: "peopleWithADisability"
    },
    {
      key: "olderFallRisk",
      label: "olderFallRisk"
    },
    {
      key: "youngPeople",
      label: "youngPeople"
    }
  ];
  return (
    <ContentWithSidebar sidebarImage={illustratedImage} homeButtonType="back">
      <h2 className="u-margin-top-none u-margin-bottom" data-testid="title">
        {t("stayingActive.title")}
      </h2>

      <p className="u-padding-top u-margin-none">
        <Trans
          i18nKey={`stayingActive.researchListTitle`}
          values={{ list: t(`stayingActive.researchList`) }}
          components={[<List items={t(`stayingActive.researchList`, { returnObjects: true })}></List>]}
        ></Trans>
      </p>

      <p className="u-padding-top u-margin-none">
        <Trans
          i18nKey={`stayingActive.activityBenefitsListTitle`}
          values={{ list: t(`stayingActive.activityBenefitsList`) }}
          components={[<List items={t(`stayingActive.activityBenefitsList`, { returnObjects: true })}></List>]}
        ></Trans>
      </p>

      <p className="u-padding-top u-margin-none">
        <Trans
          i18nKey={`stayingActive.nhsRecommendationListTitle`}
          values={{ list: t(`stayingActive.nhsRecommendationList`) }}
          components={[<List items={t(`stayingActive.nhsRecommendationList`, { returnObjects: true })}></List>]}
        ></Trans>
      </p>

      <p className="u-padding-top u-margin-none">{t("stayingActive.activityListTitle")}</p>

      <p className="u-padding-top u-margin-none">
        <Trans
          i18nKey={`stayingActive.activityListStrapline`}
          values={{ list: t(`stayingActive.activityList`) }}
          components={[<List items={t(`stayingActive.activityList`, { returnObjects: true })}></List>]}
        ></Trans>
      </p>

      <TabHeader className="u-margin-bottom-small u-width-100 u-margin-top">
        {tabOptions.map(option => {
          return (
            <Button
              key={option.key}
              className={classnames("c-button--tab c-tab-header__btn", selectedOption === option.label && "is-active")}
              size="sm"
              onClick={() => setSelectedOption(option.label)}
            >
              {t(`stayingActive.${option.label}.ctaText`)}
            </Button>
          );
        })}
      </TabHeader>

      <p className="u-padding-top u-margin-none">
        <Trans
          i18nKey={`stayingActive.${selectedOption}.modal.body`}
          values={{
            list: <List items={t(`stayingActive.${selectedOption}.modal.list`, { returnObjects: true })}></List>
          }}
          components={[
            <List items={t(`stayingActive.${selectedOption}.modal.list`, { returnObjects: true })}></List>,
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <a
              href="http://www.activityalliance.org.uk/get-active/inclusive-gyms"
              rel="noreferrer noopener"
              target="_blank"
            ></a>
          ]}
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

export default StayingActive;
