<<<<<<< HEAD
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
=======
import styled, { css } from "styled-components";

const Cell = styled.div`
  color: #ffffff;
  width: auto;
  height: 1.55vw;
  border: 2px solid #6b6b6b;
  font-size: 0.4vw;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  justify-content: center;
  align-items: center;
  aspect-ratio: inherit;

  ${(props) =>
    props.isVisited &&
    css`
      background-color: #8181567f;
    `}

  ${(props) =>
    props.isPath &&
    css`
      background-color: #fad400ce;
    `}

  ${(props) =>
    props.isStart &&
    css`
      background-color: #004bd6;
    `}

  ${(props) =>
    props.isEnd &&
    css`
      background-color: #ff1e00;
    `};

  ${(props) =>
    props.isWall &&
    css`
      background-color: #00945b;
    `}
`;

const Node = ({ col, row, isSource, isTarget, isWall, isVisited, isPath }) => {
  return (
    <Cell
      // className={
      //   "grid-cell" +
      //   (isSource ? " isSource" : "") +
      //   (isTarget ? " isTarget" : "") +
      //   (isWall ? " isWall" : "") +
      //   (isVisited ? " isVisited" : "") +
      //   (isPath ? " isPath" : "")
      // }
      id={`${col}-${row}`}
      isStart={isSource}
      isEnd={isTarget}
      isWall={isWall}
      isVisited={isVisited}
      isPath={isPath}
    >
      {`${col}, ${row}`}
    </Cell>
  );
>>>>>>> dev
};

export default Node;
