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
    font-size: 55%;
    width: Min(2.5vw, 50px);
    display: flex;
    cursor: pointer;
    overflow: hidden;
    user-select: none;
    justify-content: center;
    align-items: center;
    aspect-ratio: inherit;
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
}) => {
    return (
        <Cell
            id={`${col}-${row}`}
            colors={colors}
            isStart={isSource}
            isEnd={isTarget}
            isWall={isWall}
            isVisited={isVisited}
            isPath={isPath}>
            {`${col}, ${row}`}
        </Cell>
    );
};

export default Node;
