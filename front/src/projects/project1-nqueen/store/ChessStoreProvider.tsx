import React, { createContext, useContext, useMemo } from "react";
import ChessStore from "./ChessStore";

const ChessContext = createContext<ChessStore | null>(null);

export const ChessStoreProvider = ({ children }: { children: React.ReactElement }) => {
  const store = useMemo(() => {
    return new ChessStore();
  }, []);

  return <ChessContext.Provider value={store}> {children} </ChessContext.Provider>;
};

export const useChessStore = () => {
  const context = useContext(ChessContext);
  if (context === null) {
    throw Error("provider is null");
  }
  return context;
};
