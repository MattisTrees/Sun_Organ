package model.UserId;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* 
 * This class is just to hold all of the data given back from the SQL call to 
 * the databse, this is exclusively to populate the pickList for the insert album
 * page of the website.
 */

public class StringData {

    public String userRoleId = ""; 

    public String errorMsg = "";

    // default constructor leaves all data members with empty string.
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            this.userRoleId = FormatUtils.formatInteger(results.getObject("user_role_id"));
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.role.StringData (the constructor"
                    + "for model.UserId.StringData that takes a ResultSet): "
                    + e.getMessage();
        }
    }

    @Override
    public String toString() {
        return ", User Role Id: " + this.userRoleId;
    }
}
