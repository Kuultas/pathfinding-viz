import React, { useContext, useState } from 'react';
import { isMobile } from 'react-device-detect';

export const ConfigContext = React.createContext();

export const useConfig = () => {
    return useContext(ConfigContext);
};

export const ConfigProvider = ({ children }) => {
    const [dimensions] = useState(
        isMobile ? { cols: 5, rows: 5 } : { cols: 10, rows: 10 }
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

    const [config, setConfig] = useState({
        dimensions,
        maze,
        algorithm,
        colors,
    });

    return (
        <ConfigContext.Provider value={{ config, setConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};
