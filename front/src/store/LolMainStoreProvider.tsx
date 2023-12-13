import React, { createContext, useContext, useMemo } from "react";
import LolMainStore from "./LolMainStore";

const LolMainContext = createContext<LolMainStore | null>(null);

export const LolMainStoreProvider = ({ children }: { children: React.ReactElement }) => {
  const store = useMemo(() => {
    return new LolMainStore(window.innerWidth);
  }, []);

  return <LolMainContext.Provider value={store}> {children} </LolMainContext.Provider>;
};

export const useLolMainStore = () => {
  const context = useContext(LolMainContext);
  if (context === null) {
    throw Error("provider is null");
  }
  return context;
};
