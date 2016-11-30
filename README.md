# Dynamic List

Plungin developed for the purpose of managing a list of subforms, for example a list of repeated configurations with numerous inputs and selects defined by the developer.

Pligin Options
  - addButtomClass: Inform the class name that identify the button to add new row (default - btn-add)
  - removeButtomClass: Inform the class name that identify the button to remove the parent row (default - btn-remove)
  - listContainerClass: Inform the class name that identify the rows container (default - list-container)
  - rowClass: Inform the class name that identify rows (default - list-row)
  - orderInsert: Method to insert new row, there are two options, prepend or append (default - append)
  - autoClearNewRow: Clear the new row insputs and select the first option of a select (default - false)
  - clearMethod: User function responsable for set the default of the new cloned row (default - null)
  - btnAdd: User function responsable to clone and insert the new row (default - null)
  - btnRemove: User function responsable to remove the row (default - null)

Orientations:
  - When you are using an other kind of UI plugin in some input or select inside the dynamic list, you should build and inform the "btnAdd"  function, in this function you should remove "destroy" all other UI instances and change the inputs ID's before cloning a row, then you can call or build your own clear row method, insert the new row and after all this you can apply all removed UI again.

# How to use