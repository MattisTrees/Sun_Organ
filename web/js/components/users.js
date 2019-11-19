var users = {};

(function () {  // This is an IIFE, an immediately executing (anonymous) function
    //alert("I am an IIFE!");

    users.list = function () {
        
    // clear out whatever may be currently in the content area
    var contentDOM = document.getElementById("view");
    contentDOM.innerHTML = "";

    // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
    ajax2({
        url: "webAPIs/listUsersAPI.jsp",
        successFn: success,
        errorId: "view"
    });

    function success(obj) {

        // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        if (!obj) {
            contentDOM.innerHTML += "Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log(obj);

        if (obj.dbError.length > 0) {
            contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        }

        var div = document.createElement("div");
        div.style.textAlign = "center";
        contentDOM.appendChild(div);
        div.innerHTML = `
            <h2>Web User List</h2>
        `;

        var tableDiv = document.createElement("div");
        tableDiv.style.margin = "auto";
        contentDOM.appendChild(tableDiv);

        // tweak obj.webUserList to include only the properties you want - combine, delete, etc. 
        var userList = [];
        for (var i = 0; i < obj.webUserList.length; i++) {
            userList[i] = {}; // add new empty object to array
            userList[i].userCredentials = obj.webUserList[i].userEmail + "<br/> PW (to test Logon): " +
                    obj.webUserList[i].userPassword;
            userList[i].image = obj.webUserList[i].image;
            userList[i].birthday = obj.webUserList[i].birthday;
            userList[i].membershipFee = obj.webUserList[i].membershipFee;
            userList[i].role = obj.webUserList[i].userRoleId + "&nbsp;" +
                    obj.webUserList[i].userRoleType;
            userList[i].userId = obj.webUserList[i].webUserId;
  
            userList[i].Delete = ("<h2 onclick=\"deleteUser(" + userList[i].userId + ")\">X</h2>");
            userList[i].Update = ("<h2 onclick=\"users.updateUI(" + userList[i].userId + ")\">U</h2>");

            // Remove this once you are done debugging...
            userList[i].errorMsg = obj.webUserList[i].errorMsg;
        }

        // add click sortable HTML table to the content area

        // ********************** function tableBuilder.build ***********************************
        // params.list: an array of objects that are to be built into an HTML table.
        // params.target: reference to DOM object where HTML table is to be placed (by buildTable) -- 
        //         (this is not the id string but actual reference like you get from method getElementById()
        // params.style: will be added as className to DOM element target,
        // params.orderPropName (string): name of property (of objects in list) for iniial sort
        // params.reverse (boolean): if true, initial sort will be high to low (else low to high). 
        // params.imgWidth: any columns that hold image files will be turned into <img> tags with this width.

        tableBuilder.build({
            list: userList,
            target: tableDiv,
            style: "data",
            orderPropName: "userEmail",
            reverse: false,
            imgWidth: "50px"
        });
    } // end of function success


}; // end of function users.list

// Inject the UI that allows the user to type in an id and click submit.
users.findUI = function () {

    console.log("users.findUI was called");

    var contentDOM = document.getElementById("view");
    var content = `
        <div class='logon'>
            <br/>
            Enter Id <input type="text" id="findId"/>
            &nbsp;
            <input type="button" value="Submit" onclick="users.findById('findId','msgArea')"/>
            <br/> <br/>
            <div id="msgArea"></div> 
        </div>
    `;
    contentDOM.innerHTML = content;
};

// This public function of global object will be called when the user clicks the button created just above.
users.findById = function (idOfInput) {

    console.log("users.findBtUd was called");

    // clear out any previous values in the target area
    var targetDOM = document.getElementById("view");
    //targetDOM.innerHTML = "";
    
    var desiredUserId = escape(document.getElementById(idOfInput).value);

    // the JS escape function cleans input so it can be used as a URL paramenter
    var myUrl = "webAPIs/getUserByIdAPI.jsp?URLid=" + desiredUserId;
    console.log("users.findById ready to invoke web API with this url: " + myUrl);

    // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
    ajax2({
        url: myUrl,
        successFn: success,
        errorId: "view"
    });


    function success(obj) {

        // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        if (!obj) {
            targetDOM.innerHTML += "users.findById (success private fn): Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log("users.findById (success private fn): the obj passed in by ajax2 is on next line.");
        console.log(obj);

        if (obj.dbError.length > 0) {
            targetDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        } else if (obj.webUserList.length === 0 ) {
            targetDOM.innerHTML = "No Web User with id "+desiredUserId+" was found in the Database.";
        } else {
            var msg = "Found Web User " + obj.webUserList[0].webUserId;
            msg += "<br/> &nbsp; Birthday: " +  obj.webUserList[0].birthday;
            msg += "<br/> &nbsp; MembershipFee: " +  obj.webUserList[0].membershipFee;
            msg += "<br/> &nbsp; User Role: " +  obj.webUserList[0].userRoleId + " " +  obj.webUserList[0].userRoleType;
            msg += "<br/> <img src ='" +  obj.webUserList[0].image + "'>";
            targetDOM.innerHTML = msg;  
        }

    } // end of function success
    };  // users.findbyId


// ***** NEW from HW 4 display data *****
// invoke a web API passing in userId to say which record you want to delete. 


    users.insertUI = function (isUpdate) {
        console.log("users.inusertUI function - targetId is view");
        
        var webUserIdRowStyle = ' style="display:none" ';
        var saveFn = "users.insertSave()";
        
        if(isUpdate){
            webUserIdRowStyle = "";
            saveFn = "users.updateSave()";
        }

        var html = `
    <div id="insertArea">
        <br/>
        <table>
            <tr ${webUserIdRowStyle}>
                <td>Web User Id</td>
                <td><input type="text" id="webUserId" disabled /></td>
                <td id="webUserIdError" class="error"></td>
            </tr>
            <tr>
                <td>Email Address</td>
                <td><input type="text"  id="userEmail" /></td>
                <td id="userEmailError" class="error"></td> 
            </tr>
            <tr>
                <td>Password</td>
                <td><input type="password"  id="userPassword" /></td>
                <td id="userPasswordError" class="error"></td>
            </tr>
            <tr>
                <td>Retype Your Password</td>
                <td><input type="password" id="userPassword2" /></td>
                <td id="userPassword2Error" class="error"></td>
            </tr>
            <tr>
                <td>Birthday</td>
                <td><input type="text" id="birthday" /></td>
                <td id="birthdayError" class="error"></td> 
            </tr>
            <tr>
                <td>Membership Fee</td>
                <td><input type="text" id="membershipFee" /></td>
                <td id="membershipFeeError" class="error"></td>
            </tr>
            <tr>
                <td>User Role</td>
                <td>
                    <select id="rolePickList">
                    <!-- JS code will make ajax call to get all the roles 
                    then populate this select tag's options with those roles -->
                    </select>
                </td>
                <td id="userRoleIdError" class="error"></td>
            </tr>
            <tr>
                <!-- see js/insertUser.js to see the insertUser function (make sure index.html references the js file) -->
                <td><button onclick="${saveFn}">Save</button></td>
                <td id="recordError" class="error"></td>
                <td></td>
            </tr>
        </table>
    </div>
    `;
        document.getElementById("view").innerHTML = html;

        ajax2({
            url: "webAPIs/getRolesAPI.jsp",
            successFn: setRolePickList,
            errorId: "userRoleIdError"
        });

        function setRolePickList(jsonObj) {

            console.log("setRolePickList was called, see next line for object holding list of roles");
            console.log(jsonObj);

            if (jsonObj.dbError.length > 0) {
                document.getElementById("userRoleIdError").innerHTML = jsonObj.dbError;
                return;
            }

            /*  copy/pasting the first entry from the output of my get role API
             {
             "dbError": "",
             "roleList": [
             {
             "userRoleId": "1",
             "userRoleType": "Admin",
             "errorMsg": ""
             }, ...
             */

            Utils.makePickList({
                id: "rolePickList",
                list: jsonObj.roleList,
                valueProp: "userRoleType",
                keyProp: "userRoleId"
            });

        } // setRolePickList

    }; // users.insertUI


    // a private function
    function getUserDataFromUI() {

        // New code for handling role pick list.
        var ddList = document.getElementById("rolePickList");

        // create a user object from the values that the user has typed into the page.
        var userInputObj = {

            "webUserId" : document.getElementById("webUserId").value,
            "userEmail": document.getElementById("userEmail").value,
            "userPassword": document.getElementById("userPassword").value,
            "userPassword2": document.getElementById("userPassword2").value,
            "birthday": document.getElementById("birthday").value,
            "membershipFee": document.getElementById("membershipFee").value,

            // Modification here for role pick list
            //"userRoleId": document.getElementById("userRoleId").value,
            "userRoleId": ddList.options[ddList.selectedIndex].value,

            "userRoleType": "",
            "errorMsg": ""
        };

        console.log(userInputObj);

        // JSON.stringify converts the javaScript object into JSON format 
        // (the reverse operation of what gson does on the server side).
        // 
        // Then, you have to encode the user's data (encodes special characters 
        // like space to %20 so the server will accept it with no security error. 
        return encodeURIComponent(JSON.stringify(userInputObj));
        //return escape(JSON.stringify(userInputObj));
    }

    function writeErrorObjToUI(jsonObj) {
        console.log("here is JSON object (holds error messages.");
        console.log(jsonObj);

        document.getElementById("userEmailError").innerHTML = jsonObj.userEmail;
        document.getElementById("userPasswordError").innerHTML = jsonObj.userPassword;
        document.getElementById("userPassword2Error").innerHTML = jsonObj.userPassword2;
        document.getElementById("birthdayError").innerHTML = jsonObj.birthday;
        document.getElementById("membershipFeeError").innerHTML = jsonObj.membershipFee;
        document.getElementById("userRoleIdError").innerHTML = jsonObj.userRoleId;
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
    }

    users.insertSave = function () {

        console.log("users.insertSave was called");

        // create a user object from the values that the user has typed into the page.
        var myData = getUserDataFromUI();

        ajax2({
            url: "webAPIs/insertUserAPI.jsp?jsonData=" + myData,
            successFn: processInsert,
            errorId: "recordError"
        });

        function processInsert(jsonObj) {

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }

            writeErrorObjToUI(jsonObj);
        }
    };
    
    users.updateSave = function () {

        console.log("users.updateSave was called");

        // create a user object from the values that the user has typed into the page.
        var myData = getUserDataFromUI();

        ajax2({
            url: "webAPIs/updateUserAPI.jsp?jsonData=" + myData,
            successFn: processUpdate,
            errorId: "recordError"
        });
        
        function processUpdate(jsonObj) {

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "User successfully updated !!!";
            }

            writeErrorObjToUI(jsonObj);
        } // end processUpdate function
        
    }; // end updateSave function
    
    
    users.updateUI = function (webUserId) {

        // This is needed to "reset" the application's perception of the "current" link. 
        // Otherwise, when the user tries to click on "user list" after doing a user list -> update
        // operation, there will be no response (because link would not change). 
        // Setting window.location.hash is like auto-clicking for the user (in code). 
        // But also in index.html, you have to add a routing rule for this link and associate 
        // it will a null function (a do nothing function) - to avoid a routing error.
        window.location.hash = "#/userUpdate";

        users.insertUI(true); // first param is isUpdate (boolean)
        ajax2({
            url: "webAPIs/getUserWithRolesAPI.jsp?id=" + webUserId,
            successFn: proceed,
            errorId: "ajaxError"
        });
        function proceed(obj) { // obj is what got JSON.parsed from Web API's output
            
        var webUserObj = obj.webUser;
        var roleList = obj.roleInfo.roleList;
        
        //alert("Web User ID is: " + webUserObj.webUserId);

        document.getElementById("webUserId").value = webUserObj.webUserId;
        document.getElementById("userEmail").value = webUserObj.userEmail;
        document.getElementById("userPassword").value = webUserObj.userPassword;
        document.getElementById("userPassword2").value = webUserObj.userPassword;
        document.getElementById("birthday").value = webUserObj.birthday;
        document.getElementById("membershipFee").value = webUserObj.membershipFee;
        console.log("selected role id is " + webUserObj.userRoleId);
        Utils.makePickList({
            id: "rolePickList", // id of <select> tag in UI
            list: roleList, // JS array that holds objects to populate the select list
            valueProp: "userRoleType", // field name of objects in list that hold the values of the options
            keyProp: "userRoleId", // field name of objects in list that hold the keys of the options
            //selectedKey: webUserObj.userRoleId  // key that is to be pre-selected (optional)
        }); // end Utils.makePickList
        
        } // end proceed function
    }; // end Users.updateUI

}());  // the end of the IIFE