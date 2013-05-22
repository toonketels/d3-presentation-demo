(function(d3){


/**
 * Introduce scales
 *
 * Explain:
 *   - create a linear scale with input domain and output range
 *   - use scale when drawing rect to we can ditch ratios
 *   - use x directly instead of within anonymous function for brevity
 */

  var data = [26009896, 179804755, 494478797, 2718505888, 1765686465, 4015692380, 3611612096],
      canvas_d = {width: 700, height: 500},
      max_overall = d3.max(data),
      canvas,
      x;

      console.log(max_overall);


  /**
   * Create x scale.
   */
  x = d3.scale.linear()
    .domain([0, max_overall])
    .range([0, canvas_d.width]);


  /**
   * Draw canvas.
   */
  canvas = d3.select('#canvas').append('svg')
      .attr('width', canvas_d.width)
      .attr('height', canvas_d.height);


  /**
   * Draw chart content.
   */
  // canvas.selectAll('rect')
  //     .data( data )
  //   .enter().append('rect')
  //     .attr('x', 0)
  //     .attr('width', function(d, i){ return x(d) })
  //     .attr('y',  function(d, i) { return 70 * i })
  //     .attr('height', 50);

  canvas.selectAll('rect')
      .data( data )
    .enter().append('rect')
      .attr('x', 0)
      .attr('width', x)
      .attr('y',  function(d, i) { return 70 * i })
      .attr('height', 50)

})(d3);