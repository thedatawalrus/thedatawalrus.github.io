			// var dataset = (function () {
			//     var json = null;
			//     $.ajax({
			//         'async': false,
			//         'global': false,
			//         'url': "ncaa_dist.json",
			//         'dataType': "json",
			//         'success': function (data) {
			//           json = data;
			//         }
			//     });
			//     return json;
			// })(); 

			

			//Width and height
			// var w = 600;
			// var h = 250;
			var formatPercent = d3.format(".0%");

			var margin = {top: 20, right: 20, bottom: 30, left: 50},
			    w = 960 - margin.left - margin.right,
			    h = 500 - margin.top - margin.bottom;

			var xScale = d3.scale.ordinal()
							.domain(d3.range(1,data.SecondRound.length+1))
							.rangeBands([0, w], 0.4);

			var yScale = d3.scale.linear()
							.domain([0,d3.max(data.SecondRound, function(d) { return +d.Percent; })])
							// .domain([0,1])
							.range([h, 0]);
			
			var xAxis = d3.svg.axis()
			    .scale(xScale)
			    // .ticks(5)
			    .orient("bottom");


			var yAxis = d3.svg.axis()
			// .tickSize(-10)
			    .scale(yScale)
			    .orient("left")
			    .tickFormat(formatPercent);

			//Create SVG element
			// var svg = d3.select("div#containerBar")
			// 			.append("svg")
			// 			.attr("width", w + margin.left + margin.right)
			// 		    .attr("height", h + margin.top + margin.bottom)
			// 		    .append("g")
			// 		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			var svg = d3.select("div#containerBar")
			.append("svg")
			.attr("preserveAspectRatio", "xMinYMin meet")
			.attr("viewBox", "0 0 " + (w + margin.left + margin.right) + " " + (h + margin.top + margin.bottom))
			.classed("svg-content", true)            
			.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var color = d3.scale.linear()
              .domain(d3.range(data.SecondRound.length))
              .range(["#74363E","#643F4B"])
              ;


			var div = d3.select("body").append("div") 
              .attr("class", "viztooltip")        
              .style("opacity", 0);


d3.json("ncaa_dist.json", function(error, data) {
  if (error) throw error;

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + h + ")")
		      .call(xAxis)
		      .append("text")
		      .attr("class", "label")
		      .attr("x", w)
		      .attr("y", -6)
		      .style("text-anchor", "end")
		      .style("fill", "#828282")
		      .text("Seed");

		  svg.append("g")
		      .attr("class", "y axis")
		      .call(yAxis)
		      .append("text")
		      .attr("class", "label")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .style("fill", "#828282")
		      .text("% Appearing")

			//Create bars
			svg.selectAll("rect")
			   .data(data.SecondRound)
			   .enter()
			   .append("rect")
			   .attr("x", function(d) {
			   		return xScale(d.Seed);
			   })
			   .attr("y", function(d) {
			   		return yScale(d.Percent);
			   })
			   .attr("width", xScale.rangeBand())
			   .attr("height", function(d) {
			   		return yScale(0) - yScale(d.Percent);
			   })
			   // .style("fill", function(d) { return color(d.Seed); })
			   .style("fill", "#623cea")
			   .on("mouseover", function(d) {

			   	  var pageX=d3.event.pageX;
		          var pageY=d3.event.pageY;

		          div.style("opacity", 1);

	   //        	if(d.Round == "SecondRound"){
				// 	roundNum = 32;
				// }else if(d.Round == "Sweet16"){
				// 	roundNum = 16;
				// }else if(d.Round == "EliteEight"){
				// 	roundNum = 8;
				// }else if(d.Round == "FinalFour"){
				// 	roundNum = 4;
				// }else{
				// 	roundNum = 4;
				// }

		  //         var upset = roundNum/4

			   	    if(d.YearSchool.length <= 30)
			          {
			           
			         div.text("")
			            .style("left", (pageX) + "px")    
			            .style("top", (pageY - 28) + "px");

			         div.text("")
			            .style("left", (pageX) + "px")    
			            .style("top", (pageY - 28) + "px");


			         div.append("p")
			            .style("font-weight", "bold")
			            .text(d.Round);


			          div.append("p")
			            // .style("font-weight", "bold")
			            .text(d3.format(".0%")(d.Percent) + " of " + d.Seed + " Seeds");


			          div.append("p")
			            .style("font-weight", "bold")
			            .text("Teams");

			          div.append("p")
			            .text(d.YearSchool.reverse());

			          }
			          else
			          {

			         div.text("")
			            .style("left", (pageX) + "px")    
			            .style("top", (pageY - 28) + "px");


			          div.append("p")
			            .style("font-weight", "bold")
			            .text(d.Round);


			          div.append("p")
			            // .style("font-weight", "bold")
			            .text(d3.format(".0%")(d.Percent) + " of " + d.Seed + " Seeds");

			          div.append("p")
			            .style("font-weight", "bold")
			            .text("Teams");

			          div.append("p")
			            .text("Too many to list!")
			           
			          }

		         })
		         .on("mouseout", function() {
		         
		          	  div.style("opacity", 0);
		          
		         });


			//On click, update with new data			
			d3.selectAll(".m")
				.on("click", function() {

					var round = this.getAttribute("value");

					var data;

					if(round == "Second Round"){
						data = data.SecondRound;
					}else if(round == "Sweet 16"){
						data = data.Sweet16;
					}else if(round == "Elite Eight"){
						data = data.EliteEight;
					}else if(round == "Final Four"){
						data = data.FinalFour;
					}else{
						data = data.NationalChampionship;
					}



					xScale.domain(d3.range(1, data.length+1));

					yScale.domain([0,d3.max(data, function(d) { return +d.Percent; })]);

					xAxis.scale(xScale);

					yAxis.scale(yScale);


					var bars = svg.selectAll("rect")			//Select all bars
						.data(data);							//Re-bind data to existing bars, return the 'update' selection
																//'bars' is now the update selection
					
					//Enter…
					bars.enter()								//References the enter selection (a subset of the update selection)
						.append("rect")							//Creates a new rect
						.attr("x", w)							//Sets the initial x position of the rect beyond the far right edge of the SVG
						.attr("y", function(d) {				//Sets the y value, based on the updated yScale
							return h - yScale(d.Percent);
						})
						.attr("width", xScale.rangeBand())		//Sets the width value, based on the updated xScale
						.attr("height", function(d) {			//Sets the height value, based on the updated yScale
							return yScale(d.Percent);
						})
						// .style("fill", function(d) { return color(d.Seed); })
						.style("fill", "#623cea")
						.on("mouseover", function(d) {

					   	  var pageX=d3.event.pageX;
				          var pageY=d3.event.pageY;

				          div.style("opacity", 1);

			

					   	    if(d.YearSchool.length <= 30)
					          {
					           
					         div.text("")
					            .style("left", (pageX) + "px")    
					            .style("top", (pageY - 28) + "px");

					         div.text("")
					            .style("left", (pageX) + "px")    
					            .style("top", (pageY - 28) + "px");


					         div.append("p")
					            .style("font-weight", "bold")
					            .text(d.Round);


					          div.append("p")
					            // .style("font-weight", "bold")
					            .text(d3.format(".0%")(d.Percent) + " of " + d.Seed + " Seeds");


					          div.append("p")
					            .style("font-weight", "bold")
					            .text("Teams");

					          div.append("p")
					            .text(d.YearSchool.reverse());

					          }
					          else
					          {

					         div.text("")
					            .style("left", (pageX) + "px")    
					            .style("top", (pageY - 28) + "px");


					          div.append("p")
					            .style("font-weight", "bold")
					            .text(d.Round);


					          div.append("p")
					            // .style("font-weight", "bold")
					            .text(d3.format(".0%")(d.Percent) + " of " + d.Seed + " Seeds");

					          div.append("p")
					            .style("font-weight", "bold")
					            .text("Teams");

					          div.append("p")
					            // .text(d.YearSchool.reverse()[0,10]);
					            .text("Too many to list!")
					           
					          }

				         })
				         .on("mouseout", function() {
				         
				          	  div.style("opacity", 0);
				          
				         });

					//Update…
					bars.transition()							//Initiate a transition on all elements in the update selection (all rects)
						.duration(500)
						.ease("circle")
						.attr("x", function(d) {				//Set new x position, based on the updated xScale
							return xScale(d.Seed);
						})
						.attr("y", function(d) {
					   		return yScale(d.Percent);
					   	})
					  	.attr("width", xScale.rangeBand())
					   	.attr("height", function(d) {
					   		return yScale(0) - yScale(d.Percent);
					   });

					//Exit…
					bars.exit()				//References the exit selection (a subset of the update selection)
						.transition()		//Initiates a transition on the one element we're deleting
						.duration(500)
						.ease("circle")
						.attr("x", w)		//Move past the right edge of the SVG
						.remove();   		//Deletes this element from the DOM once transition is complete

						
					svg.select(".x.axis")
						   .transition()
						   .duration(500)
						   .ease("circle")
						   .call(xAxis);

					svg.select(".y.axis")
					   .transition()
					   .duration(500)
					   .ease("circle")
					   .call(yAxis);

					   				
				})
		});
