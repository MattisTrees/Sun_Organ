package model.SunOrgan;

import dbUtils.*;

public class DbMods {
    
    private static StringData validate(StringData inputData){

        StringData errorMsgs = new StringData();

        /* Useful to copy field names from StringData as a reference
            String album_id = "";
            String album_name = "";
            String num_tracks = "";
            String album_art = "";
            String release_date = "";
            String suggested_price = "";
            String web_user_id = "";
         */
        // Validation
        errorMsgs.album_name = ValidationUtils.stringValidationMsg(inputData.album_name, 45, true);
        errorMsgs.album_art = ValidationUtils.stringValidationMsg(inputData.album_art, 45, false);

        errorMsgs.release_date = ValidationUtils.dateValidationMsg(inputData.release_date, true);
        errorMsgs.suggested_price = ValidationUtils.decimalValidationMsg(inputData.suggested_price, false);
        errorMsgs.web_user_id = ValidationUtils.integerValidationMsg(inputData.web_user_id, true);

        return errorMsgs;
    } // end validate method
    
    public static StringData insert(StringData inputData, DbConn dbc){
        
        StringData errorMsgs = validate(inputData);
        
        if (errorMsgs.getCharacterCount() > 0){
            errorMsgs.errorMsg = "Please try again!";
            
        } else {
            
            String sql = "INSERT INTO albums (album_name, num_tracks, album_art," +
                    "release_date, suggested_price, web_user_id) values(?,?,?,?,?,?)";
            
            PrepStatement pStatement = new PrepStatement(dbc, sql);
            
            pStatement.setString(1, inputData.album_name);
            pStatement.setString(2, inputData.num_tracks);
            pStatement.setString(3, inputData.album_art);
            pStatement.setDate(4, ValidationUtils.dateConversion(inputData.release_date));
            pStatement.setBigDecimal(5, ValidationUtils.decimalConversion(inputData.suggested_price));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.web_user_id));
            
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
    
    public static StringData update(StringData inputData, DbConn dbc){
        
        StringData errorMsgs = validate(inputData);
        
        if (errorMsgs.getCharacterCount() > 0){
            errorMsgs.errorMsg = "Please try again!";
            
        } else {
            
            /*
            "UPDATE web_user SET user_email=?, user_password=?, membership_fee=?, birthday=?, "
                    + "user_role_id=? WHERE web_user_id = ?"
            */
            
            String sql = "UPDATE albums SET album_name=?, num_tracks=?, album_art=?,"
                    + "release_date=?, suggested_price=?, web_user_id=? WHERE album_id=?";
            
            PrepStatement pStatement = new PrepStatement(dbc, sql);
            
            pStatement.setString(1, inputData.album_name);
            pStatement.setString(2, inputData.num_tracks);
            pStatement.setString(3, inputData.album_art);
            pStatement.setDate(4, ValidationUtils.dateConversion(inputData.release_date));
            pStatement.setBigDecimal(5, ValidationUtils.decimalConversion(inputData.suggested_price));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.web_user_id));
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.album_id));
            
       
            
            int numRows = pStatement.executeUpdate();
            
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            
            if(errorMsgs.errorMsg.length() == 0){
                if (numRows == 1){
                    errorMsgs.errorMsg = "";
                } else {
                    errorMsgs.errorMsg = numRows + " records were inserted when 1 was expected";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Album Id!!";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")){
                errorMsgs.errorMsg = "This is a duplicate entry of some kind!";
            } // end if/else chain
            
        } // end if/else block
        
        return errorMsgs;
    } // end insert
    
} // class
