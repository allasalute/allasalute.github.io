// src/components/Layout/LayoutWithHeader.jsx
import React from "react";
import ResponsiveHeader from "components/Navigation/ResponsiveHeader";

const LayoutWithHeader = ({ children }) => {
  return (
    <>
      <ResponsiveHeader
        isHomeBtnVisible
        isResultsBtnVisible
        isShareVisible
        isEndSessionBtnVisible
        onShare={() => {}} // puoi gestire qui o passare via props
        onEndSession={() => {}}
      />
      <main className="layout-content"> {children} </main>
    </>
  );
};

export default LayoutWithHeader;
