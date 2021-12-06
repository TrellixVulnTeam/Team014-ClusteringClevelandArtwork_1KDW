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
      window_width: window.innerWidth,
      window_height: window.innerHeight
    }

    console.log(this.state.window_width)
    console.log(this.state.window_height)

    this.drawNodes = this.drawNodes.bind(this);
  }

  handleResize = () => {
    //console.log(this.state.window_width)
    //console.log(this.state.window_height)
    this.setState({
      window_width: window.innerWidth,
      window_height: window.innerHeight
    })
    // this.drawChart();
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
    var yScale = d3.scaleLinear().range([self.state.window_height - 10, 10])

    var xScale = d3.scaleLinear().range([10, self.state.window_width - 10])

    var d = d3.csv(data, function(d) {
      return {
        x: +d.x,
        y: +d.y,
        text: d.text.toString(),
        cluster_id: +d.clusterid
      }
    }).then(dt => {
      console.log(dt)
      var xmax = d3.max(dt, function(d) {return d.x});
      var xmin = d3.min(dt, function(d) {return d.x});

      var ymax = d3.max(dt, function(d) {return d.y});
      var ymin = d3.min(dt, function(d) {return d.y});

      yScale.domain([ymin, ymax]);
      xScale.domain([xmin, xmax]);

      console.log(xmin);
      console.log(xmax);

      //drawing int svg
      const svg = d3.select(this.refs.space)
          .attr("id", "svg-component")
          .style('cursor', 'pointer')
          .style('-webkit-user-select', 'none')
          .style('-khtml-user-select', 'none')
          .style('-moz-user-select', 'none')
          .style('-ms-user-select', 'none')
          .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("viewBox", `0 0 ${this.state.window_width} ${this.state.window_height}`)

          .classed("svg-content-responsive", true);

      svg.call(d3.zoom()
          .extent([[0,0], [this.state.window_width, this.state.window_height]])
          .scaleExtent([1,8])
          .on("zoom", zoomed))


      ////////////////////////////////////////

      var maxcluster = d3.max(dt, function(d) {return d.cluster_id})

      var myColor = d3.scaleSequential().domain([0, maxcluster]).interpolator(d3.interpolateTurbo);

      //For circles
      var div = d3.select(this.refs.space).append('g')

      function zoomed({transform}) {
        div.attr("transform", transform)
        divHover.attr("transform", transform)
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
        .attr("text-anchor", "start")
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
        .style("opacity", 0)
        .attr("stroke", "grey")
        .attr("stroke-width", 1);

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

      var boxArtist = div2.append('text')
        .attr('dy', 60)
        .attr('dx', 10)
        .attr('padding', 10)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "start")
        .attr("fill", "#73716b")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("opacity", 0);

      var boxYear = div2.append('text')
        .attr('dy', 85)
        .attr('dx', 10)
        .attr('padding', 10)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "start")
        .attr("fill", "#73716b")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("opacity", 0);

      var boxOther = div2.append('text')
        .attr('dy', 110)
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
          div2.attr("opacity", "0");
          div2.selectAll("text").text("");
          boxClick.attr("width", 0).attr("height", 0);
        });

      div.selectAll('circle')
          .data(dt)
          .enter()
          .append('circle')
          .attr('class',  function(d) { return d.text; })
          .attr('cx', function(d) { return  xScale(d.x); })
          .attr('cy', function(d) { return yScale(d.y); })
          .attr('fill', function(d){return myColor(d.cluster_id)})
          .attr('r', self.state.window_width * 0.002)
          .on("mouseover", function(d){
            divHover
            .attr("transform", "translate(" + (d.x + 10)
              + "," + (d.y + 10) +")")
            .attr("opacity", 1);

            //Adding text
            text.style("opacity", 1)
            .text(d['target'].__data__.text)
            .transition()
            .duration('10');

            //Dynamic text width
            var text_width = text.node().getBBox().width + 15;
            var text_height = text.node().getBBox().height + 10;

            //Hover textbox formatting
            textbox.style("opacity", 1)
            .attr("width", function(d) {return text_width;})
            .attr('height', text_height)
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
            div2.attr("transform", "translate(" + (xScale(d.x) + 5)
              + "," + (yScale(d.y) + 5) +")")
            .attr("opacity", 1);

            //statis vs dynamic textbox width
            var close_width = 400;
            var text_width = text.node().getBBox().width + 20;

            //make everything have an opacity of 1
            boxText.style("opacity", 1)
            .text(d['target'].__data__.text)
            .transition()
            .duration('10');

            boxArtist.style("opacity", 1)
            .text("Artist")
            .transition()
            .duration('10');

            boxYear.style("opacity", 1)
            .text("Year")
            .transition()
            .duration('10');

            boxOther.style("opacity", 1)
            .text("Other")
            .transition()
            .duration('10');

            //The box for clicking a node
            boxClick.style("opacity", 1)
            .attr("width", function(d) {return close_width + 25;})
            .attr('height', 200)
            .transition()
            .duration('10');


            //Todo: add more information based on what's being passed in from backend
            //Appending artists name, maybe picture? general info about the art piece

            close.attr("transform", "translate(" + (close_width + 15) + ", 10) rotate(45)")
            .style("opacity", 1);
          })
        var divLegend = d3.select(this.refs.space).append("g");
        
        divLegend.append('rect')
          .attr('x', 19)
          .attr('y', '8')
          .attr("rx", 6)
          .attr("ry", 6)
          .attr('width', maxcluster * 30 + 40)
          .attr('height', 50)
          .attr('fill', 'white')
          .attr("stroke", "grey")
          .attr("stroke-width", 1);


        divLegend.selectAll("circle")
            .data(d3.range(maxcluster+1))
            .enter()
            .append('circle')
            .attr('cx', function(d) { return  d * 30+ 40; })
            .attr('cy', function(d) { return 34; })
            .attr('fill', function(d){return myColor(d)})
            .attr('r', self.state.window_width * 0.002)
        
        divLegend.selectAll("text").data(d3.range(maxcluster+1))
            .enter()
            .append('text')
            .attr('x', function(d) { return  d * 30 + 40; })
            .style("text-anchor", "middle")
            .attr('y', function(d) { return 50})
            .text(function(d) { console.log(d.toString()); return d.toString(); })

        divLegend.append("text")
          .attr('dy', 20)
          .attr('dx', 25)
          .text("Node Color to Cluster Number")
          .attr("text-anchor", "start")
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px");

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