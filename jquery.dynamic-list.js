(function ( $ ) {
	
    $.fn.dynamiclist = function( options ) {
 
        var settings = $.extend( {
									addButtomClass: "btn-add",
									removeButtomClass: "btn-remove",
									listContainerClass: "list-container",
									rowClass: 'list-row',
									btnAdd: null,
									btnRemove: null,
									orderInsert: 'append',
									autoClearNewRow: false,
									clearMethod: null, 
									manageIndexes: true
								}, options );
		
		$.each($(this), function(){
			switch(settings.orderInsert){
				case 'prepend':
					$(this).find('.'+settings.addButtomClass).parent().css('vertical-align', 'top');
				break;
				default:
					$(this).find('.'+settings.addButtomClass).parent().css('vertical-align', 'bottom');
				break;
			}
		});
        
        $(this).on('click', '.'+settings.addButtomClass, function(){
        	var dynamiclist = $(this).closest('.dynamic-list');
			if($.isFunction(settings.btnAdd)){
				settings.btnAdd(dynamiclist, settings);
			}else{
				var newRow = dynamiclist.find('.'+settings.listContainerClass+' .'+settings.rowClass+':first').clone(true, true);
				if(!$.isFunction(settings.cleanMethod) && settings.autoClearNewRow){
					newRow.find('input').val('');
					$.each(newRow.find('select'), function(){// force select the first option
						if(typeof $(this).attr('multiple') == typeof undefined){
							$(this).val($(this).find('option:first').val()).trigger('change');
						}else{
							$(this).find('option').removeAttr('selected').prop('selected',false);
						}
					});
				}else if($.isFunction(settings.cleanMethod)){
					settings.cleanMethod(newRow);
				}else{
					lastRow = dynamiclist.find('.'+settings.listContainerClass+' .'+settings.rowClass+':last');
					$.each(lastRow.find('input, select'), function(){
						var thisElemPreviewRow = $(this);
						var start = thisElemPreviewRow.attr('name').indexOf('[');
						while(start != -1 && start < thisElemPreviewRow.attr('name').length){
							start++;
							if(thisElemPreviewRow.attr('name').substring(start,(start+1)) == ']' || jQuery.isNumeric(thisElemPreviewRow.attr('name').substring(start,(start+1)))){
								break;
							}else if((thisElemPreviewRow.attr('name').substring(start)).indexOf('[') != -1){
								start += (thisElemPreviewRow.attr('name').substring(start)).indexOf('[');
							}else{
								start = -1;	
							}
						}
						if(start != -1){
							findThisElementByName = thisElemPreviewRow.prop("tagName")+'[name^="'+(thisElemPreviewRow.attr('name').substring(0,(start-1)))+'"]';
							if(typeof thisElemPreviewRow.attr('multiple') == typeof undefined){
								newRow.find(findThisElementByName).val(thisElemPreviewRow.val());
							}else{
								var optionsSelected = thisElemPreviewRow.find('option:selected').map(function(){ return $(this).val(); }).get();
								$.each(newRow.find(findThisElementByName+'>option'), function(){
									if(jQuery.inArray( $(this).val(), optionsSelected ) > -1){
										$(this).attr('selected','selected').prop('selected', true);
									}
								});
							}
						}
					});
				}
				switch(settings.orderInsert){
					case 'prepend':
						dynamiclist.find('.'+settings.listContainerClass).prepend(newRow);
					break;
					default:
						dynamiclist.find('.'+settings.listContainerClass).append(newRow);
					break;
				}
			}
			if(jQuery.isFunction(settings.manageIndexes)){
				settings.manageIndexes(dynamiclist);
			}else if(!jQuery.isFunction(settings.manageIndexes) && settings.manageIndexes){
				manageIndexes(dynamiclist);
			}
        });
        
        $(this).on('click', '.'+settings.removeButtomClass, function(){
        	var dynamiclist = $(this).closest('.dynamic-list');
			if($.isFunction(settings.btnRemove)){
				settings.btnRemove(dynamiclist, settings, $(this).closest('.'+settings.rowClass));
			}else if(dynamiclist.find('.'+settings.listContainerClass+' .'+settings.rowClass).length > 1){
				$(this).closest('.'+settings.rowClass).remove();
			}else if($.isFunction(settings.cleanMethod)){
				settings.cleanMethod($(this).closest('.'+settings.rowClass));
			}else{
				$(this).closest('.'+settings.rowClass).find('input').val('');
				$.each($(this).closest('.'+settings.rowClass).find('select'), function(){// force select the first option
					$(this).val($(this).find('option:first').val()).trigger('change');
				});
			}
			manageIndexes(dynamiclist);
        });
        
        function manageIndexes(dynamiclist) {
        	var index = 0;
        	$.each(dynamiclist.find('.'+settings.listContainerClass+' .'+settings.rowClass), function(){
        		var thisRow = $(this);
        		$.each(thisRow.find('input, select, textarea'), function(){
        			var thisName = $(this).attr('name');
				if(typeof thisName != typeof undefined){
					var start = thisName.indexOf('[');
					while(start != -1 && start < thisName.length){
						start++;
						if(thisName.substring(start,(start+1)) == ']' || jQuery.isNumeric(thisName.substring(start,(start+1)))){
							break;
						}else if((thisName.substring(start)).indexOf('[') != -1){
							start += (thisName.substring(start)).indexOf('[');
						}else{
							start = -1;	
						}
					}
					if(start != -1){
						thisName = (thisName.substring(0,(start-1)))+(thisName.substring(start-1)).replace(/\[.*?\]/, '['+index+']');
						$(this).attr('name',thisName);
					}
				}
        		});
        		index++;		
			});
        }
    };
 
}( jQuery ));
