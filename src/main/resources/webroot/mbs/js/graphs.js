var randomScalingFactor = function(){ return Math.round(Math.random()*10000)};

var dataDia = {
	labels : ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],
	datasets : [
		{
			label: "My First dataset",
			fillColor : "rgba(208,43,39,0.2)",
			strokeColor : "rgba(208,43,39,1)",
			pointColor : "rgba(208,43,39,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(220,220,220,1)",
			data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		},
		{
			label: "My Second dataset",
			fillColor : "rgba(35,89,135,0.2)",
			strokeColor : "rgba(35,89,135,1)",
			pointColor : "rgba(35,89,135,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(35,89,135,1)",
			data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		}
	]

}

var dataAno = {
	labels : ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"],
	datasets : [
		{
			label: "My First dataset",
			fillColor : "rgba(208,43,39,0.2)",
			strokeColor : "rgba(208,43,39,1)",
			pointColor : "rgba(208,43,39,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(220,220,220,1)",
			data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),0,0,0,0,0,0,0]
		},
		{
			label: "My Second dataset",
			fillColor : "rgba(35,89,135,0.2)",
			strokeColor : "rgba(35,89,135,1)",
			pointColor : "rgba(35,89,135,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(35,89,135,1)",
			data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),0,0,0,0,0,0,0]
		}
	]

}

function initGraphs() {
	var ctx = document.getElementById("bal-dia").getContext("2d");
	var chartColor = $("body").hasClass("theme-light") ? "#2c3742" : "#fff";

	/*window.myBar = new Chart(ctx).Bar(dataMes, {
		responsive : true,
		scaleShowHorizontalLines: true,
		scaleShowVerticalLines: false,
		scaleFontColor : chartColor,
		scaleFontFamily: "'sysFont'",
		scaleFontSize: 12,
		scaleLabel: "R$ <%=value%>"
	});*/
	
	window.myBar = new Chart(ctx).Line(dataDia, {
		responsive : true,
		scaleFontColor : chartColor,
		scaleFontFamily: "'sysFont'",
		scaleFontSize: 12
	});
	
	ctx = document.getElementById("bal-ano").getContext("2d");
	window.myBar = new Chart(ctx).Line(dataAno, {
		responsive : true,
		scaleFontColor : chartColor,
		scaleFontFamily: "'sysFont'",
		scaleFontSize: 12
	});
}