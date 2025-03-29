const AppErr = props => {
  return next => action => {
    // If not a promise, continue on
    if (!action?.payload?.promise) {
      return next(action);
    }

    // Dispatch initial pending promise, but catch any errors
    return next(action).catch(error => {
      console.warn(error);

      return error;
    });
  };
};
export default AppErr;
