package model.SunOrgan;

import dbUtils.FormatUtils;
import java.sql.ResultSet;

/**
 *
 * @author matthewjordan
 */
public class StringData {
    
    String album_id = "";
    String album_name = "";
    String num_tracks = "";
    String album_art = "";
    String release_date = "";
    String suggested_price = "";
    String web_user_id = "";
    
    // Error message for manual entry if the SQL call fails or the connection isn't made properly
    public String errorMsg = "";
    
    public StringData() {
        
    } // end StringData constructor
    
    public StringData(ResultSet results) {
        try {
            // plainInteger returns integer converted to string with no commas.
            this.album_id = FormatUtils.plainInteger(results.getObject("album_id"));
            this.album_name = FormatUtils.formatString(results.getObject("album_name"));
            this.num_tracks = FormatUtils.plainInteger(results.getObject("num_tracks"));
            this.album_art = FormatUtils.formatString(results.getObject("album_art"));
            this.release_date = FormatUtils.formatDate(results.getObject("release_date"));
            this.suggested_price = FormatUtils.formatDollar(results.getObject("suggested_price"));
            this.web_user_id = FormatUtils.plainInteger(results.getObject("web_user_id"));
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.SunOrgan.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        } // end try/catch
    } // end StringData method
        
    public int getCharacterCount() {
        String s = this.album_art + this.album_id + this.album_name + this.num_tracks 
                + this.release_date + this.suggested_price + this.web_user_id;
        return s.length();
    } // end getCharacterCount method
    
    @Override
    public String toString() {
        
        return "Album Name:" + this.album_name
                + ", Album Id: " + this.album_id
                + ", Number of Tracks: " + this.num_tracks
                + ", Album Art: " + this.album_art
                + ", Release Date: " + this.release_date
                + ", Suggested Price: " + this.suggested_price
                + ", Web User Id: " + this.web_user_id;
        
    } // end toString method
        
} // end StringData class
