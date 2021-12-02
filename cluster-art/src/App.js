import './App.css';
import * as d3 from 'd3'
import React, { Component } from 'react'
import Graph from "./Graph.js"

import data from './data.csv';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Graph />
    );
  }
};

export default App;