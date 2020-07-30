var origin 	= [480, 250], startAngle = 0;
var data 	= [[{'x':1,'y':1,'z':-1},{'x':-1,'y':1,'z':-1}],[{'x':-1,'y':-1,'z':-1},{'x':1,'y':-1,'z':-1}],[{'x':1,'y':1,'z':-1},{'x':1,'y':-1,'z':-1}],[{'x':-1,'y':1,'z':-1},{'x':-1,'y':-1,'z':-1}],[{'x':1,'y':1,'z':1},{'x':-1,'y':1,'z':1}],[{'x':-1,'y':-1,'z':1},{'x':1,'y':-1,'z':1}],[{'x':1,'y':1,'z':1},{'x':1,'y':-1,'z':1}],[{'x':-1,'y':1,'z':1},{'x':-1,'y':-1,'z':1}],[{'x':-1,'y':1,'z':1},{'x':-1,'y':1,'z':-1},],[{'x':1,'y':1,'z':1},{'x':1,'y':1,'z':-1},],[{'x':-1,'y':-1,'z':1},{'x':-1,'y':-1,'z':-1},],[{'x':1,'y':-1,'z':1},{'x':1,'y':-1,'z':-1},]];
var svg     = d3.select('svg').append('g');

var _3d = d3._3d()
		.scale(50)
		.origin(origin)
		.rotateX(startAngle)
		.rotateY(startAngle)
		.primitiveType('LINES');

var data3D  = _3d(data);


function processData(data){

    var lines = svg.selectAll('line').data(data);

	lines.enter()
		.append('line')
 		.merge(lines)
 		.attr('fill', d3.color('black'))
 		.attr('stroke', d3.color('black'))
 		.attr('stroke-width', 1)
 		.attr('x1', function(d){ return d[0].projected.x; })
 		.attr('y1', function(d){ return d[0].projected.y; })
 		.attr('x2', function(d){ return d[1].projected.x; })
 		.attr('y2', function(d){ return d[1].projected.y; });

	lines.exit().remove();
}

processData(data3D);