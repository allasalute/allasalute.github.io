// @flow

import React, { type Element, useState } from "react";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";

import { copyTextToClipboard } from "helpers/copy";
import Button from "components/Elements/Button/Button";
import Modal from "components/Elements/Modal/Modal";

import classnames from "classnames";
import PropTypes from "prop-types";

import { responsiveBreakpoint } from "constants/responsiveBreakpoint";

import images from "assets/images/navbar";
import { categories } from "constants/analytics";

type Props = {
  +className?: string,
  +isHomeBtnVisible?: boolean,
  +isResultsBtnVisible?: boolean,
  +isEndSessionBtnVisible?: boolean,
  +isShareVisible?: boolean,
  +endSession: any => any
};

const Header = (props: Props): Element<any> => {
  const { isResultsBtnVisible, isHomeBtnVisible, isShareVisible, isEndSessionBtnVisible, endSession, className } =
    props;
  const isMobile = useMediaQuery({ maxWidth: responsiveBreakpoint.md });
  const [copySuccess, setCopySuccess] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const classes = classnames("c-header o-container", className);
  const navClasses = classnames("u-flex--space-between", !isMobile && "u-flex");

  const copyUrl = () => {
    copyTextToClipboard(process.env.REACT_APP_FED_URL);
    setCopySuccess(true);
  };

  const onShareUrl = async () => {
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

  const onEndSession = () => {
    if (window.ga) {
      ReactGA.event({
        category: categories.CLICK,
        action: "end session"
      });
    }

    endSession(history);
  };

  return (
    <header className={classes}>
      <nav data-testid="navbar" className={navClasses}>
        <img
          src={images.logo}
          srcSet={`${images.logo} 1x, ${images.logo2x} 2x, ${images.logo3x} 3x`}
          alt={t("header.logoAlt")}
          className="c-header__logo"
          data-testid="logo"
        />

        <div>
          {isShareVisible && (
            <Button className="c-button--tertiary c-header__btn u-flex--align-self-end" onClick={onShareUrl}>
              {t("share.title")}
            </Button>
          )}

          {isEndSessionBtnVisible && (
            <Button className="c-button--tertiary c-header__btn u-flex--align-self-end" onClick={onEndSession}>
              {t("common.endSession")}
            </Button>
          )}

          {isHomeBtnVisible && (
            <Link to="/home" className="c-button c-button--tertiary c-header__btn u-flex--align-self-end u-text-center">
              {t("common.home")}
            </Link>
          )}

          {isResultsBtnVisible && (
            <Link
              to="/results"
              className="c-button c-button--tertiary c-header__btn u-flex--align-self-end u-text-center"
            >
              {t("common.results")}
            </Link>
          )}
        </div>
        {copySuccess && (
          <Modal onClose={() => setCopySuccess(false)} className="c-modal--small">
            <div className="o-container u-width-100 u-padding-horizontal-none">
              <h3 className="c-modal__title u-margin-top">{t("share.title")}</h3>
              <p className="c-modal__subtitle">{t("share.success")}</p>
            </div>
          </Modal>
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  isHomeBtnVisible: PropTypes.bool,
  isResultsBtnVisible: PropTypes.bool,
  isEndSessionBtnVisible: PropTypes.bool,
  isShareVisible: PropTypes.bool
};

Header.defaultProps = {
  className: "",
  isHomeBtnVisible: false,
  isResultsBtnVisible: false,
  isEndSessionBtnVisible: false,
  isShareVisible: false
};

export default Header;
