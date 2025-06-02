// src/components/Navigation/BottomNavBar.jsx
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FaHome, FaShareAlt, FaSignOutAlt, FaChartBar, FaArrowLeft, FaBookOpen } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const BottomNavBar = ({
  isHomeBtnVisible,
  isResultsBtnVisible,
  isShareVisible,
  isEndSessionBtnVisible,
  onShare,
  onEndSession,
  homeButtonType = "default"
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const renderHomeButton = () => {
    let icon;
    let label;
    let to;

    switch (homeButtonType) {
      case "learnMore":
        icon = <FaBookOpen />;
        label = t("common.learnMore");
        to = "/home";
        break;
      case "back":
        icon = <FaArrowLeft />;
        label = t("common.back");
        return (
          <button className="navigation-bar__item" onClick={() => history.goBack()}>
            {icon}
            <span>{label}</span>
          </button>
        );
      default:
        icon = <FaHome />;
        label = t("common.home");
        to = "/home";
    }

    return (
      <Link to={to} className="navigation-bar__item">
        {icon}
        <span>{label}</span>
      </Link>
    );
  };

  const activeItemsCount = [isShareVisible, isResultsBtnVisible, isHomeBtnVisible, isEndSessionBtnVisible].filter(
    Boolean
  ).length;

  let itemCountClass = "";
  if (activeItemsCount === 1) itemCountClass = "one-item";
  else if (activeItemsCount === 2) itemCountClass = "two-items";
  else if (activeItemsCount === 3) itemCountClass = "three-items";

  return (
    <nav className={`navigation-bar bottom ${itemCountClass}`}>
      {isShareVisible && (
        <button className="navigation-bar__item" onClick={onShare}>
          <FaShareAlt />
          <span>{t("share.title")}</span>
        </button>
      )}
      {isResultsBtnVisible && (
        <Link to="/results" className="navigation-bar__item">
          <FaChartBar />
          <span>{t("common.results")}</span>
        </Link>
      )}
      {isHomeBtnVisible && renderHomeButton()}
      {isEndSessionBtnVisible && (
        <button className="navigation-bar__item" onClick={onEndSession}>
          <FaSignOutAlt />
          <span>{t("common.endSession")}</span>
        </button>
      )}
    </nav>
  );
};

export default BottomNavBar;
