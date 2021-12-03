import './App.css';
import * as d3 from 'd3'
import React, { Component } from 'react'
import Graph from "./Graph.js"
import KMeans from "./d3-vis/kmeans";


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div>
	    	<Graph />
    	</div>
    );
  }
};

export default App;