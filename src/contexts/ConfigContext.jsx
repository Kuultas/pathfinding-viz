import React, { useContext, useState } from 'react';
import { isMobile } from 'react-device-detect';

export const ConfigContext = React.createContext();

export const useConfig = () => {
    return useContext(ConfigContext);
};

export const ConfigProvider = ({ children }) => {
    const [gridSize] = useState(
        isMobile ? { cols: 10, rows: 15 } : { cols: 50, rows: 30 }
    );

    const [colors] = useState({
        visited: '#8181567f',
        path: '#fad400ce',
        start: '#004bd6',
        end: '#ff1e00',
        wall: '#00945b',
    });

    const [maze] = useState('recursiveDivision');

    const [algorithm] = useState('dijkstra');

    const [speed] = useState(3);

    const [config, setConfig] = useState({
        gridSize,
        maze,
        algorithm,
        colors,
        speed,
    });

    return (
        <ConfigContext.Provider value={{ config, setConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};
