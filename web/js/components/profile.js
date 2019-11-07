
function profile(){
   
    var myUrl = "webAPIs/viewProfile.jsp?";
    var contentDOM = document.getElementById("view");
    var content = `<h1>NOT LOGGED IN</h1>`;
    contentDOM.innerHTML = content;
    
        // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
    ajax2({
        url: myUrl,
        successFn: success,
        errorId: "view"
    });
    
    
    function success(obj){
        console.log("* * * * PROFILE SUCCESS * * * * " + obj.userEmail);
        
        // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        if (!obj) {
            contentDOM.innerHTML += "Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log(obj);

        if (obj.errorMsg.length > 0) {
            contentDOM.innerHTML += "Database Error Encountered: " + obj.errorMsg;
            return;
        }
        
        var content = "<h3>User Id: " + obj.webUserId + "<br>Email: " + obj.userEmail
            + "<br>Birthday: " + obj.birthday + "<br>Fee: " + obj.membershipFee
            + "<br>Role ID: " + obj.userRoleId + "<br>Role type: " + obj.userRoleType
            + "</h3>";
    
    document.getElementById("view").innerHTML = content;
        
    } // end success function
} // end function