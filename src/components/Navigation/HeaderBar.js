// src/components/Navigation/HeaderBar.jsx
import React, { type Element, useState } from "react";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";
import { FaHome, FaShareAlt, FaSignOutAlt, FaChartBar, FaArrowLeft, FaBookOpen } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import images from "assets/images/navbar"; // Assicurati che questo sia il path corretto
import { categories } from "constants/analytics";
import { copyTextToClipboard } from "helpers/copy";
import Modal from "components/Elements/Modal/Modal";

type Props = {
  +isHomeBtnVisible?: boolean,
  +isResultsBtnVisible?: boolean,
  +isEndSessionBtnVisible?: boolean,
  +isShareVisible?: boolean,
  +endSession: any => any,
  +homeButtonType?: "default" | "learnMore" | "back"
};

const HeaderBar = (props: Props): Element<any> => {
  const {
    isResultsBtnVisible,
    isHomeBtnVisible,
    isShareVisible,
    isEndSessionBtnVisible,
    endSession,
    homeButtonType = "default" // valore di default
  } = props;
  const { t } = useTranslation();
  const history = useHistory();
  const [copySuccess, setCopySuccess] = useState(false);

  const onEndSession = () => {
    if (window.ga) {
      ReactGA.event({
        category: categories.CLICK,
        action: "end session"
      });
    }

    endSession(history);
  };

  const copyUrl = () => {
    copyTextToClipboard(process.env.REACT_APP_FED_URL);
    setCopySuccess(true);
  };

  const onShare = async () => {
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
      copyUrl();
    }
    if (window.ga) {
      ReactGA.event({
        category: categories.CLICK,
        action: "share"
      });
    }
  };

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

  return (
    <header className="navigation-bar top">
      <div className="o-container u-flex u-flex--space-between u-width-100">
        {/* LOGO A SINISTRA */}
        <div className="navigation-bar__logo-container">
          <img
            src={images.logo}
            srcSet={`${images.logo} 1x, ${images.logo2x} 2x, ${images.logo3x} 3x`}
            alt={t("header.logoAlt")}
            className="navigation-bar__logo"
          />
        </div>

        {/* BOTTONI A DESTRA */}
        <div className="navigation-bar__actions">
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
        </div>
      </div>

      {/* MODAL PER SHARE */}
      {copySuccess && (
        <Modal onClose={() => setCopySuccess(false)} className="c-modal--small">
          <div className="o-container u-width-100 u-padding-horizontal-none">
            <h3 className="c-modal__title u-margin-top">{t("share.title")}</h3>
            <p className="c-modal__subtitle">{t("share.success")}</p>
          </div>
        </Modal>
      )}
    </header>
  );
};

export default HeaderBar;
