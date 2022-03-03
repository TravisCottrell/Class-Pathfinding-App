import React, { Component } from "react";
import Node from "./node/node.jsx";
import "./pathingApp.css";
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
            mouseisDown: false,
            erase: false
        };
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
        this.setState({ grid: grid });
    }

    createNode(col, row) {
        return {
            col,
            row,
            distance: Infinity,
            Fscore: Infinity,
            prevNode: null,
            isStart: false,
            isFinish: false,
            isWall: false,
            isVisited: false,
            pathAnimate: false,
        };
    }

    handleMouseDown(row, col) {
        let currentNode = this.state.grid[col][row];
        if(this.state.erase){
            if (currentNode.isStart) {
                this.state.grid[col][row].isStart = false;
                this.setState({
                    startSet: false,
                    startNode: null,
                    grid: this.state.grid,
                });
            } else if (currentNode.isFinish) {
                this.state.grid[col][row].isFinish = false;
                this.setState({
                    finishSet: false,
                    finishNode: null,
                    grid: this.state.grid,
                });
            } else if (currentNode.isWall) {
                this.state.grid[col][row].isWall = false;
                this.setState({
                    grid: this.state.grid,
                });
            }

        }else{
            if (!this.state.startSet) {
                this.state.grid[col][row].isStart = true;
                this.setState({
                    startSet: true,
                    startNode: this.state.grid[col][row],
                    grid: this.state.grid,
                });
            } else if (!this.state.finishSet && !currentNode.isStart) {
                this.state.grid[col][row].isFinish = true;
                this.setState({
                    finishSet: true,
                    finishNode: this.state.grid[col][row],
                    grid: this.state.grid,
                });
            } else if (!currentNode.isStart && !currentNode.isFinish) {
                this.state.grid[col][row].isWall = true;
                this.setState({
                    grid: this.state.grid,
                });
            }
        }
        this.setState({mouseisDown: true});
    }

    handleMouseEnter(row, col) {
        if(this.state.mouseisDown){
            let currentNode = this.state.grid[col][row];
            if(this.state.erase){
                if (currentNode.isStart) {
                    this.state.grid[col][row].isStart = false;
                    this.setState({
                        startSet: false,
                        startNode: null,
                        grid: this.state.grid,
                    });
                } else if (currentNode.isFinish) {
                    this.state.grid[col][row].isFinish = false;
                    this.setState({
                        finishSet: false,
                        finishNode: null,
                        grid: this.state.grid,
                    });
                } else if (currentNode.isWall) {
                    this.state.grid[col][row].isWall = false;
                    this.setState({
                        grid: this.state.grid,
                    });
                }
            }else{
                if (!this.state.startSet) {
                    this.state.grid[col][row].isStart = true;
                    this.setState({
                        startSet: true,
                        startNode: this.state.grid[col][row],
                        grid: this.state.grid,
                    });
                } else if (!this.state.finishSet && !currentNode.isStart) {
                    this.state.grid[col][row].isFinish = true;
                    this.setState({
                        finishSet: true,
                        finishNode: this.state.grid[col][row],
                        grid: this.state.grid,
                    });
                } else if (!currentNode.isStart && !currentNode.isFinish) {
                    this.state.grid[col][row].isWall = true;
                    this.setState({
                        grid: this.state.grid,
                    });
                }
            }
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
        let vistedNodes;
        let path;
        switch(event.target.value){
            case 'dijkstra':
                vistedNodes = dijkstra(this.state.startNode, this.state.finishNode, this.state.grid);
                path = getShortestPath(this.state.finishNode);
            break;

            case 'astar':
                vistedNodes = AStar(this.state.startNode, this.state.finishNode, this.state.grid);
                path = getShortestPath(this.state.finishNode);
            break;
        }
        this.handleAnimate(vistedNodes, path)
    }

    handleAnimate(vistedNodes, path){
        for (let i = 0; i < vistedNodes.length; i++) {
            setTimeout(() => {
                vistedNodes[i].isVisited = true;
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

    handleErase = (event) =>{
        this.setState({erase: !this.state.erase});
    }

    resetPaths = () => {
        let newgrid = this.state.grid;
        for (let row = 0; row < gridWidth; row++) {
            for (let col = 0; col < gridHeight; col++) {
                newgrid[row][col].distance = Infinity;
                newgrid[row][col].Fscore = Infinity;
                newgrid[row][col].prevNode = null;
                newgrid[row][col].isVisited = false;
                newgrid[row][col].pathAnimate = false;
            }
        }
        this.setState({ grid: newgrid });
    }

    render() {
        const { grid, startSet, finishSet } = this.state;
        return (
            <div>

                <nav className="navbar">
                    
                    <div className="navmenu">
                        <form name="paths" >
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
                    <button className="button-start" onClick={this.resetPaths}>Reset algorithm</button>
                </nav>

               
                    
                    <label className="switch">
                        <p>erase</p>
                        <input onChange={this.handleErase} type="checkbox"></input>
                        <span className="slider round"></span>
                        
                    </label>
                    
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
                                            isOpen,
                                            isVisited,
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
                                                isOpen={isOpen}
                                                isVisited={isVisited}
                                                pathAnimate={pathAnimate}
                                                mouseisDown={this.state.mouseisDown}
                                                erase={this.state.erase}
                                                onMouseDown={(row,col) => this.handleMouseDown(row, col )}
                                                onMouseEnter={(row,col) => this.handleMouseEnter(row, col)}
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