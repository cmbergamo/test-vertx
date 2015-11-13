function compile() {
	// Começo do componente MBS-TEXT
	var obj = $('mbs-text');
	
	for (indice = 0; indice < obj.length; ++indice) {
		
		var idNome = obj[indice].getAttribute("data-id");
		
		$(obj[indice]).replaceWith("<section class='" + obj[indice].getAttribute("data-class") + "' " + (obj[indice].getAttribute("hide") == null ? "" : "style='display: none;'") + " id='section-" + idNome + "'>"
			+ "<div class='form-group'>"
			+ "<label for='" + idNome + "'>" + obj[indice].getAttribute("data-label") + "</label>"
			+ "<input type='text' class='form-control" + (obj[indice].getAttribute("currency") == null ? "" : " moeda") + (obj[indice].getAttribute("datepicker") == null ? "" : " datepicker") + (obj[indice].getAttribute("number") == null ? "" : " numberonly") + "' name='" + obj[indice].getAttribute("data-name") + "' id='" + idNome + "' value=\"" + (obj[indice].getAttribute("data-value") != null ? obj[indice].getAttribute("data-value") : "") + "\"" + (obj[indice].getAttribute("currency") == null ? "" : " data-a-sign='R$ ' data-a-dec=',' data-a-sep='.'") + (obj[indice].getAttribute("disabled") == null ? "" : " disabled='disabled'") + ">"
			+ (obj[indice].getAttribute("data-icon") == null ? "" : "<span class='icon-append " + obj[indice].getAttribute("data-icon") + "' id='button-" + idNome + "' onclick='" + obj[indice].getAttribute("data-icon-click") + "'></span>" )
			+ "</div>"
			+ "</section>");
		
		delete idNome;
		
	}
	
	delete obj;
	// Fim do componente MBS-TEXT
	
	// Começo do componente MBS-HIDDEN
	var obj = $('mbs-hidden');
	
	for (indice = 0; indice < obj.length; ++indice) {
		var idNome = obj[indice].getAttribute("data-id");
		
		$(obj[indice]).replaceWith("<section class='" + obj[indice].getAttribute("data-class") + "' style='display: none;' id='section-" + idNome + "'>"
			+ "<div class='form-group'>"
			+ "<label for='" + idNome + "'>" + obj[indice].getAttribute("data-label") + "</label>"
			+ "<input type='hidden' class='form-control' name='" + obj[indice].getAttribute("data-name") + "' id='" + idNome + "' value=\"" + (obj[indice].getAttribute("data-value") != null ? obj[indice].getAttribute("data-value") : "") + "\" " + (obj[indice].getAttribute("disabled") == null ? "" : "disabled='disabled'") + ">"
			+ "</div>"
			+ "</section>");
		
		delete idNome;
	}
	
	delete obj;
	// Fim do componente MBS-HIDDEN
	
	// Começo do componente MBS-TEXTAREA
	var obj = $('mbs-textarea');
	
	for (indice = 0; indice < obj.length; ++indice) {
		var idNome = obj[indice].getAttribute("data-id");
		
		$(obj[indice]).replaceWith("<section class='" + obj[indice].getAttribute("data-class") + "' " + (obj[indice].getAttribute("hide") == null ? "" : "style='display: none;'") + " id='section-" + idNome + "'>"
			+ "<div class='form-group'>"
			+ "<label for='" + idNome + "'>" + obj[indice].getAttribute("data-label") + "</label>"
			+ "<textarea class='form-control' name='" + obj[indice].getAttribute("data-name") + "' id='" + idNome + "' rows='"  + (obj[indice].getAttribute("data-rows") != null ? obj[indice].getAttribute("data-rows") : "5") + "' "+ (obj[indice].getAttribute("disabled") == null ? "" : "disabled='disabled'") + ">" + obj[indice].innerText + "</textarea>"
			+ "</div>"
			+ "</section>");
		
		delete idNome;		
	}
	
	delete obj;
	// Fim do componente MBS-TEXTAREA
	
	// Começo do componente MBS-SELECT
	var obj = $('mbs-select');
	
	for (indice = 0; indice < obj.length; ++indice) {
		var idNome = obj[indice].getAttribute("data-id");
		
		$(obj[indice]).replaceWith("<section class='" + obj[indice].getAttribute("data-class") + "' " + (obj[indice].getAttribute("hide") == null ? "" : "style='display: none;'") + " id='section-" + idNome + "'>"
			+ "<div class='form-group'>"
			+ "<label for='" + idNome + "'>" + obj[indice].getAttribute("data-label") + "</label>"
			+ "<select class='form-control' placeholder='Selecione uma opção...' name='" + obj[indice].getAttribute("data-name") + "' id='" + idNome + "'" + (obj[indice].getAttribute("onchange") == null ? "" : " onchange=\"" + obj[indice].getAttribute("onchange") + "\"") + (obj[indice].getAttribute("disabled") == null ? "" : " disabled='disabled'") + ">" + obj[indice].innerHTML + "</select>"
			+ "</div>"
			+ "</section>");

		delete idNome;		
	}
	
	delete obj;
	// Fim do componente MBS-SELECT
	
	// Começo do componente MBS-SELECTIZE
	var obj = $('mbs-selectize');
	
	for (indice = 0; indice < obj.length; ++indice) {
		var idNome = obj[indice].getAttribute("data-id");
		
		$(obj[indice]).replaceWith("<section class='" + obj[indice].getAttribute("data-class") + "' " + (obj[indice].getAttribute("hide") == null ? "" : "style='display: none;'") + " id='section-" + idNome + "'>"
			+ "<div class='form-group'>"
			+ "<label for='" + idNome + "'>" + obj[indice].getAttribute("data-label") + "</label>"
			+ "<select class='form-control' placeholder='Selecione uma opção...' name='" + obj[indice].getAttribute("data-name") + "' id='" + idNome + "'" + (obj[indice].getAttribute("onchange") == null ? "" : " onchange=\"" + obj[indice].getAttribute("onchange") + "\"") + (obj[indice].getAttribute("disabled") == null ? "" : " disabled='disabled'") + ">" + obj[indice].innerHTML + "</select>"
			+ "</div>"
			+ "</section>"
			+ "<script>$('#" + idNome + "').selectize();</script>");

		delete idNome;		
	}
	
	delete obj;
	// Fim do componente MBS-SELECTIZE
	
	// Começo do componente MBS-CHECKBOX
	var obj = $('mbs-checkbox');
	
	for (indice = 0; indice < obj.length; ++indice) {
		console.log("Teste do compilador -> " + (obj[indice].getAttribute("hide") == null) + " \n");
		
		var isInline = !(obj[indice].getAttribute("inline") == null);
		
		var values = obj[indice].getAttribute("data-value");
		values = values.split(";");
		
		var ids = obj[indice].getAttribute("data-id");
		ids = ids.split(";");
		
		var texts = obj[indice].getAttribute("data-text");
		texts = texts.split(";");
		
		var checkeds = obj[indice].getAttribute("data-checked");
		checkeds = checkeds.split(";");
		
		var names = obj[indice].getAttribute("data-name");
		names = names.split(";");
		
		var radios = "";
		for (ind2 = 0; ind2 < values.length; ++ind2) {

			var isChecked = checkeds[ind2] == 'true';
			
			radios += (isInline ? "" : "<div class='checkbox'>")
			+ "<label" + (isInline ? " class='checkbox-inline'" : "") +">"
			+ "<input type='checkbox' name='" + names[ind2] + "' id='" + ids[ind2] + "' value='" + (values[ind2] != null ? values[ind2] : "") + "' " + (isChecked ? "checked='checked'" : "") + " " + (obj[indice].getAttribute("disabled") == null ? "" : "disabled='disabled'") + ">" + texts[ind2]
			+ "</label>"
			+ (isInline ? "" : "</div>");
			
			delete isChecked;			
		}
		
		delete values;
		delete ids;
		delete names;
		delete checkeds
		
		var idNome = obj[indice].getAttribute("id");
		
		$(obj[indice]).replaceWith("<section class='" + obj[indice].getAttribute("data-class") + "' " + (obj[indice].getAttribute("hide") == null ? "" : "style='display: none;'" ) + " id='section-" + obj[indice].getAttribute("data-id-section") + "'>"
			+ "<div class='form-group'>"
			+ (obj[indice].getAttribute("data-label") == null ? "" : ("<label" + (isInline ? " class='checkbox'" : "") + ">" + obj[indice].getAttribute("data-label") + "</label>"))
			+ radios
			+ "</div>"
			+ "</section>");
		
		delete idNome;
		delete isInline;
		
	}
	
	delete obj;
	// Fim do componente MBS-CHECKBOX
	
	// Começo do componente MBS-RADIO
	var obj = $('mbs-radio');
	
	for (indice = 0; indice < obj.length; ++indice) {
		
		var isInline = !(obj[indice].getAttribute("inline") == null);
		
		var values = obj[indice].getAttribute("data-value");
		values = values.split(";");
		
		var ids = obj[indice].getAttribute("data-id");
		ids = ids.split(";");
		
		var texts = obj[indice].getAttribute("data-text");
		texts = texts.split(";");
		
		var checkeds = obj[indice].getAttribute("data-checked");
		if (checkeds != null)
			checkeds = checkeds.split(";");
		
		var radios = "";
		for (ind2 = 0; ind2 < values.length; ++ind2) {
			
			var isChecked = obj[indice].getAttribute("data-checked") == ids[ind2];
			
			radios += (isInline ? "" : "<div class='radio'>")
			+ "<label" + (isInline ? " class='radio-inline'" : "") +">"
			+ "<input type='radio' name='" + obj[indice].getAttribute("data-name") + "' id='" + ids[ind2] + "' value='" + (values[ind2] != null ? values[ind2] : "") + "' " + (isChecked ? "checked='checked'" : "") + " " + (obj[indice].getAttribute("disabled") == null ? "" : "disabled='disabled'") + ">" + texts[ind2]
			+ "</label>"
			+ (isInline ? "" : "</div>");
			
			delete isChecked;			
		}
		
		delete values;
		delete ids;
		delete names;
		delete checkeds
		
		var idNome = obj[indice].getAttribute("id");
		
		$(obj[indice]).replaceWith("<section class='" + obj[indice].getAttribute("data-class") + "' " + (obj[indice].getAttribute("hide") == null ? "" : "style='display: none;'" ) + " id='section-" + obj[indice].getAttribute("data-id-section") + "'>"
			+ "<div class='form-group'>"
			+ "<label" + (isInline ? " class='radio'" : "") + ">" + obj[indice].getAttribute("data-label") + "</label>"
			+ radios
			+ "</div>"
			+ "</section>");
		
		delete idNome;
		delete isInline;
	}
	
	delete obj;
	// Fim do componente MBS-RADIO
	
}