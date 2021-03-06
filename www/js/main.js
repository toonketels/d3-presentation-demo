(function(d3){

  // Grab the data...
  d3.csv('data.csv', function(er, data){
    // Circulation sales groups
    setupChart(data);
    console.log(data);
  });


  function setupChart(data) {

    var max_overall = getOverallMax(data),
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


    /**
     * Scale functions...
     */
    x = d3.scale.linear()
        .domain([0, max_overall])
        .range([0, chart_d.width]);

    y = d3.scale.ordinal()                                  // Return unique values
        .domain( data.map(function(d){ return d['name'] }))
        .rangeBands([0, chart_d.height], 0.2);

    /**
     * Axis functions
     */
    axis_f_x = d3.svg.axis()
        .scale(x)
        .orient('top')
        .ticks(5)
        .tickPadding(15)
        .tickSize(30, 0, 0);

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
        //.attr( 'transform', 'translate(0, '+ chart_d.height +')' )
        .attr( 'transform', 'translate(0, '+ 0 +')' )
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
        .attr('y',  function(d,i) { return y( d['name'] ) })
        .attr('height', y.rangeBand())
      .transition()
        .duration(500)
        .attr('width', function(d , i){ return x( +d['2013'] ) })



  }


  function getOverallMax(data) {
    return d3.max(data, function(d, i) {
      var key,
          max = 0;

      for(key in d) {
        max = (key !== "name" && +d[key] > max) ? +d[key] : max;
      }
      return max;
    }); 
  }

})(d3);