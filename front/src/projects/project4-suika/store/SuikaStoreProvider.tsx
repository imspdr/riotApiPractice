import React, { createContext, useContext, useMemo } from "react";
import SuikaStore from "./SuikaStore";

const SuikaContext = createContext<SuikaStore | null>(null);

export const SuikaStoreProvider = ({ children }: { children: React.ReactElement }) => {
  const store = useMemo(() => {
    return new SuikaStore();
  }, []);

  return <SuikaContext.Provider value={store}> {children} </SuikaContext.Provider>;
};

export const useSuikaStore = () => {
  const context = useContext(SuikaContext);
  if (context === null) {
    throw Error("provider is null");
  }
  return context;
};
