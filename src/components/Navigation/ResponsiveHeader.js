// src/components/Navigation/ResponsiveHeader.jsx

import React from "react";
import { useMediaQuery } from "react-responsive";
import HeaderBar from "./HeaderBar";
import BottomNavBar from "./BottomNavBar";
import LogoOnlyTopBar from "./LogoOnlyTopBar";
import { responsiveBreakpoint } from "constants/responsiveBreakpoint";

const ResponsiveHeader = ({
  isHomeBtnVisible = false,
  isResultsBtnVisible = false,
  isShareVisible = false,
  isEndSessionBtnVisible = false,
  onShare,
  onEndSession,
  homeButtonType = "default"
}) => {
  const isMobile = useMediaQuery({ maxWidth: responsiveBreakpoint.md });

  return (
    <>
      {isMobile ? (
        <>
          <LogoOnlyTopBar />
          <BottomNavBar
            isHomeBtnVisible={isHomeBtnVisible}
            isResultsBtnVisible={isResultsBtnVisible}
            isShareVisible={isShareVisible}
            isEndSessionBtnVisible={isEndSessionBtnVisible}
            onShare={onShare}
            onEndSession={onEndSession}
            homeButtonType={homeButtonType}
          />
        </>
      ) : (
        <HeaderBar
          isHomeBtnVisible={isHomeBtnVisible}
          isResultsBtnVisible={isResultsBtnVisible}
          isShareVisible={isShareVisible}
          isEndSessionBtnVisible={isEndSessionBtnVisible}
          onShare={onShare}
          endSession={onEndSession}
          homeButtonType={homeButtonType}
        />
      )}
    </>
  );
};

export default ResponsiveHeader;
