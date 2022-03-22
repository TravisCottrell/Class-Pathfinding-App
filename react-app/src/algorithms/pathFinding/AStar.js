
export function AStar(start, end, grid){
    let open_list = [];
    let closed_list = [];
    start.distance = 0;
    open_list.push(start);
    while(open_list){
        // sortNodes(open_list);
        // const current = open_list.pop();
        const current = getNearestNode(open_list)
        closed_list.push(current);
        if(current === undefined || current === end) return closed_list;

        let neighbors = getNeighbors(current, grid);
        for(let neighbor of neighbors){
            const temp_distance = current.distance + 1;
            if (temp_distance < neighbor.distance){
                neighbor.prevNode = current;
                neighbor.distance = temp_distance;
                neighbor.Hscore = manhattan_distance(neighbor, end);
                //neighbor.Hscore = euclidean_distance(neighbor, end);
                neighbor.Fscore = neighbor.distance + neighbor.Hscore;
                const inOpenList = open_list.some((element) => {if(element === neighbor)return true;});
                if(!inOpenList) open_list.push(neighbor);
            }
        }
    }
}



function getNeighbors(node, grid) {
    const neighbors = [];
    // prettier-ignore
    //loop to get the neighbors in the up/down/left/right positions of the current node
    for (const i of [[0, -1],[0, 1],[-1, 0],[1, 0]]) {
        const neighborPosition = [node.row + i[0], node.col + i[1]];

        // check if the neighbor node is within the grid bounds
        if(neighborPosition[0] < 0 || neighborPosition[0] > grid[0].length-1 || neighborPosition[1] < 0 || neighborPosition[1] > grid.length-1){continue};
        
        const neighbor = grid[neighborPosition[1]][neighborPosition[0]];
        if(!neighbor.isWall ) {
            neighbors.push(neighbor);
            
        }
    }
    return neighbors;
}

function manhattan_distance(node, end){
    return Math.abs((end.row - node.row)) + Math.abs((end.col - node.col));
}

function euclidean_distance(node, end){
    return Math.sqrt((end.row - node.row)**2 + (end.col - node.col)**2);
}

function getNearestNode(open_list){
    let currentNearest; 
    let index;
    for(let i = 0; i < open_list.length;i++){
        if(!currentNearest || open_list[i].Fscore < currentNearest.Fscore ){
            currentNearest = open_list[i]
            index = i;
        }else if(open_list[i].Fscore === currentNearest.Fscore ){
            if(open_list[i].Hscore < currentNearest.Hscore ){
                currentNearest = open_list[i]
                index = i;
            }
        }
    }
    open_list.splice(index, 1);
    return currentNearest;
}
//sorts the number in decending order so the lowest fscore can be popped
function sortNodes(open_list) {
    open_list.sort((a, b) => {
        //b.Fscore - a.Fscore
        if(b.Fscore < a.Fscore){
            
            return -1;
        }else if(b.Fscore === a.Fscore){
            if(b.Hscore > a.Fscore)return -1;
        }else{
            return 1;
        }
       
        // else{
        //     if(b.Hscore < a.Hscore){
            
        //         return 1;
        //     }
        // }
    });
}