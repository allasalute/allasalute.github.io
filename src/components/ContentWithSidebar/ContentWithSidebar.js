// @flow

import React, { type ChildrenArray, type Element } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import classnames from "classnames";

import Header from "components/Header/SmartResponsiveHeader";
import illustratedImage from "assets/images/illustrations/nurse.svg";
import { responsiveBreakpoint } from "constants/responsiveBreakpoint";

type Props = {
  +sidebarImage: string,
  +children: ChildrenArray<Element<any>>,
  +className?: string,
  +isHomeBtnVisible?: boolean,
  +isShareVisible?: boolean,
  +isEndSessionBtnVisible?: boolean,
  +onEndSession?: (history: any) => void,
  +homeButtonType?: "default" | "back" | "learnMore"
};

const ContentWithSidebar = (props: Props): Element<any> => {
  const {
    sidebarImage,
    isHomeBtnVisible,
    isShareVisible,
    isEndSessionBtnVisible,
    className,
    onEndSession,
    homeButtonType = "default"
  } = props;

  const isMobile = useMediaQuery({ maxWidth: responsiveBreakpoint.md });
  const classes = classnames("c-section", "u-flex", "u-flex--column", !isMobile && "u-margin-left-huge", className);
  const wrapperClasses = classnames("o-container", "u-padding-top-navbar", !isMobile && "u-flex");

  return (
    <>
      <Header
        isHomeBtnVisible={isHomeBtnVisible}
        isShareVisible={isShareVisible}
        isEndSessionBtnVisible={isEndSessionBtnVisible}
        onEndSession={onEndSession}
        homeButtonType={homeButtonType}
      />
      <main className={wrapperClasses}>
        <aside className="c-sidebar">
          <div className="c-sidebar__inner">
            <img className="u-responsive-image" src={sidebarImage ?? illustratedImage} alt="" role="presentation" />
          </div>
        </aside>
        <section className={classes}>{props.children}</section>
      </main>
    </>
  );
};

ContentWithSidebar.propTypes = {
  className: PropTypes.string,
  sidebarImage: PropTypes.string,
  children: PropTypes.node.isRequired,
  isHomeBtnVisible: PropTypes.bool,
  isEndSessionBtnVisible: PropTypes.bool
};

ContentWithSidebar.defaultProps = {
  className: "",
  sidebarImage: "",
  isHomeBtnVisible: true,
  isEndSessionBtnVisible: true
};

export default ContentWithSidebar;
