(function(d3){


/**
 * Add x Axis
 *
 * Explain:
 *   - add axis creator function (with scale and orient)
 *   - add axis  (line is hidden via css)
 *   - update creator with padding / ticks => make less ticks
 *   - add height main ticks => update creator + g translate
 *   - add subTicks => update creator: tickSubdivide + give them height  // color via css
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
      x,
      y,
      axis_f_y,
      axis_y,
      axis_f_x,
      axis_x;


  /**
   * Create scales.
   */
  x = d3.scale.linear()
      .domain([0, max_overall])
      .range([0, chart_d.width]);

  y = d3.scale.ordinal()
      .domain(data)
      .rangeBands([0, chart_d.height], 0.1);


  /**
   * Axis creators.
   */
  axis_y_f = d3.svg.axis()
      .scale(y)
      .orient('left')
      .tickPadding(30)
      .tickSize(0, 0, 0);

  axis_x_f = d3.svg.axis()
      .scale(x)
      .orient('top')
      .tickPadding(10)
      .ticks(5)
      .tickSize(chart_d.height, chart_d.height, 0)
      .tickSubdivide(2)


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
   * Draw axis.
   */
  axis_y = chart.append('g')
      .attr('class', 'axis y')
      .call(axis_y_f);

  axis_x = chart.append('g')
      .attr('class', 'axis x')
      .attr( 'transform', 'translate('+ 0 +', '+ chart_d.height +')' )
      .call(axis_x_f);


  /**
   * Draw chart content.
   */
  chart.selectAll('rect')
      .data( data )
    .enter().append('rect')
      .attr('x', 0)
      .attr('width', x)
      .attr('y', y)
      .attr('height', y.rangeBand);

})(d3);