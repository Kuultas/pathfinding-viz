import styled from 'styled-components';

const Cell = styled.div.attrs((props) => ({
    style: {
        backgroundColor:
            props.colors[
                props.isStart
                    ? 'start'
                    : props.isEnd
                    ? 'end'
                    : props.isWall
                    ? 'wall'
                    : props.isPath
                    ? 'path'
                    : props.isVisited
                    ? 'visited'
                    : 'empty'
            ],
    },
}))`
    color: #ffffff;
    border: 1px solid #303030;
    font-size: calc(max(5px, 0.7vh));
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
`;

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
    return (
        <Cell
            id={`${col}-${row}`}
            colors={colors}
            isStart={isSource}
            isEnd={isTarget}
            isWall={isWall}
            isVisited={isVisited}
            isPath={isPath}
            onMouseDown={() => onMouseDown(col, row)}
            onMouseEnter={() => onMouseEnter(col, row)}
            onMouseUp={() => onMouseUp()}
        >
            {isSource
                ? 'S'
                : isTarget
                ? 'T'
                : isWall
                ? 'W'
                : isPath
                ? 'P'
                : isVisited
                ? 'V'
                : ''}
        </Cell>
    );
};

export default Node;
