import styled from 'styled-components';
import PathfindingVisualizer from './components/PathfindingVisualizer';
import { ConfigProvider } from './contexts/ConfigContext';

const PageContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    overflow-x: scroll;
`;

function App() {
    return (
        <PageContainer className='pageContainer'>
            <PageWrapper className='pageWrapper'>
                <ConfigProvider>
                    <PathfindingVisualizer></PathfindingVisualizer>
                </ConfigProvider>
            </PageWrapper>
        </PageContainer>
    );
}

export default App;
