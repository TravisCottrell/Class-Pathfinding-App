import React, { Component } from "react";
import "./navbar.css";

class Navbar extends Component {



    render() {
        const {onSubmit} = this.props;
        return (
            <nav className="navbar">
                <div className="navmenu">
                    
                        <form name="paths" onSubmit={() => onSubmit()}>
                            <input type="submit" value="start" className="button-start"/>
                            <select className="nav-items">
                                <option value="">path finding</option>
                                <option value="dijkstra">dijkstra</option>
                                <option value="astar">A Star</option>
                            </select>
                        </form>
                    
                    
                        <form name="mazes">
                            <select className="nav-items">
                                <option value="">maze generation</option>
                                <option value="randomMaze">random maze</option>
                                <option value="recursiveDivision">recursive division</option>
                            </select>
                        </form>
                    
                </div>
            </nav>
        );
        
    }
}

export default Navbar;