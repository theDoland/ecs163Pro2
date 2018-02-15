function sunburst(){
    var height = 600,
        width = 600,
        radius = Math.min(height, width) / 2;
    
    var arc = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(radius - 90);

    var pie = d3.pie()
                .sort(null) // sort ascending
                .value(function(d) { return d.});

    var svg = d3.select("body")
                .select("#sunburst")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(10,10)");

    d3.csv("2010R.csv", function(data) {
        data.forEach(data, function(d) {
            d[""]
        });
        var g = svg.selectAll(".arc")
                   .data(pie(data))
                   .enter()
                   .append("g");

        g.append("path")
         .attr("d", "arc")
         .style("fill", "blue");

    });

}

sunburst();