var albums = {};

albums.list = function () {

    // clear out whatever may be currently in the content area
    var contentDOM = document.getElementById("view");
    contentDOM.innerHTML = "";

    // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
    ajax2({
        url: "webAPIs/listAlbumsAPI.jsp",
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
            <h2 style="margin-top: 20px;">Albums</h2>
        `;

        var tableDiv = document.createElement("div");
        tableDiv.style.margin = "auto";
        contentDOM.appendChild(tableDiv);

        // tweak obj.albumList to include only the properties you want - combine, delete, etc. 
        var AlbumList = [];
        for (var i = 0; i < obj.albumList.length; i++) {
            AlbumList[i] = {}; // add new empty object to array
            AlbumList[i].album_id = obj.albumList[i].album_id;
            AlbumList[i].album_name = "<p class=album>" + obj.albumList[i].album_name + "</p>";
            AlbumList[i].num_tracks = obj.albumList[i].num_tracks;
            AlbumList[i].album_art = obj.albumList[i].album_art;
            AlbumList[i].release_date = obj.albumList[i].release_date;
            AlbumList[i].web_user_id = obj.albumList[i].web_user_id;
            
            AlbumList[i].Delete = ("<h2 onclick=\"deleteThis(" + AlbumList[i].album_id + ")\">X</h2>");
            AlbumList[i].Update = ("<h2 onclick= \"albums.updateUI(" + AlbumList[i].album_id + ")\">U</h2");
            //AlbumList[i].Delete.what = AlbumList[i].album_name;
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
            list: AlbumList,
            target: tableDiv,
            style: "data",
            orderPropName: "album_id",
            reverse: false,
            imgWidth: "150px"
        });
    } // end of function success

}; // end of function Albums.list

albums.insertUI = function (isUpdate) {
        console.log("albums.inusertUI function - targetId is view");
        
                
        var albumIdRowStyle = ' style="display:none" ';
        var saveFn = "albums.insertSave()";
        
        if(isUpdate){
            albumIdRowStyle = "";
            saveFn = "albums.updateSave()";
        }

        var html = `
    <div id="insertArea">
        <br/>
        <table>
               <tr ${albumIdRowStyle}>
                <td>Album Id</td>
                <td><input type="text" id="albumId" disabled /></td>
                <td id="albumIdError" class="error"></td>
            </tr>
            <tr>
                <td>Album Name</td>
                <td><input type="text"  id="albumName" /></td>
                <td id="albumNameError" class="error"></td> 
            </tr>
            <tr>
                <td>Number of Tracks</td>
                <td><input type="text" id="numTracks" /></td>
                <td id="tracksError" class="error"></td>
            </tr>
            <tr>
                <td>Album Art</td>
                <td><input type="text" id="albumArt" /></td>
                <td id="artError" class="error"></td> 
            </tr>
            <tr>
                <td>Release Date</td>
                <td><input type="text" id="releaseDate" /></td>
                <td id="releaseError" class="error"></td>
            </tr>
            <tr>
                <td>Suggested Price</td>
                <td><input type="text" id="price" /></td>
                <td id="priceError" class="error"></td>
            </tr>
            <tr>
                <td>User</td>
                <td>
                    <select id="userPickList">
                    <!-- JS code will make ajax call to get all the users 
                    then populate this select tag's options with those users -->
                    </select>
                </td>
                <td id="userIdError" class="error"></td>
            </tr>
            <tr>
                <td><button onclick="${saveFn}">Save</button></td>
                <td id="recordError" class="error"></td>
                <td></td>
            </tr>
        </table>
    </div>
    `;
        document.getElementById("view").innerHTML = html;

        ajax2({
            url: "webAPIs/userIdPickListAPI.jsp",
            successFn: setUserPickList,
            errorId: "userIdError"
        });

        function setUserPickList(jsonObj) {

            console.log("setuserPickList was called, see next line for object holding list of roles");
            console.log(jsonObj);

            if (jsonObj.dbError.length > 0) {
                document.getElementById("userRoleIdError").innerHTML = jsonObj.dbError;
                return;
            }

            Utils.makePickList({
                id: "userPickList",
                list: jsonObj.UserIdList,
                valueProp: "UserId",
                keyProp: "UserId"
            });

        } // setRolePickList

    }; // albums.insertUI
    
albums.getAlbumDataFromUI = function() {

        // New code for handling user pick list.
        var ddList = document.getElementById("userPickList");

        // create a user object from the values that the user has typed into the page.
        var userInputObj = {
            
            "album_id" : document.getElementById("albumId").value,
            "album_name": document.getElementById("albumName").value,
            "num_tracks": document.getElementById("numTracks").value,
            "album_art": document.getElementById("albumArt").value,
            "release_date": document.getElementById("releaseDate").value,
            "suggested_price": document.getElementById("price").value,

            // Modification here for user pick list
            "web_user_id": ddList.options[ddList.selectedIndex].value,

            "errorMsg": ""
        };

        console.log(userInputObj);

        return encodeURIComponent(JSON.stringify(userInputObj));
        //return JSON.stringify(userInputObj);
    }; // end getAlbumDataFromUI method
    
albums.writeErrorObjToUI = function(jsonObj) {
    
        console.log("here is the JSON object (holds error messages)");
        console.log(jsonObj);

        document.getElementById("albumNameError").innerHTML = jsonObj.album_name;
        document.getElementById("tracksError").innerHTML = jsonObj.num_tracks;
        document.getElementById("artError").innerHTML = jsonObj.album_art;
        document.getElementById("releaseError").innerHTML = jsonObj.release_date;
        document.getElementById("priceError").innerHTML = jsonObj.suggested_price;
        document.getElementById("userIdError").innerHTML = jsonObj.web_user_id;
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
        
    }; // end writeErrorObjToUI function
    
albums.insertSave = function () {
    
    console.log("albums.insertSave called!");
    
    var newAlbum = albums.getAlbumDataFromUI();
    
    console.log("After Calling Stringify: " + newAlbum);
    
    ajax2({
            url: "webAPIs/insertAlbumAPI.jsp?jsonData=" + newAlbum,
            successFn: processInsert,
            errorId: "recordError"
        });
        
    
    function processInsert(jsonObj){
        
        
            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }

            albums.writeErrorObjToUI(jsonObj);
        
    } // end processInsert function
    
}; // end albums.insertSave

albums.updateSave = function () {
    
    console.log("albums.updateSave called!");
    
    var newAlbum = albums.getAlbumDataFromUI();
    
    console.log("After Calling Stringify: " + newAlbum);
    
    ajax2({
            url: "webAPIs/updateAlbumAPI.jsp?jsonData=" + newAlbum,
            successFn: processInsert,
            errorId: "recordError"
        });
        
    
    function processInsert(jsonObj){
        
        
            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }

            albums.writeErrorObjToUI(jsonObj);
        
    } // end processInsert function
    
}; // end albums.insertSave


albums.updateUI = function (albumId){
    
    window.location.hash = "#/albumUpdate";
    
    albums.insertUI(true);
    
    ajax2({
            url: "webAPIs/getSingleAlbum.jsp?id=" + albumId,
            successFn: proceed,
            errorId: "ajaxError"
        });
        
    function proceed(albumInfo){
        
        document.getElementById("albumId").value = albumInfo.album_id;
        document.getElementById("albumName").value = albumInfo.album_name;
        document.getElementById("numTracks").value = albumInfo.num_tracks;
        document.getElementById("albumArt").value = albumInfo.album_art;
        document.getElementById("releaseDate").value = albumInfo.release_date;
        document.getElementById("price").value = albumInfo.suggested_price;
        
    }
        
}; // end albums.updateUI