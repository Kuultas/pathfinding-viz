import { useState, useContext } from 'react';
import { isMobile } from 'react-device-detect';
import Grid from './Grid';
import styled from 'styled-components';
import OptionsPanel from './OptionsPanel';
import { ConfigContext } from '../contexts/ConfigContext';
import ColorPicker from './ColorPicker';

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PathfindingVisualizer = () => {
    const ctx = useContext(ConfigContext);
    const { config } = ctx;

    return (
        <Container className='appContainer'>
            <OptionsPanel></OptionsPanel>
            <Grid
                cols={config.gridSize.cols}
                rows={config.gridSize.rows}
            ></Grid>
        </Container>
    );
};

export default PathfindingVisualizer;
