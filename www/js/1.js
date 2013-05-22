(function(d3){


  var data = [10, 30, 65, 40];
  setupChart(data);

  function setupChart(data) {

    var max_overall = d3.max(data),
        margin = {top: 50, right: 20, bottom: 20, left: 100},
        canvas_d = {width: 700, height: 500},
        chart_d = {
          width: canvas_d.width -  margin.right - margin.left,
          height: canvas_d.height - margin.top - margin.bottom
        },
        canvas,
        chart,
        x,
        y,
        axis_f_x,
        axis_f_y,
        axis_x,
        axis_y;

    console.log(data);


    /**
     * Scale functions...
     */
    x = d3.scale.linear()
        .domain([0, max_overall])
        .range([0, chart_d.width]);

    y = d3.scale.ordinal()                                  // Return unique values
        .domain( data.map(function(d, i) { return i; }) )
        .rangeBands([0, chart_d.height], 0.2);

    /**
     * Axis functions
     */
    axis_f_x = d3.svg.axis()
        .scale(x)
        .orient('top')
        .ticks(5)
        .tickSubdivide(1)
        .tickPadding(15)
        .tickSize(chart_d.height, chart_d.height, 0);

    axis_f_y = d3.svg.axis()
        .scale(y)
        .tickPadding(30)
        .orient('left')
        .tickSize(0, 0, 0);


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
    axis_x = chart.append('g')
        .attr('class', 'x axis')
        .attr( 'transform', 'translate(0, '+ chart_d.height +')' )
        .call(axis_f_x);
    
    axis_y = chart.append('g')
        .attr('class', 'y axis')
        .call(axis_f_y)
        .selectAll('text')
        .attr('style', 'text-anchor: start')
        .attr('x', -100);


    /**
     * Draw chart content.
     */
    chart.selectAll('rect')
        .data( data )
      .enter().append('rect')
        .attr('x', 0 )
        .attr('width', 0)
        .attr('y',  y)
        .attr('height', y.rangeBand())
      .transition()
        .duration(500)
        .attr('width', x)



  }


})(d3);