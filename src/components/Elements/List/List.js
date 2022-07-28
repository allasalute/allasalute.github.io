import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const List = props => {
  const { items, itemHeaders, link, className } = props;

  const wrapperClasses = classnames("u-d-block c-list u-margin-vertical", className);
  const listItemClasses = classnames("c-list__item u-flex u-margin-bottom-small", className);

  return (
    <span className={wrapperClasses} data-testid="list">
      {items.map((item, index) => (
        <span className={listItemClasses} key={item}>
          <span className="c-list__dot u-d-inline"></span>
          {itemHeaders?.length > 0 ? (
            <span span className="c-list__content">
              {itemHeaders[index]}
              <span className="c-list__body">{item}</span>
            </span>
          ) : (
            <span className="c-list__content" dangerouslySetInnerHTML={{ __html: item }}></span>
          )}
        </span>
      ))}
      {link && (
        <span className={listItemClasses}>
          <span className="c-list__dot u-d-inline"></span>

          <span className="c-list__content">{link}</span>
        </span>
      )}
    </span>
  );
};

List.propTypes = {
  link: PropTypes.node,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemHeaders: PropTypes.arrayOf(PropTypes.string)
};

List.defaultProps = {
  link: null,
  className: "",
  itemHeaders: []
};

export default List;
