function loadScatter(){
  // preset height and width
  var height = 400,
      width = 1000,
      timeSetup = d3.timeParse("%b %d %Y");

  // load the data
  d3.csv("2010R.csv",function(data) {
    // add svg and set the margins for the svg
    var svg = setupSvg(height,width);
    data.forEach(function(d) {
      d["Recall Date"] = timeSetup(d["Recall Date"]);
      d["Pounds Recalled"] = +d["Pounds Recalled"];
    });

    var x = d3.scaleTime().rangeRound([0, width]);
    x.domain(d3.extent(data, function(d) { return d["Recall Date"]; }))
     .range([0,width]);

    var y = d3.scaleLinear().rangeRound([height, 0]);
    y.domain([0, d3.max(data, function(d) {return d["Pounds Recalled"]})])
     .range([height,0]);

    // draw the x axis and add labels (age axis)
    svg.append('g')
       .attr('transform', 'translate(0,400)')
       .call(d3.axisBottom(x));
      /* .append('text')
       .attr('class', 'label')
       .attr('x', width)
       .attr('y', 30)
       .attr('font-family', 'sans-serif')
       .attr('font-size', '15px')
       .attr('fill','black')
       .text('Age'); */
    // draw the y axis and add labels (treated axis)
    svg.append('g')
       .attr('transform', 'translate(40,40)')
       .call(d3.axisLeft(y))
       /*.append('text')
       .attr('transform', 'rotate(-90)')
       .attr('x',0)
       .attr('y', -25)
       .attr('font-family', 'sans-serif')
       .attr('font-size', '15px')
       .attr('fill','black')
       .text("# of People Treated");*/

    // draw the points onto the graph
    svg.append('g')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', function(d) {return (x(d["Recall Date"])) + 40})
      .attr('cy', function(d) {return (y(+d["Pounds Recalled"])) + 40})
      .attr('r', 4); // different sizess depending on d[2] size?
      // color the points based on gender
      /*.style("fill", function(d) {
        if (d.Gender == "Female")
	        return ("Pink");
	      else
	        return ("Blue");
      }); */

    // caption
  /*  svg.append('text')
	     .attr('x', 280)
	     .attr('y', height + 90)
	     .text('Correlation between age, gender, and number of people treated');

    }); */
  });
}

function setupSvg(height, width){
  return d3.select("body")
           .select("#scatterplot")
           .append("svg") // append svg to the div
           .attr("width", width + 100) // set the width and height
           .attr("height", height + 100)
           .append("g")
           .attr("transform", "translate(80,10)") // random right now
}

loadScatter();
