
function main() {
	var width = 500,
		height = 500;

	var color = d3.scale.category20();

	var force = d3.layout.force()
		.linkDistance(6)
		.linkStrength(2)
		.size([width, height]);

	var svg = d3.select("#test_here").append("svg")
		.attr("width", width)
		.attr("height", height);

	d3.json("/braineac2_d3_test/data/les_mis.json", function(error, graph) {
	  if (error) throw error;

	  var nodes = graph.nodes.slice(),
		  links = [],
		  bilinks = [];

	  graph.links.forEach(function(link) {
		var s = nodes[link.source],
			t = nodes[link.target],
			i = {}; // intermediate node
		nodes.push(i);
		links.push({source: s, target: i}, {source: i, target: t});
		bilinks.push([s, i, t]);
	  });

	  force
		  .nodes(nodes)
		  .links(links)
		  .start();

		var link = svg.selectAll(".link")
		  .data(bilinks)
		  .enter().append("path")
		  .style("stroke", "red")    // set the line colour
		  .style("fill", "none");    // set the fill colour 
		  ;

	  var node = svg.selectAll(".node")
		  .data(graph.nodes)
		  .enter().append("circle")
		  .attr("class", "node")
		  .attr("r", 10)
		  .style("fill", function(d) { return color(d.group); })
		  .style("stroke", "white")    // set the line colour
		  .call(force.drag);

	  node.append("title")
		  .text(function(d) { return d.name; });

	  force.on("tick", function() {
		link.attr("d", function(d) {
		  return "M" + d[0].x + "," + d[0].y
			  + "S" + d[1].x + "," + d[1].y
			  + " " + d[2].x + "," + d[2].y;
		});
		node.attr("transform", function(d) {
		  return "translate(" + d.x + "," + d.y + ")";
		});
	  });
	});
}

$(document).ready(function() {
    $('#example').DataTable();
} );
