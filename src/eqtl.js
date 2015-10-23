d3.json("/braineac2_d3_test/data/eqtl_mock.json", function(error, data) {
	if (error) throw error;

	var svg_width = 500;
	var svg_height = 50;

	var bar_width = Math.floor(svg_width / data.length);
	var bar_height = svg_height;

	var canvas = d3.select("body")
		.append("svg")
		.attr("width", svg_width)
		.attr("height", svg_height)
		.append("g")
		.attr("transform", "translate(10, 10)");

	var max_intensity = 0;
	data.forEach(function (element) {
		if (element.intensity > max_intensity) {
			max_intensity = element.intensity;
		}
	})

	var color_scale = d3.scale.linear()
		.domain([0, max_intensity])
		.range(["white", "blue"]);

	var bars = canvas.selectAll("rect")
		.data(data)
		.enter()
			.append("rect")
			.attr("width", bar_width)
			.attr("height", bar_height)
			.attr("fill", function(d) { return color_scale(d.intensity); })
			.attr("x", function(d, i) { return i*bar_width; })
	
});