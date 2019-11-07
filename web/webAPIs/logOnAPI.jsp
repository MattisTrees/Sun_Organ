<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData list = new StringData();

    String email = request.getParameter("email");
    String password = request.getParameter("password");
    
    DbConn dbc = new DbConn();
    list.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

    if (list.errorMsg.length() == 0) { // if got good DB connection,

        System.out.println("*** Ready to call logonFind method");
        list = DbMods.logonFind(email, password, dbc);
    }
    
    dbc.close(); 
      
    session.setAttribute("UserInfo", list);

    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());
    
    

%>