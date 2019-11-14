var Utils = {};


// Utils.make: using document.createElement(), create a DOM element with HTML tag name params.htmlTag (required property).
// Optional property: params.innerHTML. Set the newly created element's innerHTML to this (if provided).
// Optional property: params.parent. Append the newly created element to this parent DOM element (if provided).
Utils.make = function (params) {
    if (!params.htmlTag) {
        alert("Utils.make function requires parameter object with htmlTag property.");
        return;
    }

    var ele = document.createElement(params.htmlTag);

    if (params.innerHTML) {
        ele.innerHTML = params.innerHTML;
    }

    if (params.parent) {
        params.parent.appendChild(ele);
    }

    return ele;
};

// Utils.makePickList: get a reference to the picklist with id params.id (required field)
// params.list (req'd): the JS array of objects that holds the name/value pairs for the pick list
// params.valueProp (req'd): the name of the property (within array of objects) that holds the values to show in the pick list.
// params.keyProp (req'd): the name of the property (within array of objects) that holds the keys that don't show in the pick 
// list, but will be the value if the user selects that option. 

Utils.makePickList = function (params) {

    if (!params.id || !params.list || !params.list[0] || !params.valueProp || !params.keyProp) {
        alert("Utils.makePickList function requires a parameter object with all of these properties \n" +
                "id: id of existing select tag to be populated,\n" +
                "list: array of objects that hold the key/value pairs from which to populate the select tag,\n" +
                "valueProp: name of property (in array of objects) with the values to show in the pick list,\n" +
                "keyProp: name of property that holds keys (value of select tag after user clicks an option).\n");
    }

    // get reference to select tag that should already exist in the DOM
    var selectList = document.getElementById(params.id);

    for (var i in params.list) { // i iterates through all the elements in array list

        // new Option(): first parameter is displayed option, second is option value. 
        var myOption = new Option(params.list[i][params.valueProp], params.list[i][params.keyProp]);

        // add option into the select list
        selectList.appendChild(myOption);
    }
};