package model.UserId;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* 
 * This class is just to hold all of the data given back from the SQL call to 
 * the databse, this is exclusively to populate the pickList for the insert album
 * page of the website.
 */

public class StringData {

    public String UserId = ""; 

    public String errorMsg = "";

    // default constructor leaves all data members with empty string.
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            this.UserId = FormatUtils.formatInteger(results.getObject("web_user_id"));
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.UserId.StringData (the constructor"
                    + "for model.UserId.StringData that takes a ResultSet): "
                    + e.getMessage();
        }
    }

    @Override
    public String toString() {
        return ", User Id: " + this.UserId;
    }
}
