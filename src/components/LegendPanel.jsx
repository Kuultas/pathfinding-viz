import ColorPicker from "./ColorPicker.jsx";
import "../styles/pathfinding-visualizer.scss";

const LegendPanel = ({
    setColors,
    animateDijkstra,
    animateRecursiveMaze,
    reset,
    algorithm,
    maze,
}) => {
    return (
        <div className="main">
            <ColorPicker setColors={setColors}></ColorPicker>
            <button className="button" onClick={animateDijkstra}>
                {algorithm}
            </button>
            <button className="button" onClick={animateRecursiveMaze}>
                {maze}
            </button>
            <button className="button" onClick={reset}>
                reset
            </button>
        </div>
    );
};

export default LegendPanel;
