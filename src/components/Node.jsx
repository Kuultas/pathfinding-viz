import styled, { css } from "styled-components";

const Cell = styled.div`
  width: 35px;
  height: 35px;
  background-color: #2e2e2e67;
  border: 1px solid #40916c;
  font-size: 10px;
  display: flex;
  cursor: pointer;
  user-select: none;

  ${(props) =>
    props.isVisited &&
    css`
      background-color: #1b4332;
    `}

  ${(props) =>
    props.isPath &&
    css`
      background-color: #d8f3dc;
    `}

  ${(props) =>
    props.isStart &&
    css`
      background-color: #52b788;
    `}

  ${(props) =>
    props.isEnd &&
    css`
      background-color: #2d6a4f;
    `};

  ${(props) =>
    props.isWall &&
    css`
      background-color: #081c15;
    `}
`;

const Node = ({ col, row, isSource, isTarget, isWall, isVisited, isPath }) => {
  return (
    <Cell
      id={`${col}-${row}`}
      isStart={isSource}
      isEnd={isTarget}
      isWall={isWall}
      isVisited={isVisited}
      isPath={isPath}
    >
      {`${col},${row}`}
    </Cell>
  );
};

export default Node;
