<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>
<%@page language="java" import="view.RoleView"%>

<%

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    WebUserWithRoles webUserWithRoles = new WebUserWithRoles();

    String searchId = request.getParameter("id");
    if (searchId == null) {
        webUserWithRoles.webUser.errorMsg = "Cannot search for user - 'id' most be supplied";
    } else {

        DbConn dbc = new DbConn();
        webUserWithRoles.webUser.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

        if (webUserWithRoles.webUser.errorMsg.length() == 0) { // if got good DB connection,

            System.out.println("*** Ready to call allUsersAPI");
            webUserWithRoles.webUser = DbMods.findById(dbc, searchId).webUserList.get(0); 
            
            webUserWithRoles.roleInfo = RoleView.allRolesAPI(dbc);
        }
        
        
        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
    }
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(webUserWithRoles).trim());
%>