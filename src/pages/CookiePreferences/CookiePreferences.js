import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "components/Header/HeaderContainer";
import Toggle from "components/Elements/Toggle/Toggle";
import { useCookies } from "react-cookie";
import { responsiveBreakpoint } from "constants/responsiveBreakpoint";
import { useMediaQuery } from "react-responsive";
import { getOneYearFromNow } from "helpers/date";
import { cookieNames } from "constants/cookies";
import classnames from "classnames";

const CookiePreferences = () => {
  const { t } = useTranslation();
  const [cookies, setCookie, removeCookie] = useCookies();
  const isMobile = useMediaQuery({ maxWidth: responsiveBreakpoint.sm });

  useEffect(() => {
    setCookie(cookieNames.seen, true, { expires: getOneYearFromNow() });
  }, [setCookie]);

  const toggleAnalyticsCookie = () => {
    const isOptOut = !(cookies[cookieNames.analyticsOptOut] === "true");

    if (isOptOut) {
      setCookie(cookieNames.analyticsOptOut, isOptOut, { expires: getOneYearFromNow() });
    } else {
      removeCookie(cookieNames.analyticsOptOut);
    }
  };

  return (
    <>
      <Header />
      <main className="o-container u-margin-bottom-huge">
        <h2 className="u-margin-top-large u-margin-bottom-none">{t("cookies.title")}</h2>
        <p className="u-margin-top-small u-margin-bottom-huge">{t("cookies.subHeading")}</p>
        <table className="c-table">
          <thead>
            <tr>
              <th>{t("cookies.headers.cookie")}</th>
              <th>{t("cookies.headers.name")}</th>
              <th>{t("cookies.headers.purpose")}</th>
              <th>{t("cookies.headers.toggle")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("cookies.body.ga")}</td>
              <td data-title={t("cookies.headers.name")}>
                <code>
                  {cookieNames.ga.map(name => (
                    <span key={name}>
                      {name} <br />
                    </span>
                  ))}
                </code>
              </td>
              <td data-title={t("cookies.headers.purpose")}>{t("cookies.body.gaPurpose")}</td>
              <td data-title={t("cookies.headers.toggle")} className={classnames(!isMobile && "u-text-center")}>
                <Toggle
                  value={!(cookies[cookieNames.analyticsOptOut] === "true")}
                  onClick={toggleAnalyticsCookie}
                  aria-label={t("cookies.body.gaPurposeToggle")}
                />
              </td>
            </tr>
            <tr>
              <td>{t("cookies.body.optIn")}</td>
              <td data-title={t("cookies.headers.name")}>
                <code>{cookieNames.analyticsOptOut}</code>
              </td>
              <td data-title={t("cookies.headers.purpose")}>{t("cookies.body.optInPurpose")}</td>
              <td data-title={t("cookies.headers.toggle")} className={classnames(!isMobile && "u-text-center")}>
                <Toggle value={true} disabled />
              </td>
            </tr>
            <tr>
              <td>{t("cookies.body.seen")}</td>
              <td data-title={t("cookies.headers.name")}>
                <code>{cookieNames.seen}</code>
              </td>
              <td data-title={t("cookies.headers.purpose")}>{t("cookies.body.seenPurpose")}</td>
              <td data-title={t("cookies.headers.toggle")} className={classnames(!isMobile && "u-text-center")}>
                <Toggle value={true} disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
};

export default CookiePreferences;
