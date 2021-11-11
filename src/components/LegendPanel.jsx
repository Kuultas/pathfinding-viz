import ColorPicker from './ColorPicker.jsx';
import styled from 'styled-components';

const Main = styled.div`
    width: 100vw;
    height: max-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: #50505045;
    margin: 0;
    padding: 10px 0 10px 0;
`;

const Button = styled.button`
    padding: 12px;
    border: none;
    background-color: #4d4d4d;
    border-radius: 5px;
    margin-left: 5px;
    cursor: pointer;

    &:hover {
        background-color: #555555;
    }
`;

const LegendPanel = ({
    setColors,
    animateDijkstra,
    animateRecursiveMaze,
    reset,
    algorithm,
    maze,
}) => {
    return (
        <Main>
            <ColorPicker setColors={setColors}></ColorPicker>
            <Button onClick={animateDijkstra}>{algorithm}</Button>
            <Button onClick={animateRecursiveMaze}>{maze}</Button>
            <Button onClick={reset}>reset</Button>
        </Main>
    );
};

export default LegendPanel;
