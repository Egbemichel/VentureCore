import { createContext, useState, useContext } from "react";

// Create Context
const ZIndexContext = createContext();

// Provider Component
export const ZIndexProvider = ({ children }) => {
  const [isZIndexReduced, setIsZIndexReduced] = useState(false);

  return (
    <ZIndexContext.Provider value={{ isZIndexReduced, setIsZIndexReduced }}>
      {children}
    </ZIndexContext.Provider>
  );
};

// Custom Hook to use the Context
export const useZIndex = () => useContext(ZIndexContext);
