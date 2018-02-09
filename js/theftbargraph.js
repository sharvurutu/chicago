//var d3 = require('d3');
var margin = { top: 20, right: 50, bottom: 30, left: 50 },
width = 900 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
.rangeRoundBands([0, width], .35);

var y = d3.scale.linear()
.rangeRound([height, 0]);

var color = d3.scale.category20();

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom");

var yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.ticks(5)
.tickFormat(d3.format(".2s"));

var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var xData = ["over500", "under500"];

d3.json("../output/theft.json", function(err, data) {
    var dataIntermediate = xData.map(function(c) {
        return data.map(function(d) {
            return { x: d.year, y: d[c] };
        });
    });

    var dataStackLayout = d3.layout.stack()(dataIntermediate);

    x.domain(dataStackLayout[0].map(function(d) {
        return d.x;
    }));

    y.domain([0,
        d3.max(dataStackLayout[dataStackLayout.length - 1],
            function(d) {
                return d.y0 + d.y;
            })
        ])
    .nice();

    var layer = svg.selectAll("g.cost")
    .data(dataStackLayout)
    .enter().append("g")
    .attr("class", "cost")
    .style("fill", function(d, i) {
        return color(i);
    });

    layer.selectAll("rect")
    .data(function(d) {
        return d;
    })
    .enter().append("rect")
    .attr("x", function(d) {
        return x(d.x);
    })
    .attr("y", function(d) {
        return y(d.y + d.y0);
    })
    .attr("height", function(d) {
        return y(d.y0) - y(d.y + d.y0);
    })
    .attr("width", x.rangeBand());

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
    .text("Theft Count");

    var legend = svg.selectAll(".legend")
    .data(color.domain().slice().reverse())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
    })
    .style("font", "10px sans-serif");

    legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", color);

    legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .text(function(d) {
        return xData[d];
    });
});
