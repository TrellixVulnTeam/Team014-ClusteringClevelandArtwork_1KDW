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
    	<div
    	 style={{
	        backgroundColor: '#ebdfbc',
	      }}
	    >	
	    	<h1 style={{
	    		"padding" : "10px"
	    	}}>Clustering Kmeans</h1>

	    	<br />

	    	<body style={{"max-width" : "72%", "padding" : "10px", backgroundColor: '#ebdfbc'}}>
		    	<p> 
		    		The Cleveland Museum of Art (CMA) is a Creative Commons Open Access institute,
					providing online and free access to its collection sporting more than 30,000 works of
					public-domain art. With this artwork data, CMA has implemented a public API with configurable
					endpoints and queries for performing network requests to get artworks, artists, or CMA exhibits
					by customizable parameters. 
				</p>

				 <ul>
				  <li>Select number of wanted artworks (2-30000) (Note that if you select value values, 
				  	view individual notes might be difficult)</li>
				  <li>Select max number of wanted clusters (2-30) (Choose a cluster that makes sense for your 
				  number of artworks!)</li>
				  <li>Select what attributes you want to cluster (2 or more)</li>
				</ul> 
				<h4>Kmeans Cluster Graph</h4>
			</body>
	    	<KMeans />
	    	<Graph />
    	</div>
    );
  }
};

export default App;