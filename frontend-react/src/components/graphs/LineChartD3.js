import * as d3  from 'd3'
import '../../CSS/linechart.css'
import React,{Fragment,useState,useEffect} from 'react'
//create D3 Line chart

const LineChart = (data) => {
  console.log('data:',data)
    var margin = {top: 20, right: 30, bottom: 20, left: 100},
        width = 760 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
    
    
    // Basic SVG canvas
    d3.select('#line-chart-d3 > *').remove()
    var svg = d3.select("#line-chart-d3").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseDate = d3.timeParse("%Y-%m-%d");
    var displayDate = d3.timeFormat("%Y %y");
    var displayValue = d3.format(",.0f");
    
    data.forEach(function(d) {
        d.date = parseDate(d.date);
      });
    // Temporal scale
    console.log('data is:',data)
    var x = d3.scaleTime()
        .range([0, width]);

		// Linear scale
    var y = d3.scaleLinear()
        .range([height, height - 200]);

    var line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });
    
    var g = svg.append("g")
    	.attr("transform", "translate(10, 0)");
    
      // Pre-processing
      // {"id" : 1, "name": "A", "value": 10, "date": "2016-01"}
      
      x.domain(d3.extent(data, function(d) { return d.date; }));
			y.domain([0, d3.max(data, function(d) { return d.value; })]);

      svg.selectAll("text").data(data).enter()
       .append("text")
        .attr("y", 420)
        .attr("x", function(d) { return x(d.date); })
      	.attr("id", "")
        .style("font-size", 10)
        .style("font-family", "monospace")
        .text(function(d, i) { return d.date; });

      g.selectAll(".value").data([data[data.length -1]]).enter()
       .append("text")
        .attr("class", "value")
        .attr("y", function(d) { return y(d.value); })
        .attr("x", width - 20)
        .style("font-size", 20)
        .style("font-family", "monospace")
        .text(function(d, i) { return d.value; });
      
      g.selectAll("circle").data(data).enter()
       .append("circle")
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.value); })
        .attr("r", function(d, i) { return 5; })
        .attr("id", function(d) { return d.id; })
        .style("fill", "#fcb0b5")
        .on("mouseover", function(d){

        	d3.select(this).transition().duration(200).style("fill", "#d30715");

          g.selectAll("#tooltip").data([d]).enter().append("text")
            .attr("id", "tooltip")
            .text(function(d, i) { return d.value; })
            .attr("y", function(d) {return y(d.value) - 12})
            .attr("x", function(d) { return x(d.date); })

          g.selectAll("#tooltip_path").data([d]).enter().append("line")
            .attr("id", "tooltip_path")
            .attr("class", "line")
            .attr("d", line)
            .attr("x1", function(d) {return x(d.date)})
            .attr("x2", function(d) {return x(d.date)})
            .attr("y1", height)
            .attr("y2", function(d) {return y(d.value)})
            .attr("stroke", "black")
            .style("stroke-dasharray", ("3, 3"));
        })
        .on("mouseout", function(d) {
          d3.select(this).transition().duration(500).style("fill", "#fcb0b5");

          g.selectAll("#tooltip").remove();
          g.selectAll("#tooltip_path").remove();
        });

        g.selectAll("path").data([data]).enter().append("path")
          .attr("class", "line")
          .attr("d", line);
      
        svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

}

const LineChartD3 = ({data}) => {
    //data example:
    //     data = [ 
    //         {id : 1, name: "A", value: 10, date: "2020-01-10"},
    //         {id : 2, name: "B", value: 30, date: "2020-02-10"},
    //         {id : 40, name: "C", value:99, date: "2020-03-10"},
    //         {id : 4, name: "D", value: 40, date: "2020-04-10"},
    //         {id : 5, name: "E", value: 50, date: "2020-05-10"},
    //         {id : 6, name: "F", value: 20, date: "2020-06-10"},
    //         {id : 7, name: "G", value: 10, date: "2020-07-10"},
    //         {id : 8, name: "H", value: 80, date: "2020-08-10"},
    //         {id : 9, name: "I", value: 30, date: "2020-09-10"},
    //         {id : 10,name: "J", value: 70, date: "2020-10-10"},
    //         {id : 11,name: "K", value: 90, date: "2020-11-10"},
    //         {id : 12,name: "L", value: 40, date: "2020-12-10"}
    //    ]
    useEffect(() => {
        
       LineChart(data)

    },[data])

    return (
        <div id="line-chart-d3"></div>
    )
}

export default LineChartD3;