var path = $("html").attr("data-path");
var content = "#content";

function initAll() {
	$(".selectize").selectize({});

	$(".selectize-multi").selectize({
		plugins: ['remove_button'],
		delimiter: ',',
		persist: false,
		create: function(input) {
			return {
				value: input,
				text: input
			}
		}
	});
	
	$(".mbs-well").each( function() {
		$(this).append("<h2>" + $(this).data("origem") + "</h2>").append("<div>" + $(this).data("saldo") + "&nbsp;<span></span></div>");
		if ($(this).data("tipo") == "D") {
			$(this).find("span").addClass("fa fa-minus-circle");
		} else {
			$(this).find("span").addClass("fa fa-plus-circle");
		}
	});

	$(".mbs-panel").each( function() {
		if($(this).data("collapse")) {	
			var panel = $(this);
			var bar = panel.children(".mbs-panel-bar");
			
			if (!bar.hasClass("collapse-added")) {
				if(panel.hasClass("open")) {
					bar.append("<div class=\"mbs-panel-control\"><a href=\"javascript:void(0);\" class=\"mbs-btn-collapse\"><span class=\"fa fa-chevron-up\"></span></a></div>");
					bar.siblings().show();
				} else {
					bar.append("<div class=\"mbs-panel-control\"><a href=\"javascript:void(0);\" class=\"mbs-btn-collapse\"><span class=\"fa fa-chevron-down\"></span></a></div>");
					bar.siblings().hide();
				}
	
				bar.on("click", ".mbs-btn-collapse", function(e) {
					e.preventDefault();
					if(panel.hasClass("open")) {
						bar.siblings().slideUp();
						panel.removeClass("open");
						$(this).children().removeClass("fa-chevron-up").addClass("fa-chevron-down");
					} else {
						bar.siblings().slideDown();
						panel.addClass("open");
						$(this).children().removeClass("fa-chevron-down").addClass("fa-chevron-up");
					}
				});
				
				bar.addClass("collapse-added")
			}
		}
	});

	$(".overdue").each( function() {
		$(this).prepend("<span class=\"fa fa-times-circle txt-danger\"></span>&nbsp;");
	});

	$(".pending").each( function() {
		$(this).prepend("<span class=\"fa fa-exclamation-circle txt-warning\"></span>&nbsp;");
	});

	$(".paid").each( function() {
		$(this).prepend("<span class=\"fa fa-check-circle\"></span>&nbsp;");
	});

	$(".add").each( function() {
		$(this).append("&nbsp;<span class=\"fa fa-plus-circle\"></span>");
	});

	$(".sub").each( function() {
		$(this).append("&nbsp;<span class=\"fa fa-minus-circle\"></span>");
		$(this).addClass("txt-danger")
	});

	$('.sparklines').sparkline('html', {type: 'bar', barColor: 'white', width: '50px', height: '20px'} );

	$(".datepicker").mask("99/99/9999");
	
	$(".datepicker").datepicker({
		changeMonth: false,
		changeYear: false,
		dateFormat: 'dd/mm/yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>'
	});
	
	$(".datepicker").datepicker( $.datepicker.regional[ "br" ] );
	
	$(".datepicker").attr("placeholder", "dd/mm/aaaa").blur();
	
	$(".numberonly").bind("keydown", function (event) {        
	    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
	         // Permite: Ctrl+A
	        (event.keyCode == 65 && event.ctrlKey === true) ||
	        // Permite: Ctrl+C
	        (event.keyCode == 67 && event.ctrlKey === true) ||
	        // Permite: Ctrl+V
	        (event.keyCode == 86 && event.ctrlKey === true) ||
	        // Permite: home, end, left, right
	        (event.keyCode >= 35 && event.keyCode <= 39)) {
	          return;
	    } else {
	        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
	            event.preventDefault();
	        }
	    }
	});
	
	jQuery(function($) {
      	$(".moeda").autoNumeric('init');
  	});
}

window.onload = function(){
	initAll();	
	
	$('#demo-setting').click(function() {
		$('.demo')
			.toggleClass('activate');
	});
	
	$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
    	if (jqxhr.status === 400) {
	    	$(location).attr("href", path + "/");
	    }
	});
}