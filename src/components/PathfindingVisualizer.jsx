import Grid from './Grid';
import styled from 'styled-components';

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PathfindingVisualizer = () => {
    return (
        <Container className='appContainer'>
            <Grid></Grid>
        </Container>
    );
};

export default PathfindingVisualizer;
