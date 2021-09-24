import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const Cell = styled.div`
  width: 50px;
  height: 50px;
  background-color: #535353;
  border: 1px solid teal;
  font-size: 10px;
  display: flex;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    css`
      background-color: #edbd64;
    `}
`;

const Node = ({ x, y }) => {
  const [xCoord, setXCoord] = useState(0);
  const [yCoord, setYCoord] = useState(0);
  const [isTarget, setIsTarget] = useState(false);

  useEffect(() => {
    setXCoord(x.toString());
    setYCoord(y.toString());
  }, [x, y]);

  // const getCellById = (xCoord, yCoord) => {
  //   return document.getElementById("".concat(xCoord, ", ", yCoord));
  // };

  const handleClick = () => {
    setIsTarget(!isTarget);
  };

  return (
    <Cell
      className="gridCell"
      id={"".concat(xCoord, ", ", yCoord)}
      onClick={handleClick}
      selected={isTarget}
    >
      {"".concat(xCoord, ", ", yCoord)}
    </Cell>
  );
};

export default Node;
