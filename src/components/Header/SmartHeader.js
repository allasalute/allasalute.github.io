import React from "react";
import ResponsiveHeader from "components/Navigation/ResponsiveHeader";

const SmartHeader = ({
  isHomeBtnVisible = false,
  isResultsBtnVisible = false,
  isShareVisible = false,
  isEndSessionBtnVisible = false,
  onShare,
  onEndSession,
  homeButtonType = "default"
}) => {
  return (
    <ResponsiveHeader
      isHomeBtnVisible={isHomeBtnVisible}
      isResultsBtnVisible={isResultsBtnVisible}
      isShareVisible={isShareVisible}
      isEndSessionBtnVisible={isEndSessionBtnVisible}
      onShare={onShare}
      onEndSession={onEndSession}
      homeButtonType={homeButtonType}
    />
  );
};

export default SmartHeader;
