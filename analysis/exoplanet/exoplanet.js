var cumulative = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "analysis/exoplanet/cumulative.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

var exoplanet = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "analysis/exoplanet/exoplanet.json",
        'dataType': "json",
        'success': function (data) {
          json = data;
        }
        
    });
    return json;
})(); 



for (i = 0; i<exoplanet.length;i++)
{
   var singleItem = exoplanet[i];
   singleItem.kepler_name = exoplanet[i].pl_hostname + " " + exoplanet[i].pl_letter; // example
}

var dataset = cumulative;// Copying Source2 to a new Object

for (j = 0; j<cumulative.length;j++)
{
   var cumulativeKeplerName = cumulative[j].kepler_name;
   var cumulativeRade = cumulative[j].koi_prad;
   var mergeItem = dataset[j];

    for (i = 0; i<exoplanet.length;i++)
    {
    	mergeItem.habFlag = 1;
        mergeItem.radeFlag = 1;

       if(exoplanet[i].pl_rade != null)
          {
            if(exoplanet[i].kepler_name == cumulativeKeplerName)
            {
              mergeItem.rade = exoplanet[i].pl_rade;
              break
            }
          }
          else
          {
            mergeItem.rade = cumulativeRade;
          }
    }
}

var valueArray = [];

			
	for (i = 0; i<= d3.round(d3.max(dataset, function(d) { return +d.rade; }));i++)
		{
		   	if(i == 1) 
    			{valueArray.push("Earth")} 
    		else 
    			{
    				if(i == 11)
    					{valueArray.push("Jupiter")} 
    					else {
    							// if(i==d3.round(d3.max(dataset, function(d) { return +d.rade; })))
    							// 	{valueArray.push(i+"")}
    							// 	else
    								valueArray.push(i)
    						}
    			}		
    	};


$("#example_id").ionRangeSlider({
	type: "double",
    min: 0,
    max: d3.round(d3.max(dataset, function(d) { return +d.rade; })),
    from: 0,
    to: d3.round(d3.max(dataset, function(d) { return +d.rade; })),
    // step: 1,
    // force_edges: true,
    // postfix: "xEarth",
    // grid: true,
    // grid_num: 30,
    // grid_snap: true,
    keyboard: true,
    hide_min_max: true,
    // hide_from_to: true,
    values: valueArray,
    onFinish: function (data) {
    	function value(dataPoint)
    	{
    		if(dataPoint == "Earth") 
    			{return 1} 
    		else 
    			{
    				if(dataPoint == "Jupiter")
    					{return 11} 
    					else {return dataPoint}
    			}
    	}
        updateSlider(value(data.from),value(data.to));
        console.log(valueArray);
    }
});


//Width and height
			var w = 1200;
			var h = 700;
			var clicked = 0;
			// var legendRectSize = 18;                                  // NEW
   //      	var legendSpacing = 4;                                    // NEW


			var svg = d3.select("div#container")
						.append("svg")
						.attr("preserveAspectRatio", "xMinYMin meet")
						.attr("viewBox", "0 0 " + w + " " + h)
						.classed("svg-content", true);

			var div = d3.select("body").append("div")	
					    .attr("class", "viztooltip")				
					    .style("opacity", 0);






			var xScale = d3.scale.linear()
							.domain([d3.min(dataset, function(d) { return +d.koi_fwm_sdec; }), d3.max(dataset, function(d) { return +d.koi_fwm_sdec; })])
							.range([50, w-200]);


			var yScale = d3.scale.linear()
							.domain([d3.min(dataset, function(d) { return +d.koi_fwm_sra; }), d3.max(dataset, function(d) { return +d.koi_fwm_sra; })])
							.range([50, h-100]);


			var colorScale = d3.scale.quantize()
							.domain([d3.min(dataset, function(d) { return +d.koi_teq; }), d3.mean(dataset, function(d) { return +d.koi_teq; }) + (3 * d3.deviation(dataset, function(d) { return +d.koi_teq; }))])
							.range(["#393b79","#9192b4","#b28688","#8d4a4d"])
							;


			var rScale = d3.scale.quantize()
								 .domain([0, d3.max(dataset, function(d) { return +d.rade; })])
							     .range([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]);

			// var rScale = d3.scale.quantize()
			// 		 .domain([0, d3.mean(dataset, function(d) { return +d.rade; }) + (3 * d3.deviation(dataset, function(d) { return +d.rade; }))])
			// 	     .range([3,4,5,6,7,8,9,10]);


			var formatAsNumber = d3.format(",");

			colorScaleHab = colorScale.copy();
	    	colorScaleHab.domain([180, 400]);



			svg.selectAll("circle")
			   .data(dataset)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(+d.koi_fwm_sdec);
			   })
			   .attr("cy", function(d) {
			   		return yScale(+d.koi_fwm_sra);
			   })
			   .attr("r", function(d) {
			   		return rScale(+d.rade)+3;
			   })
		   		.attr("fill", function(d) {
				return colorScale(d.koi_teq);
		   		})
		   		.on("mouseover", function(d) {

		   			var pageX=d3.event.pageX;
        			var pageY=d3.event.pageY;

					div.style("opacity", 1);	

					div.text("Kepler Object Details")
						.style("left", (pageX) + "px")		
						.style("top", (pageY - 28) + "px");

					div.append("p")
						.text("ID: " + d.kepler_name);

					div.append("p")
						.text("Temperature: " + formatAsNumber(d.koi_teq));

					div.append("p")
						.text("Earth Radii: " + formatAsNumber(d.rade));

			   })
			   .on("mouseout", function() {
			   
					div.style("opacity", 0);
					
			   });



		
		column("legend", colorScale);
		column("legend", colorScaleHab);

		 function column(title, scale) {
				  var legend = d3.legend.color()
				  	.shapeHeight(30)
				  	.title("Temperature (k)")
				  	// .labelDelimiter("    ")
				    .labelFormat(d3.format(",.0f"))
				    .cells(10)
				    .scale(scale);

				  // var div = d3.select("body").append("div")
				  //   .attr("class", "column");

				  // div.append("h4").text(title);
				    
				  // var svg = div.append("svg");

				  if(scale == colorScale)
				  	{

				  	svg.append("g")
				    .attr("class", "legendQuant")
				    .attr("transform", "translate("+(w-150)+",20)")
				    ;

				    svg.select(".legendQuant")
				    .call(legend);

				   
					}
					else
					{

					svg.append("g")
				    .attr("class", "legendQuantHab")
				    .attr("transform", "translate("+(w-150)+",20)");

				    svg.select(".legendQuantHab")
				    .call(legend);

				    svg.select(".legendQuantHab")
				    .attr("opacity",0);

					}

				  
				};

			function updateSlider(slideMinAmount,slideMaxAmount) 
				{
					
					var circles =svg.selectAll("circle")
    								.data(dataset);
    	

					circles.transition()
							.duration(500)
							.style("opacity", function(d) {
								if(+d.rade <= +slideMaxAmount && +d.rade >= +slideMinAmount)
								{
									d.radeFlag = 1;
									if(d.habFlag == 1)
			    					{
			    						return 1;
			    						
			    					}
			    					else
			    					{	
			    						return 0;
			    					}
								}
		    					else
		    					{
		    						d.radeFlag = 0
		    						return 0;
		    						
			    				}
    						})
							.style("pointer-events", function(d) {
								if(+d.rade <= +slideMaxAmount && +d.rade >= +slideMinAmount && d.habFlag == 1)
			    					{
			    						return "all";
			    					}
			    					else
			    					{
			    						return "none";
			    					}
    							})

					
				};

			 function updateData() {
			 	

					var circles = svg.selectAll("circle")
    				.data(dataset);

    				var updateDuration = 1;

	    				if (clicked == 0)
	    				{

	    					svg.select(".legendQuant")
	    					.transition()
							.duration(500)
				    		.attr("opacity",0);

	    					svg.select(".legendQuantHab")
	    					.transition()
							.duration(500)
				    		.attr("opacity",1);

	    					circles.transition()
								.delay(function(d, i) {
									   return i * 1;		// One-tenth of an additional second delay for each subsequent element 
								   })
      							.duration(updateDuration)
								.attr("fill", function(d) {
								return colorScaleHab(d.koi_teq);
								})
								.style("opacity", function(d) {
									if(d.koi_teq>=180 && d.koi_teq <=310)
										{
											d.habFlag = 1;
											if(d.radeFlag == 1)
					    					{
					    						return 1;
					    					}
					    					else
					    					{
					    						return 0;
					    					}
		    							}
		    						else
			    						{
			    							d.habFlag = 0
			    							return 0;
			    						}
									})
								.style("pointer-events", function(d) {
									if(d.koi_teq>=180 && d.koi_teq <=310 && d.radeFlag == 1)
				    					{
				    						return "all";
				    					}
				    					else
				    					{
				    						return "none";
				    					}
	    							})
								clicked = 1;

							  d3.selectAll(".button2")
								.style("background-color","#393b79")
								.style("color","white");
	    				}
	    				else
	    				{
	    					
							svg.select(".legendQuantHab")
							.transition()
							.duration(500)
				    		.attr("opacity",0);

	    					svg.select(".legendQuant")
	    					.transition()
							.duration(500)
				    		.attr("opacity",1);

	    					circles.transition()
								.delay(function(d, i) {
									   return i * 1;		// One-tenth of an additional second delay for each subsequent element 
								   })
      							.duration(updateDuration)
								.attr("fill", function(d) {
								return colorScale(d.koi_teq);
								})
								.style("opacity", function(d) 
									{
										d.habFlag = 1;

										if(d.radeFlag==1)
										{
											return 1;
										}
										else
										{
											return 0;
										}

									})
								.style("pointer-events", function(d) 
									{
										if(d.radeFlag==1)
										{
											return "all";
										}
										else
										{
											return "none";
										}

									});

								clicked = 0;

								d3.selectAll(".button2")
								.style("background-color","white")
								.style("color","black");

	    				}
				 	
  					};