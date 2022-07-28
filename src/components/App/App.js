import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import Routes from "routes";
import Footer from "components/Footer/Footer";
import useOnline from "hooks/useOnline";
import Modal from "components/Elements/Modal/Modal";
import withTracker from "hoc/withTracker";
import { withRouter } from "react-router-dom";
import CookieBanner from "components/Elements/CookieBanner/CookieBanner";

const App = props => {
  const [hasAcknowledgedOffline, setHasAcknowledgedOffline] = useState(false);
  const { t } = useTranslation();
  const isOnline = useOnline();
  const wrapperRef = useRef(null);

  useEffect(() => {
    setHasAcknowledgedOffline(false);
  }, [isOnline]);

  const { pathname } = useLocation();

  useEffect(() => {
    let prevPathName = null;
    // don't refocus if only the query params/hash have changed
    if (pathname !== prevPathName) {
      wrapperRef.current.focus();
      window.scrollTo(0, 0);
      prevPathName = pathname;
    }
  }, [pathname]);

  return (
    <div className="c-page-wrapper" ref={wrapperRef} tabIndex={-1}>
      <div>
        <Routes {...props} />
      </div>
      {!isOnline && !hasAcknowledgedOffline && (
        <Modal onClose={() => setHasAcknowledgedOffline(true)} className="c-modal--small">
          <div className="o-container u-width-100 u-padding-horizontal-none">
            <h3 className="c-modal__title u-margin-top">{t("offline.title")}</h3>
            <p className="c-modal__subtitle">{t("offline.subtitle")}</p>
          </div>
        </Modal>
      )}
      <Footer />
      {pathname !== "/cookiePreferences" && <CookieBanner />}
    </div>
  );
};

export default withRouter(withTracker(App));
