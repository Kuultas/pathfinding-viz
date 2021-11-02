<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
=======
import styled from 'styled-components';
import OptionsPanel from './components/OptionsPanel';
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
    align-items: center;
`;

function App() {
    return (
        <PageContainer>
            <PageWrapper>
                <ConfigProvider>
                    <OptionsPanel></OptionsPanel>
                    <PathfindingVisualizer></PathfindingVisualizer>
                </ConfigProvider>
            </PageWrapper>
        </PageContainer>
    );
>>>>>>> Stashed changes
}

export default App;
