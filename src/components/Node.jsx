import "../styles/pathfinding-visualizer.scss";

const Node = ({
    col,
    row,
    isSource,
    isTarget,
    isWall,
    isVisited,
    isPath,
    colors,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
}) => {
    const cellClasses = [
        "cell",
        isSource ? "start" : "",
        isTarget ? "end" : "",
        isWall ? "wall" : "",
        isPath ? "path" : "",
        isVisited ? "visited" : "",
    ].join(" ");

    return (
        <div
            id={`${col}-${row}`}
            className={cellClasses}
            style={{
                backgroundColor:
                    colors[
                        isSource
                            ? "start"
                            : isTarget
                            ? "end"
                            : isWall
                            ? "wall"
                            : isPath
                            ? "path"
                            : isVisited
                            ? "visited"
                            : "empty"
                    ],
            }}
            onMouseDown={() => onMouseDown(col, row)}
            onMouseEnter={() => onMouseEnter(col, row)}
            onMouseUp={() => onMouseUp()}
        >
            {isSource
                ? "S"
                : isTarget
                ? "T"
                : isWall
                ? "W"
                : isPath
                ? "P"
                : isVisited
                ? "V"
                : ""}
        </div>
    );
};

export default Node;
