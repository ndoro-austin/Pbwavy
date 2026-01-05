import React, { createContext, useContext, useState } from "react";

const PreloaderContext = createContext();

export const usePreloader = () => useContext(PreloaderContext);

export const PreloaderProvider = ({ children }) => {
  const [hasShownPreloader, setHasShownPreloader] = useState(false);

  return (
    <PreloaderContext.Provider
      value={{ hasShownPreloader, setHasShownPreloader }}
    >
      {children}
    </PreloaderContext.Provider>
  );
};
