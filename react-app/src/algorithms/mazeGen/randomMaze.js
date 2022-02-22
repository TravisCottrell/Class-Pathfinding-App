

export function randomMaze(grid){
    setNodesAsWalls(grid);
    const startNode = grid[0][0];
    const visited = [];
    const stack = [];
    stack.push(startNode);
    //console.log(visited);

    
    for(let i = 0; i < 800; i++){
        const currentNode = stack.pop();
        //console.log('currentNode', currentNode);
        visited.push(currentNode);
        const neighbors = getNeighbors(currentNode, grid, visited);
        for (let i = neighbors.length; i > 0; i--){
            let temp = Math.floor(Math.random() * i);
            temp = neighbors.splice(temp,1)
            stack.push(temp[0]);
        }
        currentNode.isWall = false;
    }

}

function getNeighbors(node, grid, visited) {
    // prettier-ignore
    const neighbors = [];
    for (const i of [[0, -1],[0, 1],[-1, 0],[1, 0]]) {
        //console.log('nei node',node);
        const temp = [node.row + i[0], node.col + i[1]];
        // check if the neighbor node is within the grid bounds
        if(temp[0] < 0 || temp[0] > 29 || temp[1] < 0 || temp[1] > 49){continue};
        const neighbor = grid[temp[1]][temp[0]];
        if(!visited.includes(neighbor) && neighbor.isWall) {
            neighbors.push(neighbor);
        }
    }
    return neighbors;
}

//presets the whole grid as walls
function setNodesAsWalls(grid){
    grid.forEach(row => { 
        row.forEach(node => {
            node.isWall = true
        });
    });

}