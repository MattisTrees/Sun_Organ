package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.UserId.*;

// classes in my project
import dbUtils.*;

public class UserIdView {

    public static StringDataList UserIdPickListAPI(DbConn dbc) {

        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT web_user_id "+
                    "FROM albums GROUP BY web_user_id ORDER BY web_user_id ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in UserIdView.UserIdPickListAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}