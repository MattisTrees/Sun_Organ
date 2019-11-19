<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.SunOrgan.*" %> 
<%@page language="java" import="view.AlbumsView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringData album = new StringData();
    
    String albumId = request.getParameter("id");

    DbConn dbc = new DbConn();
    
    album.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

    if (album.errorMsg.length() == 0) { // if got good DB connection,

        System.out.println("*** Ready to call AlbumsView API...");
        album = AlbumsView.getSingleAlbum(dbc, albumId);
        System.out.println("The results of the SQL call: " + album.toString());
    }

      dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.

    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(album).trim());
%>