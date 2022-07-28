import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TabHeader = props => {
  const { className } = props;
  const classes = classnames("c-tab-header", className);

  return (
    <div className={classes} data-testid="drink-card">
      {props.children}
    </div>
  );
};

TabHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

TabHeader.defaultProps = {
  className: ""
};

export default TabHeader;
