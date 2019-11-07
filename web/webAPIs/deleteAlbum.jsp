<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.SunOrgan.*" %> 
<%@page language="java" import="view.AlbumsView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    
    DbConn dbc = new DbConn();
    StringDataList list = new StringDataList();
    
    list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.
    
    String searchId = request.getParameter("AlbumId");

    if (list.dbError.length() == 0) { // if got good DB connection,

        System.out.println("*** Ready to call AlbumsView API...");
        list = AlbumsView.deleteAlbum(dbc, searchId);
    }
    
    dbc.close();
    
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());

%>