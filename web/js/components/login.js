function login(){
    
    // ` this is the infamous back tick, you don't have to worry about that you have NetBeans 8.2
    // it's a wrapper for multi-line strings in javascript
    
    // * * * FILL THIS CONTENT STRING WITH THE DESIRED HTML * * * 
    var content = `
    <div id="loginContent">
        <h2> lOG iN</h2><br>
    
        <p>eMAIL:</p>
        <input id="email"></input>
    
        <p>pASSWORD:</p>
        <input id="password"></input><br>
    
        <button onclick="verifyCred()"> sUBMIT </button>
    </div> `;
    
    document.getElementById("view").innerHTML = content;
} // end function


function verifyCred(){
    
    
    var email = escape(document.getElementById("email").value);
    var password = escape(document.getElementById("password").value);
    
    var myUrl = "webAPIs/logOnAPI.jsp?email=" + email;
    myUrl += "&password=" + password;
    
        // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
    ajax2({
        url: myUrl,
        successFn: success,
        errorId: "view"
    });
    
    function success(obj){
        console.log("* * * Successfully logged on!!! * * * ");
        var targetDOM = document.getElementById("view");
        
        // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        if (!obj) {
            targetDOM.innerHTML = "<h3>login.verifyCred (success private fn): Http Request (from AJAX call) did not parse to an object.</h3>";
            return;
        }
        
        targetDOM.innerHTML = "";
        targetDOM.innerHTML = "<h2>You have succesfully logged in!</h2>";
    } // end success function

}