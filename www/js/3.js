(function(d3){


/**
 * Add margin and chart
 *
 * Explain:
 *   - add variables with different with/height
 *   - add chart
 *   - append from chart / use chart_d instead of canvas_d
 *
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
      chart;



  /**
   * Draw canvas.
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
  chart.selectAll('rect')
      .data( data )
    .enter().append('rect')
      .attr('x', 0)
      .attr('width', function(d, i){ return chart_d.width * (d/max_overall) })
      .attr('y',  function(d, i) { return 60 * i })
      .attr('height', 50)

})(d3);