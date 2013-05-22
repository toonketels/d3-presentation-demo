(function(d3){


/**
 * Introduce linear scales
 *
 * Explain:
 *   - create a linear scale with input domain and output range
 *   - use scale when drawing rect to we can ditch ratios
 *   - use x directly instead of within anonymous function for brevity
 */

  var data = [26009896, 179804755, 494478797, 2718505888, 1765686465, 4015692380, 3611612096],
      margin = {top: 50, right: 20, bottom: 20, left: 100},
      canvas_d = {width: 700, height: 500},
      chart_d = {
        width: canvas_d.width -  margin.right - margin.left,
        height: canvas_d.height - margin.top - margin.bottom
      },
      max_overall = d3.max(data),
      canvas,
      chart,
      x;


  /**
   * Create x scale.
   */
  x = d3.scale.linear()
    .domain([0, max_overall])
    .range([0, chart_d.width]);


  /**
   * Draw canvas and chart
   */
  canvas = d3.select('#canvas').append('svg')
      .attr('width', canvas_d.width)
      .attr('height', canvas_d.height);

  chart = canvas.append('g')
      .attr( 'transform', 'translate('+ margin.left +', '+ margin.top +')' )
        .attr( 'width' , chart_d.width)
        .attr('height', chart_d.height);


  /**
   * Draw chart content.
   */
  // chart.selectAll('rect')
  //     .data( data )
  //   .enter().append('rect')
  //     .attr('x', 0)
  //     .attr('width', function(d, i){ return x(d) })
  //     .attr('y',  function(d, i) { return 60 * i })
  //     .attr('height', 50);

  chart.selectAll('rect')
      .data( data )
    .enter().append('rect')
      .attr('x', 0)
      .attr('width', x)
      .attr('y',  function(d, i) { return 60 * i })
      .attr('height', 50);

})(d3);