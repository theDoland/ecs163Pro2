// https://bl.ocks.org/d3noob/119a138ef9bd1d8f0a8d57ea72355252
function areaChart(){
    var height = 300,
        width = 300;
    var svg = createSvg(height,width);
    var timeSetup = d3.timeParse("%b %d %Y");

    d3.csv("2010R.csv", function(data) {
      // setup the data to fit the time and numerical input for the chart
      console.log(data);
      data.forEach(function(d) {
        d["Recall Date"] = timeSetup(d["Recall Date"]);
        d["Pounds Recalled"] = +d["Pounds Recalled"];
        console.log(d.Date);
      });
      // set up the x and y axis of the chart
      var x = d3.scaleTime().rangeRound([0, width+200]);
      x.domain(d3.extent(data, function(d) { return d["Recall Date"]; }));

      var y = d3.scaleLinear().rangeRound([height, 0]);
      y.domain([0, d3.max(data, function(d) {return 1000000})]);//d["Pounds Recalled"]})]);

      // Define area
      var area = d3.area()
                   .x(function(d) { return x(d["Recall Date"]); })
                   .y1(function(d) { return y(d["Pounds Recalled"]); });

      // define line
      var line = d3.line()
                   .x(function(d) { return x(d["Recall Date"]); })
                   .y(function(d) { return y(d["Pounds Recalled"]); });

      svg.append("path")
         .data([data])
         .attr("d", area);

      svg.append("path")
         .data([data])
         .attr("d", line);

      svg.append("g")
         .attr("transform", "translate(0,300)")
         .call(d3.axisBottom(x))

      svg.append("g")
         .call(d3.axisLeft(y));
    });
}

function createSvg(height,width){
  return d3.select("body")
           .select("#areaChart")
           .append("svg") // append svg to the div
           .attr("width", width + 100) // set the width and height
           .attr("height", height+ 100)
           .append("g")
           .attr("transform", "translate(80,10)") // random right now
}

areaChart();
