function deleteUser (user_id){
    
    console.log("deleteThis called on " + user_id + "!");

    if(confirm("Are you sure you want to delete this album?")){
        
        console.log("Deleting album...");
    
        ajax2({
            url: "webAPIs/deleteUser.jsp?UserId=" + user_id,
            successFn: success,
            errorId: "view"
        });
        
    } else {
        console.log("Deletion Cancelled");
    } // end if/else

    
    function success(obj){
        
        alert("User successfully deleted!");
        
    } // end success function

} // end deleteThis function