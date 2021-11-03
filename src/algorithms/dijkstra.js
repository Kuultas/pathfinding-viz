export const dijkstra = (grid) => {
<<<<<<< HEAD
    let unvisited = getAllNodes(grid);
    unvisited.map((node) => (node.isVisited = false));
    sortByDistance(unvisited);
    let currentNode = unvisited.shift();
    let visitedNodesInOrder = [];

    while (!!unvisited.length) {
        let unvisitedNeighbours = getUnvisitedNeighbours(currentNode, grid);

        if (currentNode.distance === Infinity) return visitedNodesInOrder;

        if (currentNode.isTarget) {
            visitedNodesInOrder.push(currentNode);
            return visitedNodesInOrder;
        }

        // update neighbours
        for (const node of unvisitedNeighbours) {
            if (node.isWall) continue;
            let tentativeDistance = currentNode.distance + 1;
            if (node.distance > tentativeDistance) {
                node.distance = tentativeDistance;
            }
            node.previousNode = currentNode;
        }

        // sort unvisited by distance and move to closest
        sortByDistance(unvisited);
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
        currentNode = unvisited.shift();
    }

    return visitedNodesInOrder;
};

const getUnvisitedNeighbours = (node, grid) => {
    let neighbours = [];
    if (node.col > 0) neighbours.push(grid[node.row][node.col - 1]);
    if (node.col < grid[0].length - 1)
        neighbours.push(grid[node.row][node.col + 1]);
    if (node.row > 0) neighbours.push(grid[node.row - 1][node.col]);
    if (node.row < grid.length - 1)
        neighbours.push(grid[node.row + 1][node.col]);

    return neighbours.filter((node) => !node.isVisited);
};

const sortByDistance = (nodes) => {
    nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const getAllNodes = (grid) => {
    let nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
};

export const getPath = (visitedNodes) => {
    if (!visitedNodes[visitedNodes.length - 1].isTarget) return [];

    let pathNodes = [];
    let currentNode = visitedNodes.pop();
    while (!!currentNode) {
        if (!currentNode.isSource) pathNodes.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return pathNodes;
=======
  let unvisited = getAllNodes(grid);
  unvisited.map((node) => (node.isVisited = false));
  sortByDistance(unvisited);
  let currentNode = unvisited.shift();
  let visitedNodesInOrder = [];

  while (!!unvisited.length) {
    let unvisitedNeighbours = getUnvisitedNeighbours(currentNode, grid);

    if (currentNode.distance === Infinity) return visitedNodesInOrder;

    if (currentNode.isTarget) {
      visitedNodesInOrder.push(currentNode);
      return visitedNodesInOrder;
    }

    // update neighbours
    for (const node of unvisitedNeighbours) {
      if (node.isWall) continue;
      let tentativeDistance = currentNode.distance + 1;
      if (node.distance > tentativeDistance) {
        node.distance = tentativeDistance;
      }
      node.previousNode = currentNode;
    }

    // sort unvisited by distance and move to closest
    sortByDistance(unvisited);
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    currentNode = unvisited.shift();
  }

  return visitedNodesInOrder;
};

const getUnvisitedNeighbours = (node, grid) => {
  let neighbours = [];
  if (node.col > 0) neighbours.push(grid[node.row][node.col - 1]);
  if (node.col < grid[0].length - 1)
    neighbours.push(grid[node.row][node.col + 1]);
  if (node.row > 0) neighbours.push(grid[node.row - 1][node.col]);
  if (node.row < grid.length - 1) neighbours.push(grid[node.row + 1][node.col]);

  return neighbours.filter((node) => !node.isVisited);
};

const sortByDistance = (nodes) => {
  nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const getAllNodes = (grid) => {
  let nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

export const getPath = (visitedNodes) => {
  if (!visitedNodes[visitedNodes.length - 1].isTarget) return [];

  let pathNodes = [];
  let currentNode = visitedNodes.pop();
  while (!!currentNode) {
    if (!currentNode.isSource) pathNodes.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return pathNodes;
>>>>>>> dev
};
