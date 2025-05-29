// components/Header/SmartResponsiveHeader.jsx

import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { restartQuestionnaire } from "redux/modules/questionnaire";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { copyTextToClipboard } from "helpers/copy";
import { categories } from "constants/analytics";
import ResponsiveHeader from "components/Navigation/ResponsiveHeader";

const SmartResponsiveHeader = ({
  isHomeBtnVisible = false,
  isResultsBtnVisible = false,
  isShareVisible = false,
  isEndSessionBtnVisible = false,
  homeButtonType = "default",
  dispatch
}) => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleEndSession = () => {
    if (window.ga) {
      ReactGA.event({ category: categories.CLICK, action: "end session" });
    }
    dispatch(restartQuestionnaire());
    history.push("/");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        // $FlowFixMe
        await navigator.share({
          title: t("common.appName"),
          text: t("common.appDescription"),
          url: process.env.REACT_APP_FED_URL
        });
      } catch (err) {
        // User cancelled share dialog, can safely ignore
      }
    } else {
      copyTextToClipboard();
    }
    if (window.ga) {
      ReactGA.event({
        category: categories.CLICK,
        action: "share"
      });
    }
  };

  return (
    <ResponsiveHeader
      isHomeBtnVisible={isHomeBtnVisible}
      isResultsBtnVisible={isResultsBtnVisible}
      isShareVisible={isShareVisible}
      isEndSessionBtnVisible={isEndSessionBtnVisible}
      homeButtonType={homeButtonType}
      onEndSession={handleEndSession}
      onShare={handleShare}
    />
  );
};

export default connect()(SmartResponsiveHeader);
