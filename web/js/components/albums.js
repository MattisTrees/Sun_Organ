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