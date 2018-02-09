var margin = {
  top: 20,
  right: 50,
  bottom: 30,
  left: 50
},
width = 900 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
.rangeRoundBands([0, width], .35);

var y = d3.scale.linear()
.range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom");

var yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.tickFormat(d3.format(".2s"))
.ticks(6);

var line = d3.svg.line()
.interpolate("basis")
.x(function(d) {
  return x(d.year);
})
.y(function(d) {
  return y(d.count);
});

var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var names = ["Arrested", "Not Arrested"];

d3.json("../output/assault.json", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) {
    return key !== "year";
  }));

  var counter = color.domain().map(function(d) {
    return {
      name: d,
      values: data.map(function(b) {
        return {
          year: b.year,
          count: +b[d]
        };
      })
    };
  });


  x.domain(data.map(function(d) {

    return parseInt(d.year);
  }));



  y.domain([
    d3.min(counter, function(c) {
      return d3.min(c.values, function(v) {
        return v.count;
      });
    }),
    d3.max(counter, function(c) {
      return d3.max(c.values, function(v) {
        return v.count;
      });
    })
    ]);

  svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .append("text")
  .attr("x", 800)
  .attr("dy", "0.35em")
  .attr("text-anchor", "start")
  .attr("fill", "#000")
  .text("Year");


  svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 7)
  .attr("dy", "0.35em")
  .attr("text-anchor", "end")
  .attr("fill", "#000")
  .text("Arrest Count");


  var arrest = svg.selectAll(".arrest")
  .data(counter)
  .enter().append("g")
  .attr("class", "arrest")
  .on("mouseover", function(d) {
    console.log(counter);

    return counter;
  });

  var path = svg.selectAll(".arrest").append("path")
  .attr("class", "line")
  .attr("d", function(d) {
    return line(d.values);
  })
  .style("stroke", function(d) {
    if (d.name == "arrested") {
      return "#1f77b4";
    } else {
      return "#ff7f0e";
    }
  });


});
