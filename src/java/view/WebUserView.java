package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.webUser.*;

// classes in my project
import dbUtils.*;

public class WebUserView {

    public static StringDataList getAllUsers(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT web_user_id, user_email, user_password, image, membership_fee, birthday, image, "
                    + "web_user.user_role_id, user_role_type "
                    + "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id "
                    + "ORDER BY web_user_id ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in WebUserView.allUsersAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    } // getAllUsers
    
    public static StringDataList deleteUser(DbConn Connection,String UserId){
        StringDataList sdl = new StringDataList();
        
        try {
            String sql = "DELETE FROM web_user WHERE web_user_id = " + UserId;
            
            PreparedStatement sqlCall = Connection.getConn().prepareStatement(sql);
            int results = sqlCall.executeUpdate();
            
            System.out.println("Results value: " + results);
            
            sqlCall.close();
            
        } catch (Exception e){
        
            System.out.println("Something is wrong in the deleteAlbum function!");
            
            StringData error = new StringData();
            
            error.errorMsg = "Exception thrown in AlbumsView.getAlbums(): " + e.getMessage();
            
            sdl.add(error);
        
        } // end try/catch block
        
        return sdl;
        
    } // end deleteAblum method

}