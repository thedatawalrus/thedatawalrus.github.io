var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// var x = d3.scale.linear()
//     .range([0, width]);

var x = d3.scale.ordinal()
    .domain(["","Second Round", "Sweet 16", "Elite Eight", "Final Four", "National Championship"," "])
    .rangePoints([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var div = d3.select("body").append("div") 
              .attr("class", "viztooltip")        
              .style("opacity", 0);


var colorPlot = d3.scale.ordinal()
              .domain([" ","Second Round", "Sweet 16", "Elite Eight", "Final Four", "National Championship"," "])
              .range([" ", "#74363E","#643F4B", "#816881", "#657494", "#4F7A9D", " "])
              ;

var xAxisPlot = d3.svg.axis()
    .scale(x)
    // .ticks(5)
    .orient("bottom");


var yAxisPlot = d3.svg.axis()
// .tickSize(-10)
    .scale(y)
    .orient("left");

// var svg = d3.select("div#containerPlot").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var svgPlot = d3.select("div#containerPlot")
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
            .classed("svg-content", true)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.json("/static/datawalrus/data/ncaa_export.json", function(error, data) {
  if (error) throw error;


    var filtered=data.data.filter(function(item){
    return item.Year=="2017";         
    });
    console.log(filtered);


  y.domain([0, d3.max(data.data, function(d) { return d.Average; })]).nice();


  svgPlot.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisPlot)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .style("fill", "#828282")
      .text("Round");

  svgPlot.append("g")
      .attr("class", "y axis")
      .call(yAxisPlot)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("fill", "#828282")
      .text("Avg Seed")

  svgPlot.selectAll(".dot")
      .data(data.data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 8)
      .attr("cx", function(d) { return x(d.Round); })
      .attr("cy", function(d) { return y(d.Average); })
      .style("fill", "#623cea")
      // .style("fill", function(d) { return colorPlot(d.Round); })
      .on("mouseover", function(d) {

            var pageX=d3.event.pageX;
              var pageY=d3.event.pageY;

          div.style("opacity", 1);  

          div.text("")
            .style("left", (pageX) + "px")    
            .style("top", (pageY - 28) + "px");

          div.append("p")
            .style("font-weight", "bold")
            .text("Year");

          div.append("p")
            .text(d.Year);

          div.append("p")
            .style("font-weight", "bold")
            .text("Avg Seed");

          div.append("p")
            .text(d3.format(".2f")(d.Average));

          // div.append("p")
          //   .text("Seed " + d.Seed);
          // div.append("p")
          //   .text(createTable(d.Seed));

          div.append("p")
            .style("font-weight", "bold")
            .text("Teams");

          div.append("p")
            .text(d.SeedSchool);

         })
         .on("mouseout", function() {
         
          div.style("opacity", 0);
          
         });


// Year averages

 svgPlot.selectAll(".line")
       .data(filtered)
       .enter().append("line")
       .attr("class", "aLine")
       .attr("y1", function(d) { return y(d.OverallAverage); })
       .attr("y2", function(d) { return y(d.OverallAverage); })
       .attr("x1", function(d) { return x(d.Round)-25; })
       .attr("x2", function(d) { return x(d.Round)+25; })
       .style("stroke", "#f45866")
       // .style("stroke-dasharray", ("3, 2"))
       .style("stroke-width", "3px")
       .on("mouseover", function(d) {

            var pageX=d3.event.pageX;
            var pageY=d3.event.pageY;

          div.style("opacity", 1);  

          div.text("")
            .style("left", (pageX) + "px")    
            .style("top", (pageY - 28) + "px");

          div.append("p")
            .text("Average Madness: " + d3.format(".2f")(d.OverallAverage));

         })
         .on("mouseout", function() {
         
          div.style("opacity", 0);
          
         })

// Expected Value

 svgPlot.selectAll(".line")
       .data(filtered)
       .enter().append("line")
       .attr("class", "eLine")
       .attr("y1", function(d) { return y(d.Expected); })
       .attr("y2", function(d) { return y(d.Expected); })
       .attr("x1", function(d) { return x(d.Round)-25; })
       .attr("x2", function(d) { return x(d.Round)+25; })
       // .style("stroke", "#d65353")
       .style("stroke", "#00bfb2")
       // .style("stroke-dasharray", ("3, 2"))
       .style("stroke-width", "3px")
       .on("mouseover", function(d) {

            var pageX=d3.event.pageX;
            var pageY=d3.event.pageY;

          div.style("opacity", 1);  

          div.text("")
            .style("left", (pageX) + "px")    
            .style("top", (pageY - 28) + "px");

          div.append("p")
            .text("Expected Madness: " + d.Expected);

         })
         .on("mouseout", function() {
         
          div.style("opacity", 0);
          
         })

});
