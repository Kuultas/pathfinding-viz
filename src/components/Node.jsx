import styled, { css } from "styled-components";

const Cell = styled.div`
  width: 35px;
  height: 35px;
  background-color: #535353;
  border: 1px solid lightcoral;
  font-size: 10px;
  display: flex;
  cursor: pointer;
  user-select: none;

  ${(props) =>
    props.selected &&
    css`
      background-color: #327272;
    `}

  ${(props) =>
    props.isStart &&
    css`
      background-color: #00a35f;
    `}

    ${(props) =>
    props.isEnd &&
    css`
      background-color: #a32100;
    `};

  ${(props) =>
    props.isWall &&
    css`
      background-color: pink;
    `}
`;

const Node = ({ col, row, isSource, isTarget, isWall }) => {
  return (
    <Cell
      id={`${col}-${row}`}
      isStart={isSource}
      isEnd={isTarget}
      isWall={isWall}
    >
      {`${col},${row}`}
    </Cell>
  );
};

export default Node;
