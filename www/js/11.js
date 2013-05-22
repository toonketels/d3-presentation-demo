(function(d3){


/**
 * Update the scale and redraw
 *
 * Do:
 *  - change max_overall inside the update, only for the current year
 *  - recalc scale
 *  - update x axis
 *  - update bars
 *
 * Explain:
 */
 var margin = {top: 50, right: 20, bottom: 20, left: 120},
     canvas_d = {width: 700, height: 500},
     chart_d = {
       width: canvas_d.width -  margin.right - margin.left,
       height: canvas_d.height - margin.top - margin.bottom
     },
     max_overall,
     max_overall_prev,
     canvas,
     chart,
     x,
     y,
     axis_f_y,
     axis_y,
     axis_f_x,
     axis_x,
     bars;

  // Start...
  initialize();


  /**
   * Fetches the csv file
   */
  function initialize() {
    d3.csv('_data.csv', function(er, data) {
      initData(data);
    });
  }
  
  
  /**
   * Processes the data into
   * desired format,
   *
   * Calls draeChart to create the cart with data for year 2013.
   * Starts updating the chart with values of other years.
   */
  function initData(data) {
    var year = 2013;

    // Get the data for year 2013 and draw chart
    _data = getDataForYear(data, year);
    drawChart(_data);
  
    // Cycle through years and update chart.
    setInterval(function(data){
      year = year <= 2006 ? 2013 : year - 1;
      var __data = getDataForYear(data, year);
      updateChart(__data);
    }, 5000, data);
  }


  /**
   * Draws the actual chart.
   *
   * Just like we did before.
   */
  function drawChart(data) {

    max_overall = d3.max(data, function(d, i) { return d.value });
  
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
      .transition()
        .delay(800)
        .duration(800)
        .call(axis_y_f);
  
    axis_x = chart.append('g')
        .attr('class', 'axis x')
        .attr( 'transform', 'translate('+ 0 +', '+ chart_d.height +')' )
        .call(axis_x_f);
  
  
    /**
     * Draw chart content.
     */
    bars = chart.selectAll('rect')
        .data( data )
      .enter().append('rect')
        .attr('x', 0)
        .attr('width', 0)
        .attr('y', function(d, i) { return y(d.name) })
        .attr('height', y.rangeBand)
        .style('fill', '#333');
  
    bars
      .transition()
        .duration(600)
        .attr('width', function(d, i) { return x(d.value) })
      .transition()
        .duration(400)
        .style('fill', 'black')
  }


  /**
   * Updates the cart when new values arrive.
   */
  function updateChart(data) {

    // Set the current overal max
    max_overall_prev = max_overall;
    max_overall = d3.max(data, function(d, i) { return d.value });

    if (max_overall > max_overall_prev) {
      updateChartScaleFirst(data);
    } else {
      updateChartBarsFirst(data);
    }

  }


  function updateChartScaleFirst(data) {

    // Update the x scale
    x.domain([0, max_overall])
  
    // Update x axis
    axis_x
      .transition()
        .duration(600)
        .call(axis_x_f);

    // Update the bars
    bars
      .transition()
        .duration(600)
        .attr('width', function(d, i) { return x(d.value) });

    // Update the bars
    bars
        .data(data)
      .transition()
        .delay(800)
        .duration(600)
        .attr('width', function(d, i) { return x(d.value) });
  }

  function updateChartBarsFirst(data) {

    // Update the bars
    bars
        .data(data)
      .transition()
        .duration(600)
        .attr('width', function(d, i) { return x(d.value) });

    // Update the x scale
    x.domain([0, max_overall])
  
    // Update x axis
    axis_x
      .transition()
        .delay(600)
        .duration(600)
        .call(axis_x_f);

    // Update the bars
    bars
      .transition()
        .delay(600)
        .duration(600)
        .attr('width', function(d, i) { return x(d.value) });
  }



  /**
   * Helper to get the for a given year in the
   * correct format.
   */
  function getDataForYear(data, year) {
    var _data = data.map(function(d, i) {
      return {name: d.name, value: +d[year]};
    });

    return _data;
  }

})(d3);