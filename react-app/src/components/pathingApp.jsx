import React, { Component } from "react";
import Node from "./node/node.jsx";
import "./navbar/navbar.css";
//import Navbar from "./navbar/navbar.jsx";

//pathing algorithms
import { dijkstra, getShortestPath } from "../algorithms/pathFinding/dijkstra.js";
import { AStar } from "../algorithms/pathFinding/AStar";

//maze algorithms
import { randomMaze } from "../algorithms/mazeGen/randomMaze";
import { recursiveDivision, getOrientation } from "../algorithms/mazeGen/recursiveDivision";


const gridWidth = 50;
const gridHeight = 30;

class Pathing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            startSet: false,
            startNode: null,
            finishSet: false,
            finishNode: null,
            mouseisDown: false
        };
        
        //this.handleMazeGen = this.handleMazeGen.bind(this);
        //this.handlePathFinding = this.handlePathFinding.bind(this);
    }

    componentDidMount() {
        //build the initial grid with default parameters 
        const grid = [];
        for (let row = 0; row < gridWidth; row++) {
            const currentrow = [];
            for (let col = 0; col < gridHeight; col++) {
                currentrow.push(this.createNode(row, col));
            }
            grid.push(currentrow);
        }
        this.setState({ grid });
    }

    createNode(col, row) {
        return {
            col,
            row,
            distance: Infinity,
            prevNode: null,
            isStart: false,
            isFinish: false,
            isWall: false,
            isVisited: false,
            isVisitedAnimate: false,
            pathAnimate: false,
        };
    }

    handleMouseDown(row, col, nodeClass) {
        if (nodeClass === "start") {
            this.state.grid[col][row].isStart = true;
            this.setState({
                startSet: true,
                startNode: this.state.grid[col][row],
                grid: this.state.grid,
            });
        } else if (nodeClass === "finish") {
            this.state.grid[col][row].isFinish = true;
            this.setState({
                finishSet: true,
                finishNode: this.state.grid[col][row],
                grid: this.state.grid,
            });
        } else if (nodeClass === "wall") {
            this.state.grid[col][row].isWall = true;
            this.setState({
                grid: this.state.grid,
            });
        }
        this.setState({mouseisDown: true});
    }

    handleMouseEnter(row, col, nodeClass) {
        if (nodeClass === "start") {
            this.state.grid[col][row].isStart = true;
            this.setState({
                startSet: true,
                startNode: this.state.grid[col][row],
                grid: this.state.grid,
            });
        } else if (nodeClass === "finish") {
            this.state.grid[col][row].isFinish = true;
            this.setState({
                finishSet: true,
                finishNode: this.state.grid[col][row],
                grid: this.state.grid,
            });
        } else if (nodeClass === "wall") {
            this.state.grid[col][row].isWall = true;
            this.setState({
                grid: this.state.grid,
            });
        }
    }

    handleMouseUp(){
        this.setState({mouseisDown: false});
    }

        //for the maze generation dopdown
        handleMazeGen = (event) =>{
            switch(event.target.value){
                case 'randomMaze':
                    randomMaze(this.state.grid);
                break;
    
                case 'recursiveDivision':
                    const orientation = getOrientation( gridHeight, gridWidth,);
                    recursiveDivision(this.state.grid, 0, 0, gridHeight, gridWidth, orientation);  
                break;
            }
            this.setState({});
        }

    //for the path finding dopdown
    handlePathFinding = (event) =>{
        switch(event.target.value){
            case 'dijkstra':
                this.handleDijkstra();
            break;

            case 'astar':
                AStar();
            break;
        }
    }

    handleDijkstra() {
        // prettier-ignore
        const vistedNodes = dijkstra(this.state.startNode, this.state.finishNode, this.state.grid);
        const path = getShortestPath(this.state.finishNode);

        for (let i = 0; i < vistedNodes.length; i++) {
            setTimeout(() => {
                vistedNodes[i].isVisitedAnimate = true;
                this.setState({});
            }, 20 * i);

            if (i === vistedNodes.length - 1) {
                setTimeout(() => {
                    this.showPath(path);
                }, 20 * i);
            }
        }
    }

    showPath(path) {
        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                path[i].pathAnimate = true;
                this.setState({});
            }, 40 * i);
        }
    }

    render() {
        const { grid, startSet, finishSet } = this.state;
        
        
        return (
           
            <div>
                <nav className="navbar">
                    <div className="navmenu">
                        <form name="paths" >
                            {/* <input type="submit" value="start" className="button-start"/> */}
                            <select className="nav-items" value={this.state.path} onChange={this.handlePathFinding}>
                                <option value="">path finding</option>
                                <option value="dijkstra">dijkstra</option>
                                <option value="astar">A Star</option>
                            </select>
                        </form>
                        <form name="mazes">
                            <select className="nav-items" value={this.state.maze} onChange={this.handleMazeGen}>
                                <option value="">maze generation</option>
                                <option value="randomMaze">random maze</option>
                                <option value="recursiveDivision">recursive division</option>
                            </select>
                        </form>
                    </div>
                </nav>

                <div className="grid">
                    <div className="nodes">
                        {grid.map((row, rowindex) => {
                            return (
                                <div key={rowindex}>
                                    {row.map((node, nodeindex) => {
                                        const {
                                            row,
                                            col,
                                            isStart,
                                            isFinish,
                                            isWall,
                                            isVisited,
                                            isVisitedAnimate,
                                            pathAnimate,
                                        } = node;
                                        // prettier-ignore
                                        return (
                                            <Node
                                                key={nodeindex}
                                                row={row}
                                                col={col}
                                                startSet={startSet}
                                                finishSet={finishSet}
                                                isStart={isStart}
                                                isFinish={isFinish}
                                                isWall={isWall}
                                                isVisited={isVisited}
                                                isVisitedAnimate={isVisitedAnimate}
                                                pathAnimate={pathAnimate}
                                                mouseisDown={this.state.mouseisDown}
                                                onMouseDown={(row,col,nodeClass) => this.handleMouseDown(row, col, nodeClass)}
                                                onMouseEnter={(row,col,nodeClass) => this.handleMouseEnter(row, col, nodeClass)}
                                                onMouseUp={() => this.handleMouseUp()}
                                            ></Node>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Pathing;
