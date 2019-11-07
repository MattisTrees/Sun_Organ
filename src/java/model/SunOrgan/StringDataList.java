package model.SunOrgan;

import java.util.ArrayList;
import java.sql.ResultSet;

public class StringDataList {
    
    public String dbError = "";
    public ArrayList<StringData> albumList = new ArrayList();
    
    // Empty constructor 
    public StringDataList(){
        
    }
    
    public void add(StringData stringData){
        this.albumList.add(stringData); 
    }
    
    // Overloaded method can take both StringData and ResultSet data types
    public void add(ResultSet results){
        this.albumList.add(new StringData(results));
    }
    
} // end StringDataList class
