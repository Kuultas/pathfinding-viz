import styled from "styled-components";
import PathfindingVisualizer from "./components/PathfindingVisualizer";
import { ConfigProvider } from "./contexts/ConfigContext";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
  return (
    <PageContainer id="pageContainer">
      <PageWrapper id="pageWrapper">
        <ConfigProvider>
          <PathfindingVisualizer></PathfindingVisualizer>
        </ConfigProvider>
      </PageWrapper>
    </PageContainer>
  );
}

export default App;
