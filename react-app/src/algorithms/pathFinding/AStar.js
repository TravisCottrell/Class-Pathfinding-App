export function AStar(start, end, grid){
    console.log("a*");
}

// function get_neighbors(self, grid){
//     neighbors = []
    
//     for(i in [(0, -1), (0, 1), (-1, 0), (1, 0)]) {
//         neighbor = (self.row + i[0], self.col + i[1])
//         box = grid[neighbor[0]][neighbor[1]]

//         if not box.is_wall(){
//             neighbors.append(box)
//         }
//     }
//     return neighbors
// }

function getNeighbors(node, grid) {
    // prettier-ignore
    //loop to get the neighbors in the up/down/left/right positions of the current node
    const neighbors = [];
    for (const i of [[0, -1],[0, 1],[-1, 0],[1, 0]]) {
        const neighborPosition = [node.row + i[0], node.col + i[1]];

        // check if the neighbor node is within the grid bounds
        if(neighborPosition[0] < 0 || neighborPosition[0] > grid[0].length-1 || neighborPosition[1] < 0 || neighborPosition[1] > grid.length-1){continue};
        
        const neighbor = grid[neighborPosition[1]][neighborPosition[0]];
        if(!neighbor.isWall && !neighbor.isVisited) {
            neighbor.push(neighbor); 
        }
    }
}