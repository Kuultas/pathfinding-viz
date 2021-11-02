import { useState, useContext } from 'react';
import { isMobile } from 'react-device-detect';
import Grid from './Grid';
import styled from 'styled-components';
import OptionsPanel from './OptionsPanel';
import { ConfigContext } from '../contexts/ConfigContext';

const PageTitle = styled.h1`
    margin-bottom: 0;
    width: max-content;
    text-align: center;
    font-size: 26px;
`;

const PathfindingVisualizer = () => {
    const ctx = useContext(ConfigContext);

    return (
        <>
            <PageTitle>pathfinding visualizer</PageTitle>
            <Grid
                cols={ctx.config.dimensions.cols}
                rows={ctx.config.dimensions.rows}
                nodeSize={ctx.config.nodeSize}></Grid>
        </>
    );
};

export default PathfindingVisualizer;
