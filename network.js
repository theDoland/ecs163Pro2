// consider adding the value to the json file to get power for the lines
var height = 300,
    width = 300;
// Set up the svg component in the div to be modified
var svg = d3.select("body")
    .select("#network")
    .append("svg")
    .attr("height", height + 200) // temp
    .attr("width", width + 200)   // temp
    .attr("transform", "translate(50,0)");

function loadNetwork() {
    // Setup the simulation https://bl.ocks.org/mbostock/4062045
    var simulation = d3.forceSimulation()
    .force("link", d3.forceLink())
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width, height));

    // load the data
    d3.json("2010R.json", function (data) {
        // sort the nodes so the indexes line up with later data manip
        data.nodes.sort(function (a, b) {
            return a.group > b.group;
        });

        data.nodes.sort();

        // set up the links between the nodes
        var link = svg.append("g")
            .attr("id", "linkers") // id = linkers for future mods
            .selectAll("line")
            .data(data.links)
            .enter()
            .append("line")
            .attr("stroke", "black")
            .attr("stroke-width", 2); // temp

        // set up the nodes 
        var node = svg.append("g")
            .attr("id", "noders")
            .selectAll("circle")
            .data(data.nodes)
            .enter()
            .append("circle")
            .attr("r", 5) // temp
            .style("fill", function (d) { // change color of the products
                if (d.name == "chicken")
                    return "Orange";
                if (d.name == "pork")
                    return "Pink";
                if (d.name == "beef")
                    return "Brown";
                if (d.name == "other")
                    return "Black"
                return "Green";
            });
        // Does not work yet
        //*/

        // setup running locations for nodes
        simulation.nodes(data.nodes)
            .on("tick", ticked);
        simulation.force("link")
            .links(data.links);

        function ticked() {
            link.attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node.attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        }

    });
}
// function to switch data representations
function updateNetwork(filename) {

    // Have to reset the simulation every time https://bl.ocks.org/mbostock/4062045 
    var simulation = d3.forceSimulation()
    .force("link", d3.forceLink())
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width, height));

    // load the data
    d3.json(filename, function (data) {
        // sort
        data.nodes.sort(function (a, b) {
            return a.group > b.group;
        });

        data.nodes.sort();
        // setup link variable to remove existing links and append new
        var link = svg.select("#linkers")
                      .selectAll("line")
                      .data(data.links);
        
        link.exit().remove();
        link.enter()
            .append("line")
            .attr("stroke", "black")
            .attr("stroke-width", 2);
        // setup node variable to remove existing nodes
        var node = svg.select("#noders")
                      .selectAll("circle")
                      .data(data.nodes);

        node.exit().remove();
        node.enter()
            .append("circle")
            .attr("r", 5)
            .style("fill", function (d) {
                if (d.name == "chicken")
                    return "Orange";
                if (d.name == "pork")
                    return "Pink";
                if (d.name == "beef")
                    return "Brown";
                if (d.name == "other")
                    return "Black"
                return "Green";
            });

        /* text not working, need to append to a title --> tooltip? https://stackoverflow.com/questions/17096004/appended-text-not-appearing-when-using-d3 
        node.append("text")
            .attr("dx", 12)
            .text(function (d) {
                return d.name;
            });
        */

        // https://bl.ocks.org/mbostock/4062045
        simulation.nodes(data.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(data.links);

        // taken from https://bl.ocks.org/mbostock/4062045
        function ticked() {
            link.attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node.attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        }

    });
}
loadNetwork();