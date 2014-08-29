(function ( document, window ) {
    'use strict';
    
	var stepids = [];
	// wait for impress.js to be initialized
	document.addEventListener("impress:init", function (event) {
		var steps = event.detail.steps;
		for (var i = 0; i < steps.length; i++)
		{
		  stepids[i+1] = steps[i].id;
		}
	});
	var progressbar = document.querySelector('div.progressbar div');
	var progress = document.querySelector('div.progress');
	
	if (null !== progressbar || null !== progressbar) {      
		document.addEventListener("impress:starttransition", function (event) {
			updateProgressbar(event.detail.next.id);
		});
		
		document.addEventListener("impress:stepenter", function (event) {
			updateProgressbar(event.target.id);
		});
	}
		
	function updateProgressbar(slideId) {			
		var slideNumber = stepids.indexOf(slideId);
		
		// workaround to animate the charts
		// this is the wrong place to have this functionallity
		if (slideNumber == 31) {
				
			new Chart(document.getElementById("canvasWER").getContext("2d")).Bar(barChartData1);			
			new Chart(document.getElementById("canvasLatency").getContext("2d")).Bar(barChartData2);			
		}
		else if (slideNumber == 53) {
			new Chart(document.getElementById("canvasImprovement").getContext("2d")).Bar(barChartData3);			
		}
		
		if (null !== progressbar) {
			progressbar.style.width = (100 / (stepids.length - 1) * (slideNumber)).toFixed(2) + '%';
		}
		if (null !== progress) {
			progress.innerHTML = slideNumber + '/' + (stepids.length-1);
		}
	}
})(document, window);