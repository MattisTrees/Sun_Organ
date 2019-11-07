<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
  
    session.invalidate();
    
    StringData list = null;
    
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());

%>