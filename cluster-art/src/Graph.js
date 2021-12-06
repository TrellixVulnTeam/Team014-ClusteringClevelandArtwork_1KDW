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
      // svg_width: window.innerWidth,
      // svg_height: window.innerHeight,
      // graph_width: window.innerWidth,
      // graph_height: window.innerHeight,
      num_clusters: 3,
      window_width: window.innerWidth,
      window_height: window.innerHeight
    }

    console.log(this.state.window_width)
    console.log(this.state.window_height)

    // this.drawChart = this.drawChart.bind(this);
    this.drawNodes = this.drawNodes.bind(this);
  }

  handleResize = () => {
    console.log(this.state.window_width)
    console.log(this.state.window_height)
    this.setState({
      window_width: window.innerWidth,
      window_height: window.innerHeight
    })
    // this.drawChart();
    // this.drawNodes()
    // let curr_svg = document.getElementById("svg-component")
    // curr_svg.height = this.state.window_height
    // curr_svg.width = this.state.window_width
        // .viewBox(`0 0 ${this.state.window_width} ${this.state.window_height}`)
        // .attr("viewBox", `0 0 ${this.state.window_width} ${this.state.window_height}`)
  }

  componentDidMount() {
    // this.drawChart();
    this.drawNodes();
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  drawNodes() {
    var self = this;
    var d = d3.csv(data, function(d) {
      return {
        x: +d.x,
        y: +d.y,
        text: d.text.toString(),
        cluster_id: +d.clusterid
      }
    }).then(dt => {
      console.log(dt)
      // var trans_width = (self.state.svg_width - self.state.graph_width - 30)/2 - 250;
      // var trans_height = (self.state.svg_height - self.state.graph_height - 30)/ - 200;

////////////////////////////
//       d3.select(this.refs.overall).classed("svg-container", true)
      // .attr("transform", "translate(" + 2000 + "," + 3000 +")");

      // const handleResize = () => {
      //   console.log(this.state.window_width)
      //   console.log(this.state.window_height)
      //   this.setState({
      //     window_width: window.innerWidth,
      //     window_height: window.innerHeight
      //   })
      //   svg.attr("viewBox", "0 0 " + this.state.window_width + " " + this.state.window_height)
      //   // this.drawChart();
      //   // this.drawNodes()
      // }

      //drawing int svg
      const svg = d3.select(this.refs.space)
          // .style('padding-left', '10px')
          // .style('padding-right', '10px')
          //.style('background', 'pink')

          // .style('background', '#ebdfbc')
          .attr("id", "svg-component")
          .style('cursor', 'pointer')
          .style('-webkit-user-select', 'none')
          .style('-khtml-user-select', 'none')
          .style('-moz-user-select', 'none')
          .style('-ms-user-select', 'none')
          // .style("margin", "auto")
          // .style("display", "block")

          .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("viewBox", `0 0 ${this.state.window_width} ${this.state.window_height}`)
          // .attr("height", this.state.window_height)
          // .attr("width", this.state.window_width)

          .classed("svg-content-responsive", true);

      // const g = svg.append("g")
      //     .attr("cursor", "grab")

      // var trans_width = (this.state.svg_width - this.state.graph_width - 30)/2;
      // var trans_height = (this.state.svg_height - this.state.graph_height - 30)/2;

      //this is the actual graph
      // const rect = svg.append("rect")
      //     // .attr('width', this.state.window_width)
      //     // .attr('height', this.state.window_height)
      //     // .attr("fill", "#f7f2e1")
      //     // .attr("stroke", "#d99e16")
      //     .attr("stroke-width", "10px")
      //     .attr("rx", 6)
      //     .attr("ry", 6)
      // .attr("transform", "translate(" + 0 + "," + 0 +")")
      // .attr("viewBox", "0 0 " + this.state.window_width + " " + this.state.window_height);

      // const dragStarted = () => {
      //   d3.select(this).raise();
      //   g.attr("cursor", "grabbing");
      // }
      //
      // const dragged = () => {
      //   d3.select(this)
      //       .attr("cx", d.x = event.x)
      //       .attr("cy", d.y = event.y)
      // }

      // const dragEnded = )_ => {
      //
      // }

      // function dragstarted() {
      //   d3.select(this).raise();
      //   rect.attr("cursor", "grabbing");
      // }
      //
      // function dragged(event, d) {
      //   d3.select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
      // }
      //
      // function dragended() {
      //   rect.attr("cursor", "grab");
      // }

      // function zoomed({transform}) {
      //   console.log(transform)
      //   g.attr("transform", transform)
      // }
      //
      svg.call(d3.zoom()
          .extent([[0,0], [this.state.window_width, this.state.window_height]])
          .scaleExtent([1,8])
          .on("zoom", zoomed))


      ////////////////////////////////////////



      var myColor = d3.scaleSequential().domain([1, self.state.num_clusters]).range(d3.schemeSet1);

      //For circles
      var div = d3.select(this.refs.space).append('g')
          // .attr("cursor", "grab")

      // .attr("transform", "translate(" + 250 + "," + 200 +")");

      function zoomed({transform}) {
        div.attr("transform", transform)
      }

      //Hover textbox. Append to here to add something into textbox
      var divHover = d3.select(this.refs.space).append('g');

      var textbox = divHover.append('rect')
        .attr('x', '0')
        .attr('y', '0')
        .attr('width', 50)
        .attr('height', 20)
        .attr('fill', 'white')
        .attr('stroke', 'white')
        .attr("rx", 6)
        .attr("ry", 6)
        .style("opacity", 0);

      var text = divHover.append('text')
        .attr('dy', 15)
        .attr('dx', 10)
        // .attr('padding', 10)
        // .attr("dominant-baseline", "middle")
        .attr("text-anchor", "start")
        // .attr("fill", "#73716b")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
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
        // .attr("fill", "#73716b")
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
          .attr('cx', function(d) { return d.x * self.state.window_width; })
          .attr('cy', function(d) { return d.y * self.state.window_height; })
          .attr('fill', function(d){return myColor(d.cluster_id)})
          .attr('r', self.state.window_width * 0.002)
          .on("mouseover", function(d){
            //moving hover textbox
            divHover
                .attr("transform", "translate(" + (this.__data__.x + 10)
              + "," + (this.__data__.y + 10) +")")
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
            div2.attr("transform", "translate(" + (self.state.window_width + 45)
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

            //Todo: add more information based on what's being passed in from backend
            //Appending artists name, maybe picture? general info about the art piece

            close.attr("transform", "translate(" + (close_width + 15) + ", 10) rotate(45)")
            .style("opacity", 1);
          })
      });
    
  }

  render() {
    // debugger
    return (
      <div ref='overall' style={{overflow: "hidden"}}>
        <svg ref='space' />
      </div>
    );
  }
};

export default Graph;