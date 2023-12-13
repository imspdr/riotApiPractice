import React, { createContext, useContext, useMemo } from "react";
import MainStore from "./MainStore";

const MainContext = createContext<MainStore | null>(null);

export const MainStoreProvider = ({ children }: { children: React.ReactElement }) => {
  const store = useMemo(() => {
    return new MainStore(window.innerWidth, window.innerHeight);
  }, []);

  return <MainContext.Provider value={store}> {children} </MainContext.Provider>;
};

export const useMainStore = () => {
  const context = useContext(MainContext);
  if (context === null) {
    throw Error("provider is null");
  }
  return context;
};
