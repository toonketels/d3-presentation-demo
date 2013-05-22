(function(d3){


/**
 * Change source add labels
 *
 * Do:
 *   - change data source
 *   - update max_overall with data accessor  => lop abels show
 *   - update ordinal scale => left labels from [objec] to correct
 *   - update x,y function in rect with data accessor
 *   - update the padding right (100 => 120)
 *
 * Explain:
 *   - data accessor
 *   - ordinal scale: needs to be unique
 */

  var data = [{value: 26009896, name: "angular.js"},
              {value: 179804755,  name: "backbone.js"},
              {value: 494478797,  name: "batman.js"},
              {value: 2718505888,  name: "ember.js"},
              {value: 1765686465,  name: "knockout.js"},
              {value: 4015692380,  name: "sammy.js"},
              {value: 3611612096, name: "spine.js"}];

  var margin = {top: 50, right: 20, bottom: 20, left: 120},
      canvas_d = {width: 700, height: 500},
      chart_d = {
        width: canvas_d.width -  margin.right - margin.left,
        height: canvas_d.height - margin.top - margin.bottom
      },
      max_overall = d3.max(data, function(d, i) { return d.value }),
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
      .domain(data.map(function(d, i){ return d.name }))
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
      .attr('width', function(d, i) { return x(d.value) })
      .attr('y', function(d, i) { return y(d.name) })
      .attr('height', y.rangeBand);

})(d3);