function deleteThis (album_id){
    
    console.log("deleteThis called on " + album_id + "!");
    
    //alert("Are you sure you want to do this?");

    if(confirm("Are you sure you want to delete this album?")){
        
    console.log("Deleting album...");
    
        ajax2({
            url: "webAPIs/deleteAlbum.jsp?AlbumId=" + album_id,
            successFn: success,
            errorId: "view"
        });
        
    } else {
        console.log("Deletion Cancelled");
    } // end if/else

    
    function success(obj){
        
        alert("Album successfully deleted!");
        
    } // end success function

} // end deleteThis function