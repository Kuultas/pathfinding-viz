import { useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import { ConfigContext } from "../contexts/ConfigContext";

const Cell = styled.div`
  width: 50px;
  height: 50px;
  background-color: #535353;
  border: 1px solid lightcoral;
  font-size: 10px;
  display: flex;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    css`
      background-color: #327272;
    `}

  ${(props) =>
    props.startNode &&
    css`
      background-color: #00a35f;
    `}

    ${(props) =>
    props.endNode &&
    css`
      background-color: #a32100;
    `}
`;

const Node = ({ coords }) => {
  const [isTarget, setIsTarget] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const { config, setConfig } = useContext(ConfigContext);

  useEffect(() => {
    if (
      coords[0] === config.startNode[0] &&
      coords[1] === config.startNode[1]
    ) {
      setIsStart(true);
    }

    if (coords[0] === config.endNode[0] && coords[1] === config.endNode[1]) {
      setIsEnd(true);
    }
  }, [coords, config.startNode, config.endNode]);

  const handleClick = (e) => {
    setIsTarget(!isTarget);
    setConfig({
      ...config,
      currentNode: [coords[0], coords[1]],
    });
  };

  return (
    <Cell
      onClick={handleClick}
      selected={isTarget}
      startNode={isStart}
      endNode={isEnd}
    >
      {`${coords[0]},${coords[1]}`}
    </Cell>
  );
};

export default Node;
