import * as d3 from 'd3'
import React, { Component } from 'react'

import data from './data.csv';
//import './Graph.css'

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svg_width: 900,
      svg_height: 700,
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
                .style('background', '#223344')
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
                    .attr("fill", "gold")
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
      var div = d3.select(this.refs.space).append('g');

      var textbox = d3.select(this.refs.space).append('rect')
        .attr('x', '0')
        .attr('y', '0')
        .attr('width', 90)
        .attr('height', 70)
        .attr('fill', '#e28743')
        .attr('stroke', '#e28743')
        .style("opacity", 0);

      var text = d3.select(this.refs.space).append('text')
        .attr('dy', 35)
        .attr('dx', 10)
        .attr('padding', 10)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "start")
        .attr("fill", "pink")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("opacity", 0);

      div.selectAll('circle')
          .data(dt)
          .enter()
          .append('circle')
          .attr('class',  function(d) { return d.text; })
          .attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; })
          .attr('fill', function() { return 'teal'; })
          .attr("transform", "translate(" + trans_width + "," + trans_height +")")
          .attr('r', 5)
          .on("mouseover", function(d){
            text.style("opacity", 1)
            .text(d['target'].__data__.text)
            .attr('x', d.x  + 10)
            .attr('y', d.y + 10)
            .transition()
            .duration('10');

            var text_width = text.node().getBBox().width + 20;

            textbox.style("opacity", 1)
            .attr("width", function(d) {return text_width;})
            .attr('x', d.x + 10)
            .attr('y', d.y + 10)
            .transition()
            .duration('10');
          })
          .on("mouseout", function(d){
            textbox.transition()
               .duration('10')
               .style("opacity", 0);
            text.transition()
               .duration('10')
               .style("opacity", 0);
          });
      });
    
  }

  render() {

    return (
      <div ref='overall'>
        <svg ref='space'>
        </svg>
      </div>
    );
  }
};

export default Graph;