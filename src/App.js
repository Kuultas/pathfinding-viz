import styled from "styled-components";
import PathfindingVisualizer from "./components/PathfindingVisualizer";

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
        <h1>grid</h1>
        <PathfindingVisualizer></PathfindingVisualizer>
      </PageWrapper>
    </PageContainer>
  );
}

export default App;
