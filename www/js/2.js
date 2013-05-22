(function(d3){


/**
 * Draw a canvas and rectangles.
 *
 * Explain:
 *   data binding, enter, how d3 executes functions as second param if function
 *    __data__
 *
 */

  var data = [26009896, 179804755, 494478797, 2718505888, 1765686465, 4015692380, 3611612096],
      canvas_d = {width: 700, height: 500},
      max_overall = d3.max(data),
      canvas;



  /**
   * Draw canvas.
   */
  canvas = d3.select('#canvas').append('svg')
      .attr('width', canvas_d.width)
      .attr('height', canvas_d.height);


  /**
   * Draw chart content.
   */
  // data.map(function(d, i) {
  //   canvas.append('rect')
  //    .attr('x', 0 )
  //    .attr('width', canvas_d.width * (d/max_overall))
  //    .attr('y', 70 * i)
  //    .attr('height', 50)
  // });


  // data.map(function(d, i) {
  //   canvas.append('rect')
  //    .attr('x', 0 )
  //    .attr('width', (function(d, i) {
  //      return canvas_d.width * (d/max_overall)
  //    })(d, i))
  //    .attr('y', (function(d, i) {
  //      return 70 * i;
  //    })(d, i))
  //    .attr('height', 50)
  // });


   data.map(function(d, i) {
     canvas.append('rect')
      .attr('x', (function(d, i) {
        return 0;
      })(d, i))
      .attr('width', (function(d, i) {
        return canvas_d.width * (d/max_overall)
      })(d, i))
      .attr('y', (function(d, i) {
        return 70 * i;
      })(d, i))
      .attr('height', (function(d, i) {
        return 50;
      })(d, i))
   });


  canvas.selectAll('rect')
      .data( data )
    .enter().append('rect')
      .attr('x', function(d, i) {
        return 0;
      })
      .attr('width', function(d, i){
        return canvas_d.width * (d/max_overall);
      })
      .attr('y',  function(d, i) {
        return 70 * i;
      })
      .attr('height', function(d, i) {
        return 50;
      })


  canvas.selectAll('rect')
      .data( data )
    .enter().append('rect')
      .attr('x', 0 )
      .attr('width', function(d, i){
        return canvas_d.width * (d/max_overall);
      })
      .attr('y',  function(d, i) {
        return 70 * i;
      })
      .attr('height', 50)


  canvas.selectAll('rect')
      .data( data )
    .enter().append('rect')
      .attr('x', 0)
      .attr('width', function(d, i){ return canvas_d.width * (d/max_overall) })
      .attr('y',  function(d, i) { return 70 * i })
      .attr('height', 50)

})(d3);