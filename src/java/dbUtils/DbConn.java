package dbUtils;

import java.sql.DriverManager;
import java.sql.*;

/**
 * Wrapper class for database connection. Constructor opens connection. Close
 * method closes connection.
 */
public class DbConn {

    private String errMsg = ""; // will remain "" unless error getting connection
    private java.sql.Connection conn = null;

    public DbConn() {
        
        String dbAndPass = "FA19_3308_tuh42796?user=tuh42796&password=keipixer";

        try {
            
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/sonoo",
                    "Matthew Jordan", "B00gnish");
            
        } catch (Exception e) { // cant get the driver...
            recordError("Problem getting driver:" + e.getMessage());
        }
    } // method

    private void recordError(String errorMsg) {
        this.errMsg = errorMsg;
        System.out.println("Error in DbConn. " + errorMsg);
    }

    /* Returns database connection for use in SQL classes.  */
    public Connection getConn() {
        return this.conn;
    }

    /* Returns database connection error message or "" if there is none.  */
    public String getErr() {
        return this.errMsg;
    }

    /**
     * Close database connection.
     */
    public void close() {

        if (conn != null) {
            try {
                conn.close();
            } // try
            catch (Exception e) {
                // Don't care if connection was already closed. Do nothing.
            } // catch
        } // if
    } // method

    /**
     * Checks the hostname to see if web app is running at Temple or not.
     */
    private boolean isTemple() {
        boolean temple = false;
        try {
            String hostName = java.net.InetAddress.getLocalHost().getCanonicalHostName();
            hostName = hostName.toLowerCase();
            System.out.println("***** hostName is [" + hostName + "] *****");
            if (hostName.endsWith("temple.edu")) {
                temple = true;
             } else {
            }
        } catch (Exception e) {
            recordError("Unable to get hostName: " + e.getMessage());
        }
        return temple;
    }

    // This method gets run when GC (garbage collection) runs 
    // and we are never sure when this might happen, but still it's better than 
    // nothing to try to be sure that all db connections are closed when 
    // the dbConn object is no longer referenced. Maybe we can get the IT 
    // Administrator to set the GC to run more often.
    protected void finalize() {
        this.close(); // 
    }

} // class