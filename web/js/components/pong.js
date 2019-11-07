function pong(){
    
    var content = `
    
        <p>
        <button onclick="myMove()">Click Me</button> 
        </p>

        <div id ="myContainer">
        <div id ="myAnimation"></div>
        </div>
        
    `;
    
    document.getElementById("view").innerHTML = content;
} // end function