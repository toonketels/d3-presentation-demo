(function(d3){

  var data = [100, 200, 300, 400, 500, 600]

  var canvas = d3.select('svg');

  // Select and join with data
  var circles = canvas.selectAll('circle')
    .data( data );

  // Update exiting elements
  circles
    .transition()
      .delay(2000)
      .duration(500)
      .attr('r', 40);


  // Add new elements
  circles.enter().append('circle')
      .attr('cx', function(d, i){ return d })
      .attr('cy', 250)
      .attr('r', 0)
      .style('fill', 'green')
    .transition()
      .delay(4000)
      .duration(500)
      .attr('r', 15);

  // Update all elements
  circles
    .transition()
      .delay(6000)
      .duration(500)
      .style('fill', 'blue');

  setTimeout(function(circles){

    var circles = canvas.selectAll('circle')
      .data( [100, 200] );

    circles.exit()
      .transition()
        .duration(500)
        .attr('r', 5)
        .remove();
    

  }, 8000, circles);





})(d3);