import './App.css';
import * as d3 from 'd3'
import React, { Component } from 'react'

import data from './data.csv';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const svg = d3.select(this.refs.space)
                .attr('width', 900)
                .attr('height', 700)
                .style('padding', '10px')
                .style('background', '#223344')
                .style('cursor', 'pointer')
                .style('-webkit-user-select', 'none')
                .style('-khtml-user-select', 'none')
                .style('-moz-user-select', 'none')
                .style('-ms-user-select', 'none')
  }

  render() {
    var d = d3.csv(data, function(d) {
      return {
        x: +d.x,
        y: +d.y,
        text: d.text.toString()
      }
    }).then(dt => {
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
          .attr('fill', function() { return 'yellow'; })
          .attr('r', 5)
          .on("mouseover", function(d){
            text.style("opacity", 1)
            .text(d['target'].__data__.text)
            .attr('x', d.x + 10)
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

    return (
      <div>
        <svg ref='space'>
        </svg>
      </div>
    );
  }
};

export default App;