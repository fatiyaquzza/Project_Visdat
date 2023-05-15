// Set the dimensions and margins of the pie chart full screen
const width = 1000;
const height = 400;
const margin = 40;

// Set the radius of the pie chart at 1/2 the width or height
const radius = Math.min(width, height) / 2 - margin;

// Select the div element that will contain the chart at left side
const svg = d3.select("#piechart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Set the data for the chart
const data = [2999, 1699, 3826];

// Set the color scale for the chart
const color = d3.scaleOrdinal()
  .domain(data)
  .range(["#643843", "#fc8d62", "#1B9C85"]);

// Set the arc function for the chart
const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius);

// sum data to 100% and show percentage
const sum = data.reduce((a, b, c ) => a + b + c, 0);
const dataPercentage = data.map((d) => (d / sum) * 100);

// set sum data name to the legend
const dataName = ["Credit Card", "Debit Card", "Cash"];

// Set the pie function for the chart
const pie = d3.pie()
  .value(function(d) { return d; })
  .sort(null);

// Generate the arcs for the chart
const arcs = pie(data);

// Add the arcs to the chart
svg.selectAll("path")
  .data(arcs)
  .enter()
  .append("path")
  .attr("d", arc)
  .attr("fill", function(d) { return color(d.data); })
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7);
  
// show sum data to 100% and show percentage
svg.selectAll("text")
  .data(arcs)
  .enter()
  .append("text")
  .text(function(d, i) { return dataPercentage[i].toFixed(1) + "%"; })
  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
  .style("text-anchor", "middle")
  .style("font-size", 12)
  .style("fill", "white");

// make legend at the right side of the pie chart
const legend = svg.selectAll(".legend")
  .data(dataName)
  .enter()
  .append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(200," + (i * 20 - 100) + ")"; });

// set sum data color to the legend
legend.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 15)
  .attr("height", 15)
  .style("fill", function(d, i) { return color(i); })
  .style("opacity", 0.7);

// fit sum data full name to the legend
legend.append("text")
  .attr("x", 20)
  .attr("y", 10)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .style("font-size", 12)
  .text(function(d) { return d; });

// make title for the pie chart
// svg.append("text")
//   .attr("x", 0)
//   .attr("y", -180)
//   .attr("text-anchor", "middle")
//   .style("font-size", "20px")
//   .style("text-decoration", "bold")
//   .text("Persentase Cara Bayar Yang Digunakan Customer Saat Membeli");

// make title for the legend
svg.append("text")
  .attr("x", 200)
  .attr("y", -120)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("text-decoration", "underline")
  .text("Kategori");
