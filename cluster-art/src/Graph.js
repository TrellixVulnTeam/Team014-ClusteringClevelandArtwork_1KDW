import * as d3 from 'd3'
import React, { Component } from 'react'

import data from './data.csv';
import {symbol, symbolCross} from "d3-shape";
import './Graph.css'
import KMeans from "./d3-vis/kmeans";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svg_width: 1600,
      svg_height: 800,
      graph_width: 1100,
      graph_height: 700,
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
    //making svg responsive
    d3.select(this.refs.overall).classed("svg-container", true)
    .attr("transform", "translate(" + 200 + "," + 300 +")");

    //drawing int svg
    const svg = d3.select(this.refs.space)
                .style('padding-left', '10px')
                .style('padding-right', '10px')
                //.style('background', 'pink')
                .style('background', '#ebdfbc')
                .style('cursor', 'pointer')
                .style('-webkit-user-select', 'none')
                .style('-khtml-user-select', 'none')
                .style('-moz-user-select', 'none')
                .style('-ms-user-select', 'none')
                .style("margin", "auto")
                .style("display", "block")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "250 200 " + this.state.svg_width + " " + this.state.svg_height)
                .classed("svg-content-responsive", true);

    var trans_width = (this.state.svg_width - this.state.graph_width - 30)/2;
    var trans_height = (this.state.svg_height - this.state.graph_height - 30)/2;

    //this is the actual graph
    const rect = svg.append("rect")
                    .attr('width', this.state.graph_width + 30)
                    .attr('height', this.state.graph_height + 30)
                    .attr("fill", "#f7f2e1")
                    .attr("stroke", "#d99e16")
                    .attr("stroke-width", "10px")
                    .attr("rx", 6)
                    .attr("ry", 6)
                    .attr("transform", "translate(" + 250 + "," + 200 +")");
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
      var trans_width = (self.state.svg_width - self.state.graph_width - 30)/2 - 250;
      var trans_height = (self.state.svg_height - self.state.graph_height - 30)/ - 200;

      console.log(trans_width)

      var myColor = d3.scaleSequential().domain([1, self.state.num_clusters]).range(d3.schemeSet1);

      //For circles
      var div = d3.select(this.refs.space).append('g')
      .attr("transform", "translate(" + 250 + "," + 200 +")");

      //Hover textbox. Append to here to add something into textbox
      var divHover = d3.select(this.refs.space).append('g');

      var textbox = divHover.append('rect')
        .attr('x', '0')
        .attr('y', '0')
        .attr('width', 90)
        .attr('height', 70)
        .attr('fill', 'white')
        .attr('stroke', 'white')
        .attr("rx", 6)
        .attr("ry", 6)
        .style("opacity", 0);

      var text = divHover.append('text')
        .attr('dy', 35)
        .attr('dx', 10)
        .attr('padding', 10)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "start")
        .attr("fill", "#73716b")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("opacity", 0);

      //Click textbox. Append here to add something into the clicked textbox
      var div2 = d3.select(this.refs.space).append("g")

      var boxClick = div2.append('rect')
        .attr('x', '0')
        .attr('y', '0')
        .attr("rx", 6)
        .attr("ry", 6)
        .attr('width', 100)
        .attr('height', 100)
        .attr('fill', 'white')
        .style("opacity", 0);

      var boxText = div2.append('text')
        .attr('dy', 35)
        .attr('dx', 10)
        .attr('padding', 10)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "start")
        .attr("fill", "#73716b")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("opacity", 0);

      //When you click on the x mark it should close out the click box
      var close = div2.append('path')
        .attr('d', d3.symbol().type(d3.symbolCross).size(60))
        .attr('stroke', 'gray')
        .attr('fill', 'gray')
        .style("opacity", 0)
        .on("click", function() {
          div2.attr("opacity", "0")
        });

      //Draw circles
      div.selectAll('circle')
          .data(dt)
          .enter()
          .append('circle')
          .attr('class',  function(d) { return d.text; })
          .attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; })
          .attr('fill', function(d){return myColor(d.cluster_id)})
          .attr('r', 5)
          .on("mouseover", function(d){
            //moving hover textbox
            divHover.attr("transform", "translate(" + (this.__data__.x + 250 + 10) 
              + "," + (this.__data__.y + 200 + 10) +")")
            .attr("opacity", 1);

            //Adding text
            text.style("opacity", 1)
            .text(d['target'].__data__.text)
            .transition()
            .duration('10');


            //Dynamic text width
            var text_width = text.node().getBBox().width + 20;

            //Hover textbox formatting
            textbox.style("opacity", 1)
            .attr("width", function(d) {return text_width;})
            .attr('height', 70)
            .transition()
            .duration('10');
          })
          .on("mouseout", function(d) {
            //Make everything in hover have an opacity of 0
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
            //Moving click textbox
            div2.attr("transform", "translate(" + (250 + self.state.graph_width + 45) 
              + "," + 210 +")")
            .attr("opacity", 1);

            //statis vs dynamic textbox width
            var close_width = 400;
            var text_width = text.node().getBBox().width + 20;

            //make everything have an opacity of 1
            boxText.style("opacity", 1)
            .text(d['target'].__data__.text)
            .transition()
            .duration('10');

            //The box for clicking a node
            boxClick.style("opacity", 1)
            .attr("width", function(d) {return close_width + 25;})
            .attr('height', 70)
            .transition()
            .duration('10');

            close.attr("transform", "translate(" + (close_width + 15) + ", 10) rotate(45)")
            .style("opacity", 1);
          })
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