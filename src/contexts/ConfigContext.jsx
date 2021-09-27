import React, { useContext, useState } from "react";

export const ConfigContext = React.createContext();

export const useConfig = () => {
  return useContext(ConfigContext);
};

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({
    rows: 5,
    cols: 5,
    alg: "dijkstra",
    startNode: [],
    currentNode: [],
    endNode: [],
    wallNodes: [],
  });

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
