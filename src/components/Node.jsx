import { useState } from "react";
import styled, { css } from "styled-components";

const Cell = styled.div`
  width: 50px;
  height: 50px;
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

const Node = ({ x, y, isStart, isEnd, isWall }) => {
  return (
    <Cell id={`${x}-${y}`} isStart={isStart} isEnd={isEnd} isWall={isWall}>
      {`${x},${y}`}
    </Cell>
  );
};

export default Node;
