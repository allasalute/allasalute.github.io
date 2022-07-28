import React from "react";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import Button from "components/Elements/Button/Button";
import { cookieNames } from "constants/cookies";
import { getOneYearFromNow } from "helpers/date";

const CookieBanner = () => {
  const { t } = useTranslation();
  const [cookies, setCookie, removeCookie] = useCookies();

  const acceptAllCookies = () => {
    removeCookie(cookieNames.analyticsOptOut);
    setCookie(cookieNames.seen, true, { expires: getOneYearFromNow() });
  };

  return (
    !cookies[cookieNames.seen] && (
      <div className="c-cookie-banner">
        <div className="o-container c-cookie-banner__container">
          <p className="c-cookie-banner__message">{t("cookies.banner.message")}</p>
          <div className="c-cookie-banner__actions">
            <Link
              to="/cookiePreferences"
              className="c-button c-button--secondary c-button--sm u-margin-horizontal-tiny u-text-center"
            >
              {t("cookies.banner.manageCookies")}
            </Link>
            <Button size="sm" className="u-margin-horizontal-tiny" onClick={acceptAllCookies}>
              {t("cookies.banner.acceptAll")}
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default CookieBanner;
