import React, { useEffect } from "react";
import FocusLock from "react-focus-lock";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Backdrop from "../Backdrop/Backdrop";
import classnames from "classnames";

const Modal = props => {
  const { onClose, children, className } = props;

  const classes = classnames("c-modal", className);

  useEffect(() => {
    document.querySelector("body").setAttribute("style", "overflow:hidden");
    return () => {
      document.querySelector("body").setAttribute("style", "");
    };
  }, []);

  return (
    <>
      <div className={classes}>
        <div className="c-modal__inner-wrapper">
          <FocusLock className="u-height-100">
            <div className="c-modal__children u-flex u-flex--column u-text-left u-height-100">
              {children}
              {onClose && (
                <div className="c-modal__cta-wrapper">
                  <Button
                    aria-label="chiudi"
                    onClick={onClose}
                    className="c-modal__close c-button c-button--primary u-margin-top-auto"
                  >
                    Chiudi
                  </Button>
                </div>
              )}
            </div>
          </FocusLock>
        </div>
      </div>
      <Backdrop onClick={onClose} />
    </>
  );
};

Modal.propTypes = {
  close: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

Modal.defaultProps = {
  onClose: null
};

export default Modal;
