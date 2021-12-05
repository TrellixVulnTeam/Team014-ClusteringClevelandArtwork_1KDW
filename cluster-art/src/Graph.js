import * as d3 from 'd3'
import React, { Component } from 'react'

import data from './data.csv';
import {symbol, symbolCross} from "d3-shape";
//import './Graph.css'

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svg_width: 1400,
      svg_height: 1000,
      graph_width: 600,
      graph_height: 400,
      num_clusters: 3,
    }

    this.drawChart = this.drawChart.bind(this);
    this.drawNodes = this.drawNodes.bind(this);
  }

  componentDidMount() {
    this.drawChart();
    this.drawNodes();
  }

  drawChart() {
    const svg = d3.select(this.refs.space)
                .attr('width', this.state.svg_width)
                .attr('height', this.state.svg_height)
                .style('padding', '10px')
                .style('background', 'pink')
                .style('cursor', 'pointer')
                .style('-webkit-user-select', 'none')
                .style('-khtml-user-select', 'none')
                .style('-moz-user-select', 'none')
                .style('-ms-user-select', 'none')
                .style("margin", "auto")
                .style("display", "block");

    var trans_width = (this.state.svg_width - this.state.graph_width - 30)/2;
    var trans_height = (this.state.svg_height - this.state.graph_height - 30)/2;

    console.log(trans_width);

    const rect = svg.append("rect")
                    .attr('width', this.state.graph_width + 30)
                    .attr('height', this.state.graph_height + 30)
                    .attr("fill", "white")
                    .style('padding', '10px')
                    .attr("transform", "translate(" + trans_width + "," + trans_height +")");
  }

  drawNodes() {
    var self = this;
    var d = d3.csv(data, function(d) {
      return {
        x: +d.x * self.state.graph_width,
        y: +d.y * self.state.graph_height,
        text: d.text.toString(),
        cluster_id: +d.clusterid
      }
    }).then(dt => {
      console.log(dt)
      var trans_width = (self.state.svg_width - self.state.graph_width - 30)/2;
      var trans_height = (self.state.svg_height - self.state.graph_height - 30)/2;

      console.log(trans_width)

      var myColor = d3.scaleSequential().domain([1, self.state.num_clusters]).range(d3.schemeSet1);

      var div = d3.select(this.refs.space).append('g');

      var divHover = d3.select(this.refs.space).append('g');

      var textbox = divHover.append('rect')
        .attr('x', '0')
        .attr('y', '0')
        .attr('width', 90)
        .attr('height', 70)
        .attr('fill', '#e28743')
        .attr('stroke', '#e28743')
        .style("opacity", 0);

      var text = divHover.append('text')
        .attr('dy', 35)
        .attr('dx', 10)
        .attr('padding', 10)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "start")
        .attr("fill", "pink")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("opacity", 0);

      var div2 = d3.select(this.refs.space).append("g")

      var boxClick = div2.append('rect')
        .attr('x', '0')
        .attr('y', '0')
        .attr('width', 100)
        .attr('height', 100)
        .attr('fill', '#e28743')
        .style("opacity", 0);

      var boxText = div2.append('text')
        .attr('dy', 35)
        .attr('dx', 10)
        .attr('padding', 10)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "start")
        .attr("fill", "pink")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("opacity", 0);

      var close = div2.append('path')
        .attr('d', d3.symbol().type(d3.symbolCross).size(60))
        .attr('stroke', 'gray')
        .attr('fill', 'gray')
        .on("click", function() {
          div2.attr("opacity", "0")
        });

      div.selectAll('circle')
          .data(dt)
          .enter()
          .append('circle')
          .attr('class',  function(d) { return d.text; })
          .attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; })
          .attr('fill', function(d){return myColor(d.cluster_id)})
          .attr("transform", "translate(" + trans_width + "," + trans_height +")")
          .attr('r', 5)
          .on("mouseover", function(d){
            divHover.attr("transform", "translate(" + (this.__data__.x + trans_width + 10) 
              + "," + (this.__data__.y + trans_height + 10) +")")
            .attr("opacity", 1);
            text.style("opacity", 1)
            .text(d['target'].__data__.text)
            .transition()
            .duration('10');

            var text_width = text.node().getBBox().width + 20;

            textbox.style("opacity", 1)
            .attr("width", function(d) {return text_width;})
            .attr('height', 70)
            .transition()
            .duration('10');
          })
          .on("mouseout", function(d) {
            divHover.attr("opacity", 0);

            textbox.transition()
               .duration('10')
               .attr('width', 0)
               .attr('height', 0);

            text.transition()
               .duration('10')
               .text(d['target'].__data__.text);
          })
          .on("click", function(d) {
            div2.attr("transform", "translate(" + (self.state.svg_width - trans_width + 10) 
              + "," + (trans_height) +")")
            .attr("opacity", 1);

            var close_width = text.node().getBBox().width + 10;
            var text_width = text.node().getBBox().width + 20;

            boxText.style("opacity", 1)
            .text(d['target'].__data__.text)
            .transition()
            .duration('10');

            boxClick.style("opacity", 1)
            .attr("width", function(d) {return text_width;})
            .attr('height', 70)
            .transition()
            .duration('10');

            close.attr("transform", "translate(" + close_width + ", 10) rotate(45)");
          })
      });
    
  }

  render() {

    return (
      <div ref='overall'>
        <body style={{"background-color": "red"}} />
        <svg ref='space'>
        </svg>
      </div>
    );
  }
};

export default Graph;