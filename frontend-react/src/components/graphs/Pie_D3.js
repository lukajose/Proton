import * as d3 from 'd3';

function Pie_D3(data) {
    d3.select('#pie > *').remove()
    // set the dimensions and margins of the graph
    var width = 800,
    height = 400,
    margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select('#pie')
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    //var data = {a: 9, b: 20, c:30, d:8, e:12}

    // set the color scale
    var color = d3.scaleOrdinal()
    .domain(data)
    .range(["#00FA9A", "#2E8B57", "black", "#484848", "gray"])

    // Compute the position of each group on the pie:
    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))


    //arc generator
    // shape helper to build arcs:
    var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)


    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
    .selectAll('whatever')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d',arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text((d) => d.data.key)
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
    .style("font-size", 17)
    
}
export default Pie_D3;

/*

    var color = d3.scaleOrdinal()
      .range(["green", "blue", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

*/