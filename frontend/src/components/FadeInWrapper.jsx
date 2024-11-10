import React, { useEffect } from "react";

const FadeInWrapper = ({ children }) => {
  useEffect(() => {
    const element = document.getElementById("fade-in-wrapper");
    element.classList.add("fade-in");
  }, []);

  return <div id="fade-in-wrapper">{children}</div>;
};

export default FadeInWrapper;
