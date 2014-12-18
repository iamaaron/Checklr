(function () {
    'use strict';
    
    // Edit an item.
    function editItem() {
        // Define variable, and get the ID of the button being clicked.
        var buttonEditId = this.id.replace("edit_", ""),
            // Find "text" ID based upon previous declaration and assign it to spanEditId.
            spanEditId = document.getElementById("text_" + buttonEditId),
            listItemId = document.getElementById("item_" + buttonEditId),
            // Get the text of span tag.
            itemEditText = spanEditId.innerHTML,
            // Create input and button elements that will replace the current span tag.
            itemEditForm = document.createElement("form"),
            itemEditInput = document.createElement("input"),
            itemEditSubmit = document.createElement("button");
        itemEditInput.id = "edit-input_" + buttonEditId;
        itemEditSubmit.value = "edit-submit_" + buttonEditId;
        itemEditInput.value = itemEditText;
        itemEditSubmit.innerHTML = "Edit";
        itemEditForm.id = "edit-form_" + buttonEditId;
        spanEditId.style.display = "none";
        listItemId.className = "no-border" + " clear";
        listItemId.appendChild(itemEditForm);
        itemEditForm.appendChild(itemEditInput);
        itemEditForm.appendChild(itemEditSubmit);
        document.getElementById("update_" + buttonEditId).style.display = "none";
        document.getElementById("delete_" + buttonEditId).style.display = "none";
        document.getElementById("edit_" + buttonEditId).style.display = "none";
        document.getElementById("edit-input_" + buttonEditId).focus();
        itemEditSubmit.onclick = function (event) {
            event.preventDefault();
            var itemEditTextSubmission = itemEditInput.value;
            if (itemEditTextSubmission !== "" || itemEditTextSubmission !== " ") {
                listItemId.removeChild(itemEditForm);
                document.getElementById("update_" + buttonEditId).style.display = "block";
                document.getElementById("delete_" + buttonEditId).style.display = "block";
                document.getElementById("edit_" + buttonEditId).style.display = "block";
                listItemId.className = "clear";
                spanEditId.innerHTML = itemEditTextSubmission;
                spanEditId.style.display = "block";
            } else {
                alert("Please enter some stuff in, bro.");
            }
        };
    }
    
    // Hide an item.
    function hideItem() {
        // this == button
        var buttonDeleteId = this.id.replace("delete_", "");
        // Not deleting, but hiding.
        document.getElementById("item_" + buttonDeleteId).style.display = "none";
    }

    // Update an item.
    function updateStatus() {
        // Finding element that matches id.
        var buttonUpdateId = this.id.replace("update_", ""),
        // Getting element with same id.
            itemUpdateId = document.getElementById("text_" + buttonUpdateId);
        // Checking to see if the class of "checked" is already applied, if it is, then remove it, if it isn't add it.
        if (itemUpdateId.className === "checked") {
            itemUpdateId.className = "";
        } else {
            itemUpdateId.className = "checked";
        }
    }
    

    // Adding new item to the list.
    function addNewItem(list, itemText) {
        
        // Creating nodes that will be output.
        var item = document.createElement("li"),
            itemOptions = document.createElement("div"),
            span = document.createElement("span"),
            buttonEdit = document.createElement("button"),
            buttonHide = document.createElement("button"),
            buttonUpdate = document.createElement("button"),
            editIcon = "<span class=\"fa fa-pencil\"></span>",
            deleteIcon = "<span class=\"fa fa-minus\"></span>",
            updateIcon = "<span class=\"fa fa-check\"></span>";
        // Incrementing variable for unique identifiers for each element.
        totalItems++;
        // Defining attributes for each element created.
        itemOptions.className = "clear options";
        buttonEdit.id = "edit_" + totalItems;
        buttonEdit.className = "edit";
        buttonEdit.innerHTML = editIcon;
        buttonHide.id = "delete_" + totalItems;
        buttonHide.className = "delete";
        buttonHide.innerHTML = deleteIcon;
        buttonUpdate.id = "update_" + totalItems;
        buttonUpdate.className = "update";
        buttonUpdate.innerHTML = updateIcon;
        span.id = "text_" + totalItems;
        span.innerText = itemText;
        item.id = "item_" + totalItems;
        item.className = "clear";
        // Appending created elements to unordered list.
        item.appendChild(span);
        list.appendChild(item);
        item.appendChild(itemOptions);
        itemOptions.appendChild(buttonUpdate);
        itemOptions.appendChild(buttonHide);
        itemOptions.appendChild(buttonEdit);
        // Resetting value of value for input.
        inItemText.value = "";
        // Calling functions based upon click events.
        buttonEdit.onclick = editItem;
        buttonHide.onclick = hideItem;
        buttonUpdate.onclick = updateStatus;
    }
    
    // Initializing variables.
    // // Variable to select input element.
    var inItemText = document.getElementById("inItemText"),
    // // Variable to select button element.
        addTaskButton = document.getElementById("addTask");
    var totalItems = 0;
    // Function to add item to unordered list.
    addTaskButton.onclick = function (event) {
        // // Preventing default form action on submit.
        event.preventDefault();
        // // Setting the itemText variable.
        var itemText = inItemText.value;
        // Checking to see if input field is blank.
        if (itemText !== "" || itemText === " ") {
        // // Calling addNewItem function, and passing checklist UL and value of input as parameters.
            addNewItem(document.getElementById("checklist"), itemText);
        }
    };
}());