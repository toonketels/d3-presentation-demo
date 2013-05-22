(function(d3){


/**
 * Add labels
 *
 * Explain:
 *   - update data array
 *   - update max function with _accessor function_
 *   - use accessor function in calculating with rect
 */

  var data = [{value: 26009896, name: "angular.js"},
              {value: 179804755,  name: "backbone.js"},
              {value: 494478797,  name: "batman.js"},
              {value: 2718505888,  name: "ember.js"},
              {value: 1765686465,  name: "knockout.js"},
              {value: 4015692380,  name: "sammy.js"},
              {value: 3611612096, name: "spine.js"}];
      
  var margin = {top: 50, right: 20, bottom: 20, left: 100},
      canvas_d = {width: 700, height: 500},
      chart_d = {
        width: canvas_d.width -  margin.right - margin.left,
        height: canvas_d.height - margin.top - margin.bottom
      },
      max_overall = d3.max(data, function(d, i) { return d.value; }),
      canvas,
      chart,
      x,
      y,
      axis_x_f,
      axis_x;

      console.log(data);
      console.log(max_overall);


  /**
   * Create x scale.
   */
  x = d3.scale.linear()
      .domain([0, max_overall])
      .range([0, chart_d.width]);

  y = d3.scale.ordinal()
      .domain( data.map(function(d, i) { return d.name }) )
      .rangeBands([0, chart_d.height]);

  /**
   * Create axis generator.
   */


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
      .attr('width', function(d, i) { return x(d.value) })
      .attr('y',  function(d, i) { return y(d.name) })
      .attr('height', 40)

})(d3);