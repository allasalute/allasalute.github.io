import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { initialAsyncStatePropType, initialAsyncState } from "redux/asyncActionReducer";
import { Link } from "react-router-dom";

const Footer = props => {
  const { t } = useTranslation();

  return (
    <footer className="o-container c-footer" data-testid="footer">
      <nav data-testid="navbar">
        <a
          href="https://abh-dependencies.netlify.app/privacy"
          className="u-styled-link u-margin-right-large"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("footer.privacy")}
        </a>
        <a
          href="https://abh-dependencies.netlify.app/accessibility"
          className="u-styled-link u-margin-right-large"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("footer.accessibility")}
        </a>
        <Link className="u-styled-link" to="/cookiePreferences">
          {t("cookies.banner.manageCookies")}
        </Link>
      </nav>
    </footer>
  );
};

const linkPropType = PropTypes.shape({
  to: PropTypes.string,
  text: PropTypes.string
});

const actionType = PropTypes.shape({
  title: PropTypes.string,
  callback: PropTypes.func,
  to: PropTypes.string
});

Footer.propTypes = {
  links: PropTypes.arrayOf(linkPropType),
  profileDropdownActions: PropTypes.arrayOf(actionType),
  notifications: initialAsyncStatePropType,
  onNotificationRefresh: PropTypes.func,
  showActions: PropTypes.bool,
  title: PropTypes.string,
  showDropdownOnMobile: PropTypes.bool
};

Footer.defaultProps = {
  links: [],
  profileDropdownActions: [],
  onNotificationRefresh: () => {},
  notifications: initialAsyncState,
  showActions: true,
  title: "",
  showDropdownOnMobile: true
};

export default Footer;
