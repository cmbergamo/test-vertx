function addModal(_html) {
	if ($('#modal-space').length) {
		$('.modal-content').empty();
	} else {
		$(content).append('<div class="modal fade" id="modal-space" tabindex="-1" role="dialog" aria-labelledby="modalLabel"><div class="modal-dialog" role="document"><div class="modal-content"></div></div></div>');
	}
	
	$('.modal-content').append(_html);
	$('#modal-space').modal("show");	
}

function closeModal() {
	$("#modal-space").modal("hide");
	customSuccess();
}

function closeModalUpdate() {
	closeModal();
	atualizar();
}

function customAlert(_text) {
	$.smallBox({
		title : _text,
		content : "<i>Fechamento automático em 10 segundos...</i>",
		color : "#C79121",
		iconSmall : "fa fa-exclamation-triangle",
		timeout : 10000
	});
}

function customError() {
	$.smallBox({
		title : "Erro ao concluir operação. Tente novamente.",
		content : "<i>Fechamento automático em 10 segundos...</i>",
		color : "#C46A69",
		iconSmall : "fa fa-times-circle",
		timeout : 10000
	});
}

function customInfo(_text) {
	$.smallBox({
		title : _text,
		content : "<i>Fechamento automático em 5 segundos...</i>",
		color : "#296191",
		iconSmall : "fa fa-times-circle bounce animated",
		timeout : 5000
	});
}

function customSuccess() {
	$.smallBox({
		title : "Operação concluída com sucesso!",
		content : "<i>Fechamento automático em 5 segundos...</i>",
		color : "#739E73",
		iconSmall : "fa fa-cloud",
		timeout : 5000
	});
}

function deleteContent(_url) {
	$.smallBox({
		title : "Confirmar ação",
		content : "Deseja realmente apagar o registro? <p class='text-align-right'><a href='" + _url + "' class='btn btn-mbs'><span class='fa fa-check fa-lg'></span</a> <a href='javascript:void(0);' class='btn btn-mbs'><span class='fa fa-remove fa-lg'></span></a></p>",
		color : "#C79121",
		icon : "fa fa-question-circle swing animated"
	});
}

function formToJson() {
	var args = arguments;
	var unindexed = new Array();
	
	for(var cont = 0; cont < args.length; ++cont) {
		var temp = ($(args[cont]).serializeArray());
		var novo = [temp.length + unindexed.length];
		
		for (var cont2 = 0;cont2 < unindexed.length; ++cont2){
			novo[cont2] = unindexed[cont2];
		}

		for (var cont2 = 0; cont2 < temp.length; ++cont2) {
			novo[unindexed.length + cont2] = temp[cont2];
		}
		
		unindexed = novo;
	}

    var indexed = {};

    $.map(unindexed, function(n, i){
    	indexed[n['name']] = n['value'];
    });
    
    return indexed;
}

function jsonToForm(_form, _json) {
	$.each( _json, function(key, value) {  
	    var $ctrl = $('[name=' + key + ']', _form);  
	    
	    switch( $ctrl.attr("type") )  
	    {  
	        case "text" : case "hidden":  
	        	$ctrl.val(value);   
	        break;   
	        
	        case "radio" : 
	        	$ctrl.each( function() {
	        		if( $(this).val() == value.toString()) {
	        			$(this).prop("checked", true); 
	        		}
	        	});  
			break;
	        
	        case "checkbox":
		        $ctrl.each( function() {
		        	$(this).prop("checked",value); 
		        });
	        break;  
	        
	        default:
	        	$ctrl.val(value); 
	    }  
    });
}

function logoff() {
	window.location = path + "/logoff.do";
}


function refreshContent(_page, _div) {
	if (!_div) {
		_div = content;		
	}
	
	$.ajax({
		type: 'GET',
		url: path + "/sistema/" + _page,
		beforeSend: function() {
			$("html, body").css("cursor", "wait");
			$(_div).empty();
			$(_div).append('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Carregando, aguarde...</h1>');
		},
		success: function(resultado) {
			$(_div).html(resultado);
		},
		complete: function() {
			$("html, body").css("cursor", "auto");
		}
	});	
}