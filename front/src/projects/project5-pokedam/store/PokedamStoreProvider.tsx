import React, { createContext, useContext, useMemo } from "react";
import PokedamStore from "./PokedamStore";

const PokedamContext = createContext<PokedamStore | null>(null);

export const PokedamStoreProvider = ({ children }: { children: React.ReactElement }) => {
  const store = useMemo(() => {
    return new PokedamStore();
  }, []);

  return <PokedamContext.Provider value={store}> {children} </PokedamContext.Provider>;
};

export const usePokedamStore = () => {
  const context = useContext(PokedamContext);
  if (context === null) {
    throw Error("provider is null");
  }
  return context;
};
