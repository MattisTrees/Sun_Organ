// * * * DONT FORGET TO ADD THIS FILE TO THE INDEX AND THE NAME OF THE FUNCTION TO YOUR ROUTES ARRAY * * *

function logoff(){
    
    myUrl = "webAPIs/logOffAPI.jsp";
    
    ajax2({
        url: myUrl,
        successFn: success,
        errorId: "view"
    });
    
    
    function success(obj){
        
        
    var content = `<h2>You have successfully logged out</h2>`;
    
    document.getElementById("view").innerHTML = content;
        
    } // end success function
} // end function