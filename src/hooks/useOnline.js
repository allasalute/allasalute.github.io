import { useState, useEffect } from "react";

const useOnline = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const setTrueFromEvent = () => setIsOnline(true);
    const setFalseFromEvent = () => setIsOnline(false);

    window.addEventListener("online", setTrueFromEvent);
    window.addEventListener("offline", setFalseFromEvent);

    return () => {
      window.removeEventListener("online", setTrueFromEvent);
      window.removeEventListener("offline", setFalseFromEvent);
    };
  }, []);

  return isOnline;
};

export default useOnline;
