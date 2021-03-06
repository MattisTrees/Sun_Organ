<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.DbConn" %>
<%@page language="java" import="model.SunOrgan.*" %>

<%@page language="java" import="com.google.gson.*" %>

<%
    
    Gson gson = new Gson();
    
    DbConn dbc = new DbConn();
    StringData errorMsg = new StringData();
    
    String jsonInsertData = request.getParameter("jsonData");
    
    if(jsonInsertData == null){
        errorMsg.errorMsg = "Cannot insert -- no data was received";
        System.out.println(errorMsg.errorMsg);
    } else {
        
        System.out.println("jsonInsertData is " + jsonInsertData);
        
        StringData insertData = gson.fromJson(jsonInsertData, StringData.class);
        
        System.out.println(insertData.toString());
        
        errorMsg = DbMods.insert(insertData, dbc);
        
    }
    
    out.print(gson.toJson(errorMsg).trim());
    dbc.close();

%>