import React, { createContext, useContext, useMemo } from "react";
import SortStore from "./SortStore";

const SortContext = createContext<SortStore | null>(null);

export const SortStoreProvider = ({ children }: { children: React.ReactElement }) => {
  const store = useMemo(() => {
    return new SortStore();
  }, []);

  return <SortContext.Provider value={store}> {children} </SortContext.Provider>;
};

export const useSortStore = () => {
  const context = useContext(SortContext);
  if (context === null) {
    throw Error("provider is null");
  }
  return context;
};
