package view;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.SunOrgan.*;
import dbUtils.*;

public class AlbumsView {
    
    public static StringDataList getAlbums(DbConn Connection){
        StringDataList sdl = new StringDataList();
        
        try {
            String sql = "SELECT album_name, album_id, num_tracks, album_art, "
                    + "release_date, suggested_price, web_user.web_user_id "
                    + "FROM albums, web_user WHERE albums.web_user_id = web_user.web_user_id";
            
            PreparedStatement sqlCall = Connection.getConn().prepareStatement(sql);
            
            ResultSet results = sqlCall.executeQuery();
            
            while(results.next()){
                sdl.add(results);
            } // end while loop
            
            results.close();
            sqlCall.close();
            
        } catch(Exception e){
            StringData error = new StringData();
            
            error.errorMsg = "Exception thrown in AlbumsView.getAlbums(): " + e.getMessage();
            
            sdl.add(error);
        } // end try/catch block
        
        return sdl;
    } // end getAlbums method
    
    public static StringData getSingleAlbum(DbConn Connection, String album_id){
        StringData album = new StringData();
        
        //System.out.println("album_id: " + album_id);
        
        try {
            String sql = "SELECT album_name, album_id, num_tracks, album_art, "
                    + "release_date, suggested_price, web_user_id "
                    + "FROM albums WHERE album_id = " + album_id;
            
            PreparedStatement sqlCall = Connection.getConn().prepareStatement(sql);
            
            ResultSet results = sqlCall.executeQuery();
            
            if(results.next()){
                album = new StringData(results);
            } else {
                album.errorMsg = "Album " + album_id + " Not Found!";
            }
            results.close();
            sqlCall.close();
            
        } catch(Exception e){
            album = new StringData();
            
            album.errorMsg = "Exception thrown in AlbumsView.getAlbums(): " + e.getMessage();
            
        } // end try/catch block
        
        return album;
    } // end getAlbums method
    
    public static StringDataList deleteAlbum(DbConn Connection,String nameOfAlbum){
        StringDataList sdl = new StringDataList();
        
        try {
            String sql = "DELETE FROM albums WHERE album_id = " + nameOfAlbum;
            
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
} // end AlbumsView class
