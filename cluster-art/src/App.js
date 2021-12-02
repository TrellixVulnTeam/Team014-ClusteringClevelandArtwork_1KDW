import './App.css';
import * as d3 from 'd3'
import React, { Component } from 'react'

class App extends Component {

  componentDidMount() {
    this.drawChart();
    this.drawNode();
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

  drawNode() {
    var div = d3.select(this.refs.space).append('g');

    var textbox = div.append('rect')
      .attr('x', '0')
      .attr('y', '0')
      .attr('width', 90)
      .attr('height', 70)
      .attr('fill', '#e28743')
      .attr('stroke', '#e28743')
      .style("opacity", 0);

    var text = div.append('text')
      .text(function () { return "testingggggggggggggg" })
      .attr('dy', 35)
      .attr('dx', 10)
      .attr('padding', 10)
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "start")
      .attr("fill", "pink")
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .style("opacity", 0);

    div.selectAll('rect')
    .attr("width", function(d) {return this.parentNode.getBBox().width + 10;})


    const circle = d3.select(this.refs.space)
                    .append('circle')
                    .attr('cx', function() { return 200; })
                    .attr('cy', function() { return 200; })
                    .attr('fill', function() { return 'yellow'; })
                    .attr('r', 5)
                    .on("mouseover", function(){
                      console.log("mouseover");

                      textbox.style("opacity", 1)
                      .attr('x', 200 + 10)
                      .attr('y', 200 + 10)
                      .transition()
                      .duration('50');

                      text.style("opacity", 1)
                      .attr('x', 200 + 10)
                      .attr('y', 200 + 10)
                      .transition()
                      .duration('50');
                    })
                    .on("mouseout", function(){
                      console.log("mouseout");
                      textbox.transition()
                         .duration('50')
                         .style("opacity", 0);
                      text.transition()
                         .duration('50')
                         .style("opacity", 0);
                    });
  }

  render() {
    return (
      <div ref=''>
        <svg ref ="space">
        </svg>
      </div>
    );
  }
};

export default App;