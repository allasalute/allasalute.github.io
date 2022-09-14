import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import useQuery from "hooks/useQuery";
import classnames from "classnames";

import { responsiveBreakpoint } from "constants/responsiveBreakpoint";

import illustratedImage from "assets/images/illustrations/nurse.svg";
import timeIcon from "assets/images/icons/time.svg";
import questionIcon from "assets/images/icons/question.svg";
import tickIcon from "assets/images/icons/tick.svg";
import LogoUnico from "assets/images/icons/LogoUnico.svg";
//import LogoImageUniCa from "assets/images/icons/LogoUnica&Dipartimenti.png";

import List from "components/Elements/List/List";
import InfoCard from "components/Elements/InfoCard/InfoCard";
import ContentWithSidebar from "components/ContentWithSidebar/ContentWithSidebar";
import Modal from "components/Elements/Modal/Modal";

function Landing(props) {
  const { t } = useTranslation();

  const isMobile = useMediaQuery({ maxWidth: responsiveBreakpoint.md });
  const infoCardWrapperClasses = classnames(!isMobile && "u-flex u-flex--space-between");
  const query = useQuery();
  const [showEndSessionModal, setEndSessionModal] = useState(query.get("endSession") === "true");

  return (
    <ContentWithSidebar
      sidebarImage={illustratedImage}
      isHomeBtnVisible={false}
      isEndSessionBtnVisible={false}
      isShareVisible
    >
      <h2 className="u-margin-top-none u-margin-bottom u-white-space-pre">{t("onboarding.title")}</h2>
      <p className="u-margin-none">
        <Trans
          i18nKey="onboarding.body"
          values={{ list: t("onboarding.list") }}
          components={[<List items={t("onboarding.list", { returnObjects: true })}></List>]}
        ></Trans>
      </p>

      <div className={infoCardWrapperClasses}>
        <InfoCard className="c-landing__info" text={t("onboarding.infoCard.time")} image={timeIcon} />
        <InfoCard className="c-landing__info" text={t("onboarding.infoCard.questions")} image={questionIcon} />
        <InfoCard className="c-landing__info" text={t("onboarding.infoCard.data")} image={tickIcon} />
      </div>

      <Link
        to="/questionnaire"
        className="c-button c-button--primary c-button--md u-margin-top-auto u-flex--align-self-end u-text-center c-questionnaire__btn"
      >
        {t("common.next")}
      </Link>
      <p className="c-button c-button--secondary c-button--sm u-margin-horizontal-tiny u-text-center">
        <Trans i18nKey="onboarding.infoThanksTo.Fondazione"></Trans>
      </p>
      <p>
        <div className="c-info u-flex--column">
          <img className="u-responsive-image" src={LogoUnico} alt="" role="presentation" />
        </div>
      </p>

      {showEndSessionModal && (
        <Modal onClose={() => setEndSessionModal(false)} className="c-modal--small">
          <div className="o-container u-width-100 u-padding-horizontal-none">
            <h3 className="c-modal__title u-margin-top">{t("session.end")}</h3>
            <p className="c-modal__subtitle">{t("session.endBody")}</p>
          </div>
        </Modal>
      )}
    </ContentWithSidebar>
  );
}

export default Landing;
