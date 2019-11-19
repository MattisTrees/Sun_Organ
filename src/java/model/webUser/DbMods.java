package model.webUser;

import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {
    
    public static StringData logonFind(String email, String password, DbConn connection){
        
        StringData userData = new StringData();
        
        if((email == null) || (password == null)){
            userData.errorMsg = "model.webUser.DbMods.logonFind Error: email and password must be provided!";
            return userData;
        }
        
        try {
            String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, image, "
                    + "web_user.user_role_id, user_role_type "
                    + "FROM web_user, user_role "
                    + "WHERE web_user.user_role_id = user_role.user_role_id "
                    + "AND user_email = ?"
                    + "AND user_password = ?";
            
            PreparedStatement logonStmt = connection.getConn().prepareStatement(sql);
            
            logonStmt.setString(1, email);
            logonStmt.setString(2, password);
            
            ResultSet results = logonStmt.executeQuery();
            
            if(results.next()){
                return new StringData(results);
            } else {
                return null;
            } // end if/else block
            
        } catch (Exception e){
            userData.errorMsg = "Exception in model.webUser.DbMods.logonFind(): " + e.getMessage();
            System.out.println("* * * * * " + userData.errorMsg);
            return userData;
        }
    } // end logonFind

    public static StringDataList findById (DbConn dbc, String id) {
        
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, image, "
                    + "web_user.user_role_id, user_role_type "
                    + "FROM web_user, user_role WHERE web_user.user_role_id = user_role.user_role_id "
                    + "AND web_user_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in WebUserView.getUserById(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;

    } // getUserById
    
    private static StringData validate(StringData inputData){

        StringData errorMsgs = new StringData();

        /* Useful to copy field names from StringData as a reference
    public String webUserId = "";
    public String userEmail = "";
    public String userPassword = "";
    public String userPassword2 = "";
    public String birthday = "";
    public String membershipFee = "";
    public String userRoleId = "";   // Foreign Key
    public String userRoleType = ""; // getting it from joined user_role table.
         */
        // Validation
        errorMsgs.userEmail = ValidationUtils.stringValidationMsg(inputData.userEmail, 45, true);
        errorMsgs.userPassword = ValidationUtils.stringValidationMsg(inputData.userPassword, 45, true);

        if (inputData.userPassword.compareTo(inputData.userPassword2) != 0) { // case sensative comparison
            errorMsgs.userPassword2 = "Both passwords must match";
        }

        errorMsgs.birthday = ValidationUtils.dateValidationMsg(inputData.birthday, false);
        errorMsgs.membershipFee = ValidationUtils.decimalValidationMsg(inputData.membershipFee, false);
        errorMsgs.userRoleId = ValidationUtils.integerValidationMsg(inputData.userRoleId, true);

        return errorMsgs;
    } // end validate method
    
    public static StringData insert(StringData inputData, DbConn dbc){
        
        StringData errorMsgs = validate(inputData);
        
        if (errorMsgs.getCharacterCount() > 0){
            errorMsgs.errorMsg = "Please try again!";
            
        } else {
            
            String sql = "INSERT INTO web_user (user_email, user_password, membership_fee," +
                    "birthday, user_role_id) values(?,?,?,?,?)";
            
            PrepStatement pStatement = new PrepStatement(dbc, sql);
            
            pStatement.setString(1, inputData.userEmail);
            pStatement.setString(2, inputData.userPassword);
            pStatement.setBigDecimal(3, ValidationUtils.decimalConversion(inputData.membershipFee));
            pStatement.setDate(4, ValidationUtils.dateConversion(inputData.birthday));
            pStatement.setInt(5, ValidationUtils.integerConversion(inputData.userRoleId));
            
            int numRows = pStatement.executeUpdate();
            
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            
            if(errorMsgs.errorMsg.length() == 0){
                if (numRows == 1){
                    errorMsgs.errorMsg = "";
                } else {
                    errorMsgs.errorMsg = numRows + " records were inserted when 1 was expected";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid User Role Id!!";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")){
                errorMsgs.errorMsg = "That email address is already taken!";
            } // end if/else chain
            
        } // end if/else block
        
        return errorMsgs;
    } // end insert
    
    public static StringData update(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            String sql = "UPDATE web_user SET user_email=?, user_password=?, membership_fee=?, birthday=?, "
                    + "user_role_id=? WHERE web_user_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.userEmail); // string type is simple
            pStatement.setString(2, inputData.userPassword);
            pStatement.setBigDecimal(3, ValidationUtils.decimalConversion(inputData.membershipFee));
            pStatement.setDate(4, ValidationUtils.dateConversion(inputData.birthday));
            pStatement.setInt(5, ValidationUtils.integerConversion(inputData.userRoleId));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.webUserId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid User Role Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That email address is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update
    
} // class
