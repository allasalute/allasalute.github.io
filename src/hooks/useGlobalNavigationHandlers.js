import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import ReactGA from "react-ga";
import { copyTextToClipboard } from "helpers/copy";

const useGlobalNavigationHandlers = endSessionCallback => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("common.appName"),
          text: t("common.appDescription"),
          url: process.env.REACT_APP_FED_URL
        });
      } catch (err) {
        // Ignora la chiusura
      }
    } else {
      copyTextToClipboard(process.env.REACT_APP_FED_URL);
    }

    if (window.ga) {
      ReactGA.event({
        category: "Click",
        action: "share"
      });
    }
  };

  const handleEndSession = () => {
    if (window.ga) {
      ReactGA.event({
        category: "Click",
        action: "end session"
      });
    }

    if (typeof endSessionCallback === "function") {
      endSessionCallback(history);
    }
  };

  return {
    handleShare,
    handleEndSession
  };
};

export default useGlobalNavigationHandlers;
