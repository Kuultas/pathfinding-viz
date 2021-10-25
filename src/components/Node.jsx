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
};

export default Node;
