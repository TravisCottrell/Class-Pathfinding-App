import React, { Component } from "react";
import "./node.css";

class Node extends Component {

    render() {
        const visitedClass = this.props.isVisited ? 'visited' : '';
        const pathClass = this.props.pathAnimate ? 'path' : '';
        const wallClass = this.props.isWall ? 'wall' : '';
        const openClass = this.props.isOpen ? 'open' : '';
        const startClass = this.props.isStart ? 'start' : '';
        const finishClass = this.props.isFinish ? 'finish' : '';

        return (
            <div>
                <div
                    className={`node ${startClass} ${finishClass} ${wallClass} ${visitedClass} ${pathClass} ${openClass}`}
                    id={`row-${this.props.row} col-${this.props.col}`}
                    onMouseDown={() => this.props.onMouseDown(this.props.row, this.props.col)}
                    onMouseEnter={() => this.props.onMouseEnter(this.props.row, this.props.col)}
                    onMouseUp={() => this.props.onMouseUp()}
                ></div>
            </div>
        );
    }
}

export default Node;
