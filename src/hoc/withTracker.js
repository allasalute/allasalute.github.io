import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { cookieNames } from "constants/cookies";
import { useCookies } from "react-cookie";

export default function Hoc(WrappedComponent, options = {}) {
  const hasGaCookie = cookies => {
    let found = false;
    cookieNames.ga.forEach(name => (found = cookies[name] !== undefined));

    return found;
  };

  const trackPage = page => {
    ReactGA.set({
      page,
      ...options
    });
    ReactGA.pageview(page);
  };

  const HOC = props => {
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
      if (
        cookies[cookieNames.analyticsOptOut] === undefined &&
        cookies[cookieNames.seen] === "true" &&
        process.env.REACT_APP_GA &&
        process.env.NODE_ENV === "production"
      ) {
        ReactGA.initialize(process.env.REACT_APP_GA, options);
      } else if (cookies[cookieNames.analyticsOptOut] === "true" && hasGaCookie(cookies) && window.ga) {
        // Delete all GA cookies and remove ga from window
        delete window.ga;
        cookieNames.ga.forEach(cookie =>
          removeCookie(cookie, {
            domain: process.env.REACT_APP_DOMAIN
          })
        );
      }
    }, [cookies, removeCookie]);

    useEffect(() => {
      if (process.env.NODE_ENV === "production" && window.ga) {
        trackPage(props.location.pathname);
      }
    }, [props.location.pathname]);
    return <WrappedComponent {...props} />;
  };

  return HOC;
}
