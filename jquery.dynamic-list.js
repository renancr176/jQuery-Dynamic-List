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
									cleanMethod: null
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
						$(this).val($(this).find('option:first').val()).trigger('change');
					});
				}else if($.isFunction(settings.cleanMethod)){
					settings.cleanMethod(newRow);
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
			manageIndexes(dynamiclist);
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
				newRow.find('input').val('');
				$.each(newRow.find('select'), function(){// force select the first option
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
        			thisName = thisName.replace(/\[.*?\]/, '['+index+']');
        			$(this).attr('name',thisName);
        		});
        		index++;		
			});
        }
    };
 
}( jQuery ));
