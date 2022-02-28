import React, { Component } from "react";
import "./node.css";

class Node extends Component {
    state = {
        // row: this.props.row,
        // col: this.props.col,
        // isStart: this.props.isStart,
        // isFinish: this.props.isFinish,
        // isWall: this.props.isWall,
        // isVisited: this.props.isVisited,
        nodeClass: "",
    };



    nodeClick = () => {
        let nc;
        if(this.props.startSet === false){
            nc = "start";
            this.setState({nodeClass: nc});
        }else if(this.props.finishSet === false && !this.props.isStart){
            nc = "finish";
            this.setState({nodeClass: nc});
        }else if(!this.props.isStart && !this.props.isFinish){
            nc = "wall";
            this.setState({nodeClass: nc});
        }
        this.props.onMouseDown(this.props.row, this.props.col, nc);
        //this.props.onMouseEnter(this.props.row, this.props.col, nc);

    };

    nodeHold = () => {
        if(this.props.mouseisDown){
            let nc;
            if(this.props.startSet === false){
                nc = "start";
                this.setState({nodeClass: nc});
            }else if(this.props.finishSet === false && !this.props.isStart){
                nc = "finish";
                this.setState({nodeClass: nc});
            }else if(!this.props.isStart && !this.props.isFinish){
                nc = "wall";
                this.setState({nodeClass: nc});
            }
            
            this.props.onMouseEnter(this.props.row, this.props.col, nc);
        }
    };

    



    render() {
        const visitedClass = this.props.isVisitedAnimate ? 'visited' : '';
        const pathClass = this.props.pathAnimate ? 'path' : '';
        const nc = this.props.isWall ? 'wall' : '';
        //console.log(this.props.isVisited);
        return (
            <div>
                <div
                    className={`node ${this.state.nodeClass} ${nc} ${visitedClass} ${pathClass}`}
                    id={`row-${this.props.row} col-${this.props.col}`}
                    onMouseDown={this.nodeClick}
                    onMouseEnter={this.nodeHold}
                    onMouseUp={() => this.props.onMouseUp()}
                ></div>
            </div>
        );
    }
}

export default Node;
