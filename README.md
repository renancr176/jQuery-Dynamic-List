# Dynamic List

Plungin developed for the purpose of managing a list of subforms, for example a list of repeated configurations with numerous inputs and selects defined by the developer.

Plugin Options
  - addButtomClass: Inform the class name that identify the button to add new row (default - btn-add)
  - removeButtomClass: Inform the class name that identify the button to remove the parent row (default - btn-remove)
  - listContainerClass: Inform the class name that identify the rows container (default - list-container)
  - rowClass: Inform the class name that identify rows (default - list-row)
  - orderInsert: Method to insert new row, there are two options, prepend or append (default - append)
  - autoClearNewRow: Clear the new row insputs and select the first option of a select (default - false)
  - clearMethod: User function responsable for set the default of the new cloned row (default - null or callback(newRow))
  - btnAdd: User function responsable to clone and insert the new row (default - null or callback(dynamiclist, settings))
  - btnRemove: User function responsable to remove the row (default - null or callback(dynamiclist, settings, rowToRemove))
  - manageIndexes: Bolean or user function responsable for manage input name array index callback(dynamiclist)

Orientations:
  - When you are using an other kind of UI plugin in some input or select inside the dynamic list, you should build and inform the "btnAdd"  function, in this function you should remove "destroy" all other UI instances and change the inputs ID's before cloning a row, then you can call or build your own clear row method, insert the new row and after all this you can apply all removed UI again.

### How to use
 - Link the plugin on your html.
```sh
    <script src="your_js_folder/jquery.dynamic-list.js"></script>
```
 - Build the html structure like this, you can build difrentely and or use bootstrap layout definitios and Glyphicons as you want
```sh
<table class="dynamic-list">
    <tbody>
        <tr>
        	<td>
        		<table>
        			<tbody class="list-container">
        			    <tr class="list-row">
        				    <td>
        					    <label class="control-label">File: </label>
        				    </td>
            				<td>
            					<input type="file" name="files[]">
            				</td>
        				    <td class="text-center vertical-bottom">
        					    <button type="button" class="btn-remove">X</button>
        				    </td>
        			    </tr>
        		    </tbody>
        		</table>
        	</td>
        	<td>
        		<button type="button" class="btn-add">+</button>
        	</td>
        </tr>
    </tbody>
</table>
```
 - Create the instance of the Dynamic List, you can pass the options too.
```sh
$(".dynamic-list").dynamiclist();
or passing options
$(".dynamic-list").dynamiclist({
    autoClearNewRow: true
});
```
 - Settings
```sh
settings = {
   addButtomClass: "btn-add",
   removeButtomClass: "btn-remove",
   listContainerClass: "list-container",
   rowClass: 'list-row',
   btnAdd: (null or yourCallbackFunction),
   btnRemove: (null or yourCallbackFunction),
   orderInsert: ('append' or 'prepend'),
   autoClearNewRow: (false or true),
   clearMethod: (null or yourCallbackFunction)
}
```
                  
 - Buttom ADD method example
```sh
$(".dynamic-list").dynamiclist({
  btnAdd: function(dynamiclist, settings){
    //Destroy all plugins instances
    
    //Clone first or last row
    var newRow = dynamiclist.find('.'+settings.listContainerClass+' .'+settings.rowClass+':first').clone(true, true);
    
    //Clear it if you want
    newRow.find('input').val('');
    $.each(newRow.find('select'), function(){// force select the first option
        if(typeof $(this).attr('multiple') == typeof undefined){
            $(this).val($(this).find('option:first').val()).trigger('change');
        }else{
            $(this).find('option').removeAttr('selected').prop('selected',false);
        }
    });
    
    //Add new cloned row
    dynamiclist.find('.'+settings.listContainerClass).append(newRow);
    
    //Change inputs, selects and others its attribute id before applay the plungins instances
    //Applay all plugins instance again
  }
});
```
 - Button Remove method example
```sh
$(".dynamic-list").dynamiclist({
  btnRemove: function(dynamiclist, settings, rowToRemove){
     //If has more than one row, it cam be removed
     if(dynamiclist.find('.'+settings.listContainerClass+' .'+settings.rowClass).length > 1){ 
         rowToRemove.remove();
     }else{
        //Clear this last row instead of removing it
        rowToRemove.find('input').val('');
        // force select the first option
        $.each(rowToRemove.find('select'), function(){// force select the first option
            if(typeof $(this).attr('multiple') == typeof undefined){
                $(this).val($(this).find('option:first').val()).trigger('change');
            }else{
                $(this).find('option').removeAttr('selected').prop('selected',false);
            }
        });
     }
  }
});
```

 - Clear method example
```sh
$(".dynamic-list").dynamiclist({
  clearMethod: function(newRow){
    newRow.find('input').val('');
    $.each(newRow.find('select'), function(){// force select the first option
        if(typeof $(this).attr('multiple') == typeof undefined){
            $(this).val($(this).find('option:first').val()).trigger('change');
        }else{
            $(this).find('option').removeAttr('selected').prop('selected',false);
        }
    });
  }
});
```

### Example

 - Default row will be already there and I've selected the first file.
![N|Solid](http://imageshack.com/a/img922/4738/pa5m1C.png)
 - I Added tow new rows by click on add button [+] and selected tow other files.
![N|Solid](http://imageshack.com/a/img921/1807/oda5qp.png)
 - I Removed the middle row by click on the respective remove button [X]
![N|Solid](http://imageshack.com/a/img922/7136/1oFnMM.png)
